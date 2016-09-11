/**
 * Created by tianlei on 16/8/30.
 */

import {Component, OnInit } from '@angular/core';
import {IMService} from "../../serve/im.service";
import {UserService} from "../../serve/user.serve";
import {ForgetPwdPage} from  '../user/forgetPwd'
import {NavController} from "ionic-angular";
import {SettingPage} from "./setting";

@Component({
    templateUrl:"build/pages/mine/mine.html",

})
export class MinePage implements OnInit {
    constructor(private  userServe: UserService,
                private imServe: IMService,
                private navCtrl: NavController) { }

  ngOnInit() {
      // setInterval()
  }

  goSetting(){
    this.navCtrl.push(SettingPage);
  }

  changePassword(){
    this.navCtrl.push(ForgetPwdPage,"修改密码");
  }


  loginOut($event){

    this.userServe.loginOut();
    this.imServe.clearCurrentData();
    this.imServe.close();

  }

}
