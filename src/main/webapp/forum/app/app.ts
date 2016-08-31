import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {LoginPage} from "./pages/user/login";
import {MY_SERVE} from "./serve/serve";




@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform

              ) {

    this.rootPage = LoginPage;

    // this.rootPage = LoginPage;

    // this.imServe.close();is
    // if(this.userServe.loginState()){
    //
    //   this.rootPage = TabsPage;
    //
    // } else {
    //
    //   this.rootPage = LoginPage
    //
    // }
    // this.userServe.loginState().then((msg) => {
    //
    //   this.rootPage = TabsPage;
    //
    // }).catch((error) => {
    //
    //   this.rootPage = LoginPage
    //
    // }).catch( (error) => {
    //
    // });

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
  backButtonText:'后退'

}).catch( (error) => {

  console.log('app-出现错误');
  console.log(error);

});
