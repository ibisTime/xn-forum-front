import {Component} from '@angular/core';
import {Platform, ionicBootstrap, InfiniteScroll, Content} from 'ionic-angular';
import {StatusBar, Keyboard} from 'ionic-native';
import {LoginPage} from "./pages/user/login";
import {MY_SERVE} from "./serve/services";
import {TabsPage} from "./pages/tabs/tabs";
import {UserService} from "./serve/user.serve";
import {Observable} from "rxjs/Observable";
import  'rxjs/add/observable/of';
import { Splashscreen } from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;
  test = 5;
  constructor(private platform: Platform,
              private userService: UserService
              ) {




   // this.http.get("/captcha").then((rep) => {
   //   console.log(rep);
   // }).catch((error) => {
   //
   // });

    // let hero = {
    //   lat: 39.9928,
    //   lng: 116.396,
    //   cst:1
    // }
    // this.http.get(null,hero,"http://apis.baidu.com/wxlink/here/here").then((response) => {
    //
    //   console.log(response.json()['result']);
    //
    // }).catch((error) => {
    //   console.log(error);
    // });
    //
    // let date = new Date()
    // date.getUTCDate();
    // /*Fri Sep 02 2016 22:12:23 GMT+0800 (CST) 我国时间东八区 gmt + 8*/
    // let d = new  Date("2016-09-02T14:12:23.509Z")
    // console.log(d);
    // console.log(d.getHours() + ":" + d.getMinutes());


    this.userService.loginState().then((value) => {
      if (value != null){

        this.rootPage = TabsPage;
        this.userService.userName = value;

      } else {

        this.rootPage = LoginPage;

      }

    }).catch((error) => {

    });

    /*HH:mm*/
     let date = new Date();
    console.log(date.getDay(),date.getHours(),date.getMinutes(),date.getTime());


    platform.ready().then(() => {

      Splashscreen.hide();
      // this.platform.setDefault('ios');
      Keyboard.disableScroll(true);
      // Keyboard.hideKeyboardAccessoryBar(false);
      StatusBar.styleDefault();
    });

  }
}

ionicBootstrap(MyApp, MY_SERVE,
  {

  tabsHideOnSubPages: true,
  backButtonText:'后退',
    mode: 'ios'

}).catch( (error) => {

  console.log('app-出现错误');
  console.log(error);

});
