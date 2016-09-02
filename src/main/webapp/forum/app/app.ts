import {Component} from '@angular/core';
import {Platform, ionicBootstrap, InfiniteScroll, Content} from 'ionic-angular';
import {StatusBar, Keyboard} from 'ionic-native';
import {LoginPage} from "./pages/user/login";
import {MY_SERVE} from "./serve/services";
import {TabsPage} from "./pages/tabs/tabs";
import {UserAccountService} from "./serve/user-account.serve";
import {Key} from "ionic-angular/util/key";
import {HttpService} from "./serve/http.service";


@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform,
              private userService: UserAccountService,
              private http: HttpService
              ) {




    let hero = {
      name: "tianlei005",
      age: 22
    }
    this.http.get("tianlei",hero);
    this.http.get(null,hero,"www.baidu.com");


    if(this.userService.loginState()){

      this.rootPage = LoginPage;


    } else {
      this.rootPage = TabsPage;
    }

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
      Keyboard.disableScroll(true);
      // Keyboard.hideKeyboardAccessoryBar(false);
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
