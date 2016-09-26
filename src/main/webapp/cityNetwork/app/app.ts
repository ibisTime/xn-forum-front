import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Config} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {MY_SERVE} from "./services/services";
import {UserService} from "./services/user.service";
import {LoginPage} from "./pages/user/login";
import {KefuService} from "./services/kefu.serve";
import {Keyboard} from 'ionic-native';


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform,
              private userServe:UserService,
              private kefu: KefuService) {

    this.userServe.whetherLogin().then((msg) => {

      if(msg != null){

        this.userServe.userName = msg;
        this.rootPage = TabsPage;

      } else {

        this.rootPage = LoginPage;

      }

    });
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      // Keyboard.disableScroll(true);
    });
  }
}

ionicBootstrap(MyApp, MY_SERVE,
  {

    tabsHideOnSubPages: true,
    backButtonText:"",
    iconMode: 'ios',
    mode: 'ios'

  }).catch((error) => {

  console.log('app-出现错误');
  console.log(error);

});
