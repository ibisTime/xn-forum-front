import {Component, AfterViewInit} from '@angular/core';
import {Platform, Events, App} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";

import {CityService} from "../services/city.service";
import {WarnService} from "../services/warn.service";
import {IMService} from "../services/im.service";
import {HttpService} from "../services/http.service";
import {KefuService} from "../services/kefu.serve";

declare let BMap: any;
declare let BMAP_STATUS_SUCCESS: any;
@Component({
  selector:"app-root-comp",
  templateUrl:"app.component.html"
})
export class MyApp implements AfterViewInit{

  public rootPage: any;
  adDisplay = "block";
  time = 2;
  logningFlag = false;
    contentUrl;


    constructor(public platform: Platform,
              public userServe:UserService,
              public cityService: CityService,
              public warnService: WarnService,
              public events: Events,
              public im: IMService,
              public http: HttpService,
              public kefuService: KefuService,
              public imServe: IMService,
              public app: App
              ) {
    //根视图
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Keyboard.disableScroll(true);
    });





      //判断是否有城市存储
      // this.cityService.checkedCity().then(res => {
      //
      //     if (res != null) {
      //
      //         this.cityService.getSiteByAddress(res);
      //
      //     } else {
      //
      //         this.getNav();
      //
      //     }
      //
      // }).catch(error => {
      //     this.getNav();
      // });
  }

  ngAfterViewInit(){
        /*判断是否已经登陆*/
        this.userServe.whetherLogin().then(res => {

            if (res != null) {////////////////////

                this.getInfoAlreadyLogin();

            } else  {////////////////////////////

                /*获取导航数据*/
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
            console.log("loginSUccess");
            
            this.logningFlag = false;
            /*客服*/
            this.kefuService.me = this.userServe.userId;

            /*im登陆*/
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

      let load = this.warnService.loading();
      /*获取站点详情*/
      this.cityService.getSiteInfo(this.userServe.user.companyCode).then(res => {

          //获取导航信息
          return this.cityService.getNavigateBySiteCode(this.userServe.user.companyCode);


      }).then(res => {

          /*客服*/
          this.kefuService.me = this.userServe.userId;

          /*im登陆*/
          this.imServe.login(this.userServe.userId);

          /*类 session 登陆*/
          return this.http.post('/user/login-t', {"tokenId": this.userServe.tokenId});


      }).then(res => {

          load.dismiss();

          if(this.cityService.ads.length > 0){

              let num = setInterval(() => {

                  if(this.time > 0){
                      this.time --;
                  }

              },1200);

              this.contentUrl =`url('${this.cityService.ads[0]}')`;

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

          load.dismiss();
          this.warnService.alert("加载失败，请重新加载",() => {
              this.getInfoAlreadyLogin();
          });

      });


  }


  /*用户还未登陆*/
  getNav(){

      let loadNav = this.warnService.loading("");
      var geolocation = new BMap.Geolocation();

      geolocation.getCurrentPosition(r => {

          console.log(r);

          if(geolocation.getStatus() == BMAP_STATUS_SUCCESS){
            //成功加载站点

              let province = r.address.province.slice(0,r.address.province.length - 1);
              let city = r.address.city.slice(0,r.address.city.length - 1);
              let area = r.address.district;

              let zoneObj = {
                  "province": province,
                  "area":  area,
                  "city":  city
              }

              if(typeof(area) == "undefined" || area.length <= 0){
                  this.warnService.toast("不能确定您的准确位置，将进入默认站点");

              } else {

                  this.cityService.locationSuccessAddress = zoneObj;

              }

              this.cityService.getSiteByAddress(zoneObj).then(res => {


                  loadNav.dismiss();

                  //有广告图进行加载
                  if(this.cityService.ads.length > 0){

                      let num = setInterval(() => {

                          if(this.time > 0){

                              // document.getElementById("time-back-div").innerText = `${this.time}`;
                              this.time --;
                              // console.log("定时中");
                              // console.log(this.time);
                              // this.events.publish("timeBegin",this.time);

                          }

                      },1200);


                      console.log(this.cityService.ads);


                      this.rootPage = TabsPage;

                      setTimeout(res => {
                          // this.adDisplay = 'none';
                          // window.clearInterval(num);
                          // this.rootPage = TabsPage;
                          document.getElementById("ad-bg").style.display = "none";
                          document.getElementById("ad-bg-img").style.display = "none";
                          // this.events.publish("adsLoadEnd");
                          console.log("切换完成了");
                          // console.log(this);
                          // console.log(this.adDisplay);


                      },this.time*1500);


                  }  else  {

                      //无图直接跳转
                      this.rootPage = TabsPage;
                  }


              }).catch(error => {

                  loadNav.dismiss();
                  this.warnService.alert("加载失败，请重新加载",() => {
                      this.getNav();
                  });

              });


          } else {
            //失败加载默认
              loadNav.dismiss();
              this.warnService.alert("加载失败，请重新加载",() => {
                  this.getNav();
              });

          }

      },{enableHighAccuracy: true});



    /*加载默认*/
    // navigator.geolocation.getCurrentPosition(geo => {
    //
    //   /*在这里定位成功的将站点进行存储*/
    //   this.getDataByPosition(geo.coords.longitude, geo.coords.latitude,loadNav);
    //
    // }, error => {
    //
    //   this.warnService.toast("定位失败，将切换到默认站点");
    //   this.getDataByPosition(0,0,loadNav);
    //
    // },{timeout: 10000});
  //

  }

  getDataByPosition(x,y,loadNav){

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


    }).then(res => {

      loadNav.dismiss();

    }).catch(error => {

      loadNav.dismiss();
      this.warnService.alert("加载失败，请重新加载",() => {
        this.getNav();
      });

    });

  }





  // howLoad(){
  //
  // return  this.userServe.whetherLogin().then((msg) => {
  //
  //     if (msg != null) {
  //
  //       /*客服*/
  //       this.kefuService.me = this.userServe.userId;
  //
  //       /*im登陆*/
  //       this.imServe.login(this.userServe.userId);
  //
  //       /*类 session 登陆*/
  //      return  this.http.post('/user/login-t',{"tokenId":this.userServe.tokenId}).then(res => {
  //
  //         this.rootPage = TabsPage;
  //        /*异步更新用户数据*/
  //         this.http.get('/user').then(res => {
  //            this.userServe.user = res.data;
  //
  //         });
  //
  //       }).catch(error => {
  //
  //          this.rootPage = TabsPage;
  //
  //       });
  //
  //
  //     } else {
  //       this.rootPage = TabsPage;
  //     }
  //
  //   });
  //
  // }





}
