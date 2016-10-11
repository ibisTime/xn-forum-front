import {Component} from '@angular/core';
import {Platform, Events} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";

import {TutorialPage} from "../pages/tutorial/tutorial";
import {CityService} from "../services/city.service";
import {WarnService} from "../services/warn.service";
import {IMService} from "../services/im.service";

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
  // +
  // `<img style="position: fixed; left: 0; right: 0; width: 100%; height: 100%; background-color:#0c60ee; z-index:10000" [style.display]="adDisplay"
  // [src]="cityService.ads[0].pic" (load)="loadEnd($event)"
  // >`
})
export class MyApp {

  public rootPage: any;
  adDisplay = "none";
  constructor(public platform: Platform,
              public userServe:UserService,
              public cityService: CityService,
              public warn: WarnService,
              public events: Events,
              public im: IMService
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
    this.adDisplay = "none";
  }

  getNav(){

    let loadNav = this.warn.loading('加载中');
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

      loadNav.dismiss();
      //有广告图进行加载
      if(res.length > 0){

      } else  {
        //无图直接跳转
        this.howLoad();
      }


    }).catch(error => {

      loadNav.dismiss();
      this.warn.alert("加载失败，请重新加载",() => {
        this.getNav();
      });

    });

  }

  howLoad(){

    this.userServe.whetherLogin().then((msg) => {

      if (msg != null) {
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }
    });

  }

}
