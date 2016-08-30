import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {UserService} from "./serve/user.serve";
import {LoginPage} from "./pages/user/login";
// import {UserCopyService} from "./serve/user.copy.serve";

import {MY_SERVE} from "./serve/serve";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform
              ) {

    // this.rootPage = TabsPage;

    this.rootPage = LoginPage;

    // userServe.loginState().then((msg) => {
    //
    //   this.rootPage = TabsPage;
    // }).catch((error) => {
    //   this.rootPage = LoginPage
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
