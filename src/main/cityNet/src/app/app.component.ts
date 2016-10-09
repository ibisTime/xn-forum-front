import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {TabsPage} from '../pages/tabs/tabs';
import {UserService} from "../services/user.service";
import {LoginPage} from "../pages/user/login";

import {TutorialPage} from "../pages/tutorial/tutorial";

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  public rootPage: any;

  constructor(public platform: Platform,
              public userServe:UserService,
              ) {

    this.rootPage = TutorialPage;






    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // Keyboard.disableScroll(true);
    });

  }

  howLoad(){
    this.userServe.whetherLogin().then((msg) => {

      if(msg != null){
        this.rootPage = TabsPage;
      } else {
        this.rootPage = LoginPage;
      }

    });
  }

}
