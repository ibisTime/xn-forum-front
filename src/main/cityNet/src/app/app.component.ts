import {Component} from '@angular/core';
import {Platform, Events, App} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";

import {CityService} from "../services/city.service";
import {WarnService} from "../services/warn.service";
import {IMService} from "../services/im.service";
import {HttpService} from "../services/http.service";
import {KefuService} from "../services/kefu.serve";

@Component({
  selector:"app-root-comp",
  templateUrl:"app.component.html"
})
export class MyApp {

  public rootPage: any;
  adDisplay = "block";
  time = 2;

  constructor(public platform: Platform,
              public userServe:UserService,
              public cityService: CityService,
              public warn: WarnService,
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

    /*获取导航数据*/
    this.getNav();



    /*登陆超时重新登陆*/
    this.events.subscribe('user:timeout',() => {

        let currentNav = this.app.getActiveNav();
        let vc =   currentNav.getActive(true);

        if(!(vc.instance instanceof LoginPage)){

            this.userServe.loginOut();
            this.warn.toast('请重新登陆');
            this.im.close();

            if(currentNav != null && typeof(currentNav) != "undefined"){
                currentNav.push(LoginPage);
            }

        }

    });


    /*user-services 中发出 登陆成功*/
    this.events.subscribe("user:loginSuccess",() => {

      /*客服*/
      this.kefuService.me = this.userServe.userId;

      /*im登陆*/
      this.imServe.login(this.userServe.userId);

    });

    this.events.subscribe('user:nouser',() => {
       this.userServe.loginOut();
    });

  }



  getNav(){

    let loadNav = this.warn.loading("");
    /*加载默认*/
    navigator.geolocation.getCurrentPosition((geo: any) => {

      this.getDataByPosition(geo.coords.longitude, geo.coords.latitude,loadNav);

    }, error => {

      this.getDataByPosition(0,0,loadNav);

    }, {timeout: 10000});

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

          // document.getElementById('ad-bg').style.animation = "adbg-animaton 1s";
          this.adDisplay = 'none';
          window.clearInterval(num);

         },this.time*1500);

          return  this.howLoad();

      }  else  {
        //无图直接跳转
         return this.howLoad();
      }


    }).then(res => {

      loadNav.dismiss();

    }).catch(error => {

      loadNav.dismiss();
      this.warn.alert("加载失败，请重新加载",() => {
        this.getNav();
      });

    });

  }


  howLoad(){

  return  this.userServe.whetherLogin().then((msg) => {

      if (msg != null) {

        /*客服*/
        this.kefuService.me = this.userServe.userId;

        /*im登陆*/
        this.imServe.login(this.userServe.userId);

        /*类 session 登陆*/
       return  this.http.post('/user/login-t',{"tokenId":this.userServe.tokenId}).then(res => {

          this.rootPage = TabsPage;
         /*异步更新用户数据*/
          this.http.get('/user').then(res => {
             this.userServe.user = res.data;
          });

        }).catch(error => {

           this.rootPage = TabsPage;

        });


      } else {
        this.rootPage = TabsPage;
      }

    });

  }



  // login(){
  //   this.http.post('/user/login-t',{"tokenId":this.userServe.tokenId}).then(res => {
  //     console.log('login-t登陆成功 ');
  //
  //     this.userServe.saveUserInfo(res.data.tokenId,this.userServe.userId);
  //
  //     return this.http.get('/user');
  //
  //   }).then(res => {
  //
  //     this.userServe.user = res.data;
  //
  //   }).catch(error => {
  //
  //     console.log("登陆失败");
  //
  //   });
  //
  // }

}
