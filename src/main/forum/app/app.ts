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
import {Http} from "@angular/http";
import {DateWrapper} from "@angular/core/src/facade/lang";
import {DateFormatter} from "@angular/common/src/facade/intl";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;
  test = 5;
  constructor(private platform: Platform,
              private userService: UserService,
              private http: Http
              ) {


     // console.log(JSON.parse('[''韩国''\'']'));

    this.userService.loginState().then((value) => {

      if (value != null){
        this.rootPage = TabsPage;
        this.userService.userName = value;
      } else {
        this.rootPage = LoginPage;
      }

    }).catch((error) => {

    });


    platform.ready().then(() => {
      Splashscreen.hide();
      Keyboard.disableScroll(true);
      StatusBar.styleDefault();
    });

  }

}


ionicBootstrap(MyApp, MY_SERVE,
  {

    tabsHideOnSubPages: true,
    backButtonText: '后退',
    mode: 'ios',
    iconMode: 'ios'

  }).catch((error) => {

  console.log('app-出现错误');
  console.log(error);

});
