import {Component} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
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
  adDisplay = "inline";
  time = 3;

  constructor(public platform: Platform,
              public userServe:UserService,
              public cityService: CityService,
              public warn: WarnService,
              public events: Events,
              public im: IMService,
              public http: HttpService,
              public kefuService: KefuService,
              public imServe: IMService
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

      if(this.rootPage != LoginPage){
        this.warn.toast('请重新登陆');
        this.userServe.loginOut();
        this.im.close();
        this.rootPage = LoginPage;
      }

    });

  }

  loadEnd($event){
    setTimeout(res => {

      this.adDisplay = "none";
      this.howLoad();

    },2000);

  }

  getNav(){

    let loadNav = this.warn.loading();
    /*加载默认*/
    navigator.geolocation.getCurrentPosition((geo: any) => {

      this.getDataByPosition(geo.coords.longitude, geo.coords.latitude,loadNav);

    }, error => {

      this.getDataByPosition(0,0,loadNav);

    }, {timeout: 5000});

  }

  getDataByPosition(x,y,loadNav){

    /*加载默认*/
    this.cityService.getNavByBaiduMap(x, y).then(res => {

      //有广告图进行加载
      if(res.length > 0){

      //
      //   setTimeout(res => {
      //     this.time --;
      //   },1000);

        setTimeout(res => {

         return  this.howLoad();

        },2000);


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

        });


      } else {
        this.rootPage = LoginPage;
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
