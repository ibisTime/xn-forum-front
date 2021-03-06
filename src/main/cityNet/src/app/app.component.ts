import {Component, AfterViewInit} from '@angular/core';
import {Platform, Events, App, LoadingController} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";

import {CityService} from "../services/city.service";
import {WarnService} from "../services/warn.service";
import {IMService} from "../services/im.service";
import {HttpService} from "../services/http.service";
import {KefuService} from "../services/kefu.serve";
import {Release} from "../services/release";

import { Geolocation } from 'ionic-native';
import { Splashscreen } from 'ionic-native';

import { Storage } from '@ionic/storage';
import {PushService} from "../services/push.service";
import {WXService} from "../services/wx.service";
import {JPushService} from "../services/jpush.service";
import {IMBaseService} from "../services/im-base.service";

declare let BMap: any;
declare let BMAP_STATUS_SUCCESS: any;
declare let plugins : any;

@Component({
  selector:"app-root-comp",
  templateUrl:"app.component.html"
})
export class MyApp implements AfterViewInit{

  public rootPage: any;
  adDisplay = "block";
  time = 2;
  logningFlag = false;

  loading;

    constructor(public platform: Platform,
              public userServe:UserService,
              public cityService: CityService,
              public warnService: WarnService,
              public events: Events,
              public im: IMService,
              public http: HttpService,
              public kefuService: KefuService,
              public imServe: IMService,
              public app: App,
              public wx: WXService,
              public storage: Storage,
              public jpush: JPushService,
              public imBase: IMBaseService,
              public loadCtrl: LoadingController
              // public pushService: PushService
              ) {

        this.loading =  this.loadCtrl.create({
            spinner: 'ios'
        });
        //初始化推送
    window.plugins.jPushPlugin.init()

    // storage.clear();

    //根视图
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Keyboard.disableScroll(true);

        if(!Release.weChat){
            //不是微信平台 判断是否安装
            Splashscreen.hide();
            wx.getWXIsInstalled();
        }


    });


    // this.storage.clear();
    //   this.pushService.init();
  }


  ngAfterViewInit(){

        /*判断是否已经登陆*/
        this.userServe.whetherLogin().then(res => {

            if (res != null) {////////////////////

                this.getInfoAlreadyLogin();

            } else  {//没有登陆

                this.getNav();

            }////////////////////////////

        }).catch(error => {

            this.getNav();

        });

        /*登陆超时重新登陆*/
        this.events.subscribe('user:timeout',() => {

            let currentNav = this.app.getActiveNav();
            let vc = currentNav.getActive(true);

            if(!(vc.instance instanceof LoginPage) && !this.logningFlag){

                this.logningFlag = true;
                this.userServe.loginOut();
                this.warnService.toast('请重新登录');
                this.im.close();

                if(currentNav != null && typeof(currentNav) != "undefined"){
                    currentNav.push(LoginPage);
                }
            }
        });


        /*user-services 中发出 登陆成功*/
        this.events.subscribe("user:loginSuccess",() => {

            this.logningFlag = false;
            /*客服*/
            this.kefuService.me = this.userServe.userId;

            /*首先获取 相应参数 获取成功后 进行登陆*/
            this.getAppkeyAndLoginIM(this.userServe.user.companyCode);

            /*首先获取  im登陆*/
            this.imServe.login(this.userServe.userId);

        });


        this.events.subscribe('user:nouser',() => {

            this.userServe.loginOut();
            this.imServe.close();

        });

      this.events.subscribe('adsLoadEnd',() => {

          this.adDisplay = "none";

      });

      this.events.subscribe('timeBegin',(time) => {

         this.time = time;

      });




    }



  getInfoAlreadyLogin(){

      // let load = this.warnService.loading();
      this.loading.present();
      /*获取站点详情*/
      this.cityService.getSiteInfo(this.userServe.user.companyCode).then(res => {

          //获取导航信息
      return  this.cityService.getNavigateBySiteCode(this.userServe.user.companyCode);

      }).then(res => {

          /*客服*/
          this.kefuService.me = this.userServe.userId;

          //只获取客服相关信息，登陆放在外面
          this.getAppkeyAndLoginIM(this.userServe.user.companyCode);
          this.imServe.login(this.userServe.userId);

          /*类 session 登陆*/
          return this.http.post('/user/login-t', {"tokenId": this.userServe.tokenId});

      }).then(res => {

          // load.dismissAll();
          this.loading.dismiss();

          if(this.cityService.ads.length > 0){

              let num = setInterval(() => {

                  if(this.time > 0){
                      this.time --;
                  }

              },1200);

              // this.contentUrl =`url('${this.cityService.ads[0]}')`;

              setTimeout(res => {

                  this.adDisplay = 'none';
                  window.clearInterval(num);
                  this.rootPage = TabsPage;

              },this.time*1500);


          }  else  {
              //无图直接跳转
              this.rootPage = TabsPage;
          }

          /*异步更新用户数据*/
          this.http.get('/user/info').then(res => {
              this.userServe.user = res.data;
          }).catch(error => {

          });


      }).catch(error => {

          // load.dismissAll();
          this.loading.dismiss();

          this.warnService.alert("加载失败，请重新加载",() => {

              this.getInfoAlreadyLogin();

          });

          // this.userServe.user = null;
          // this.imServe.me = null;
          // this.userServe.tokenId = null;
          // this.userServe.userId = null;
          // this.cityService.currentCity = {"name":"未知地点"};
          //
          // this.getNav();
      });

  }


    getAppkeyAndLoginIM(companyCode){

        // console.log("登陆成功，获取IM参数");
        /*首先获取 相应参数 获取成功后 进行登陆*/
        this.http.get("/company/kefu/list",{"companyCode":companyCode}).then(res => {

            let dataArray = res["data"];
            let to = "";
            let tenantId = "";

            dataArray.forEach((value,index,array) => {

                if(value.account == "to"){

                    to = value.password;

                } else if(value.account == "tenantId"){

                    tenantId = value.password;

                }

            });

            //im-base赋值  appkey不取 固定死
            // this.imBase.appKey = appKey;
            this.imBase.to = to;
            this.imBase.tenantId = tenantId;

            /*客服重新赋值*/
            this.kefuService.tenantId = tenantId;
            this.kefuService.to = to;
            //

            /*im登陆*/
            // this.imServe.login(this.userServe.userId);
            // account: "appKey"
            // code: "PW2016112113454911284"
            // companyCode: "GS2016110223001226117"
            // remark: "关联的AppKey"
            // type: "1"

        }).catch(error => {



        });

    }

  /*用户还未登陆*/
  getNav(){

      // let loadNav = this.warnService.loading("");
      this.loading.present();

      /*微信和 app 定位方式不同*/
      if(Release.weChat || this.platform.is("android")){
          //微信
          var geolocation = new BMap.Geolocation();

          geolocation.getCurrentPosition(r => {

              if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
                //成功加载站点

                  let province = r.address.province.slice(0,r.address.province.length - 1);
                  let city = r.address.city.slice(0,r.address.city.length - 1);
                  let area = r.address.district;

                  let zoneObj = {
                      "province": province || "未知",
                      "area":  area ,
                      "city":  city || "未知"
                  }

                  if(typeof(area) == "undefined" || area.length <= 0){
                      this.warnService.toast("不能确定您的准确位置，将进入默认站点");

                  } else {

                      // 微信在外面 获取地址   app在里面获取地址
                      this.cityService.locationSuccessAddress = zoneObj;

                  }

                  this.cityService.getSiteByAddress(zoneObj).then(res => {


                      // loadNav.dismiss();
                      this.loading.dismiss();

                      //有广告图进行加载
                      if(this.cityService.ads.length > 0){

                           setInterval(() => {

                              if(this.time > 0){

                                  this.time --;

                              }

                          },1200);



                          this.rootPage = TabsPage;

                          setTimeout(res => {

                              document.getElementById("ad-bg").style.display = "none";
                              document.getElementById("ad-bg-img").style.display = "none";

                          },this.time*1500);


                      }  else  {

                          //无图直接跳转
                          this.rootPage = TabsPage;

                      }


                  }).catch(error => {

                      // loadNav.dismiss();
                      this.loading.dismiss();

                      this.warnService.alert("加载失败，请重新加载",() => {
                          this.getNav();
                      });

                  });


              } else {

                  // loadNav.dismiss();
                  this.loading.dismiss();

                  this.warnService.alert("加载失败，请重新加载",() => {
                      this.getNav();
                  });

              }

          },{enableHighAccuracy: true});

      } else {//  手机 app 百度 好像不行了

          if(this.platform.is("ios")){

              Geolocation.getCurrentPosition().then((resp) => {
                  // resp.coords.latitude
                  // resp.coords.longitude
                  // alert(JSON.stringify(resp));
                  this.getDataByPosition(resp.coords.longitude, resp.coords.latitude);

              }).catch((error) => {

                  // console.log('Error getting location', error);
                  this.warnService.toast("不能确定您的准确位置，将进入默认站点");
                  this.getDataByPosition(0,0);

              });

          } else {
          //
              navigator.geolocation.getCurrentPosition(geo => {

                  // alert(JSON.stringify(geo));
                  /*在这里定位成功的将站点进行存储*/
                  this.getDataByPosition(geo.coords.longitude, geo.coords.latitude);

              }, error => {

                  this.warnService.toast("不能确定您的准确位置，将进入默认站点");
                  this.getDataByPosition(0,0);

              },{timeout: 10000});


          }


      }////结束

  }

  getDataByPosition(x,y){

    /*加载默认*/
    this.cityService.getNavByBaiduMap(x, y).then(res => {

      //有广告图进行加载
      if(this.cityService.ads.length > 0){

       let num = setInterval(() => {

             if(this.time > 0){
                 this.time --;
             }

         },1200);


         setTimeout(res => {

          this.adDisplay = 'none';
          window.clearInterval(num);

          this.rootPage = TabsPage;


         },this.time*1500);


      }  else  {

        //无图直接跳转
          this.rootPage = TabsPage;
      }

      this.loading.dismiss();

    }).catch(error => {


      this.loading.dismiss();
      this.warnService.alert("加载失败，请重新加载",() => {

        this.getNav();

      });


    });


  }

    pass($event){

        this.rootPage = TabsPage;
        this.adDisplay = "none";

    }


}
