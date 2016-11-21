import {Component} from '@angular/core';
import {Platform, NavController, Events, App, ViewController} from "ionic-angular";

import { RegisterPage } from './register';
import {WarnService} from "../../services/warn.service";

import {ForgetPwdPage} from "./forgetPwd";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {WXService} from "../../services/wx.service";
import {Release } from "../../services/release"
@Component({

  templateUrl: "login.html"

})
export class LoginPage  {

  fromReg = false;
  otherLoginDisplay = "block";
  constructor(
              public uService: UserService,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public http: HttpService,
              public app: App,
              public viewCtrl: ViewController,
              public events: Events,
              public wxService: WXService

             ) {

    // this.events.subscribe("reginst：success",res => {
    //
    //   this.fromReg = true;
    //
    // });
    if(!Release.weChat){
      this.otherLoginDisplay = this.wxService.isInstalled ? "block" : "none";
    }


  }


  ionViewWillEnter(){
    // if(this.uService.registerHelper){
    //   this.viewCtrl.dismiss();
    // }
  }


  login(userName,pwd) {
    if (userName.length <= 0) {
      this.warnCtrl.toast("请输入登录名");
      return;
    }

    let params = {
      loginName: userName,
      loginPwd: pwd,
      terminalType: "1"
    }

    let loading = this.warnCtrl.loading('登录中');
    this.uService.login(params).then(res => {

      loading.dismiss().then(res => {

        // this.viewCtrl.dismiss({"success":true});
        this.navCtrl.pop();

      });
      // let rootNav: NavController = this.app.getRootNav();
      // rootNav.setRoot(TabsPage);


    }).catch(error => {

      loading.dismiss();

    });




  }

  cancle($event){
    this.viewCtrl.dismiss({"success":false});
  }

  register($event) {
    this.navCtrl.push(RegisterPage)
  }

  findPwd($event){
    this.navCtrl.push(ForgetPwdPage);
  }

  wxLogin(){

    if(Release.weChat){
      //微信

    } else {
     //app

      this.wxService.wxLogin().then(res => {

      }).catch(error => {

      });

    }

  }

}
