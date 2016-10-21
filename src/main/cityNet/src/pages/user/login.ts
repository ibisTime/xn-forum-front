import {Component, forwardRef, Inject} from '@angular/core';
import {Platform, NavController, Events, App, ViewController} from "ionic-angular";

import { RegisterPage } from './register';
import {WarnService} from "../../services/warn.service";

import {ForgetPwdPage} from "./forgetPwd";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";

@Component({

  templateUrl: "login.html"

})
export class LoginPage  {

  fromReg = false;
  constructor(
              public uService: UserService,
              // public uService: UserService,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public http: HttpService,
              public app: App,
              public viewCtrl: ViewController,
              public events: Events

             ) {

    // this.events.subscribe("reginst：success",res => {
    //
    //   this.fromReg = true;
    //
    // });

  }


  ionViewWillEnter(){
    // if(this.uService.registerHelper){
    //   this.viewCtrl.dismiss();
    // }
  }


  login(userName,pwd) {
    if (!userName || userName.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(userName) ) {
      this.warnCtrl.toast("请输入正确的手机号码");
      return;
    }

    let params = {
      loginName: userName,
      loginPwd: pwd,
      terminalType: "1"
    }

    let loading = this.warnCtrl.loading('登陆中');
    this.uService.login(params).then(res => {

      loading.dismiss().then(res => {

        // this.viewCtrl.dismiss({"success":true});
        this.navCtrl.pop();

      });
      // let rootNav: NavController = this.app.getRootNav();
      // rootNav.setRoot(TabsPage);


    }).catch(error => {

      loading.dismiss();
      //this.warnCtrl.toast('登陆失败');

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

}
