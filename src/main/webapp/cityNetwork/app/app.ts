import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Config} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {MY_SERVE} from "./services/services";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    this.rootPage = TabsPage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}

ionicBootstrap(MyApp, MY_SERVE,
  {

    tabsHideOnSubPages: true,
    backButtonText:"",
    mode: 'ios',
    iconMode: 'ios'

  }).catch((error) => {

  console.log('app-出现错误');
  console.log(error);

});
