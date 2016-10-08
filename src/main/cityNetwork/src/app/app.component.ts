import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform,
              private userServe:UserService) {



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
