import {Component} from '@angular/core';
import {Platform, ionicBootstrap, Config} from 'ionic-angular';
import {TabsPage} from './pages/tabs/tabs';
import {MY_SERVE} from "./services/services";
import {UserService} from "./services/user.service";
import {LoginPage} from "./pages/user/login";
import {KefuService} from "./services/kefu.serve";


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
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }

    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
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
