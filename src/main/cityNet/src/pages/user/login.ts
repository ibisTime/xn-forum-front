import {Component, OnInit} from '@angular/core';
import {Platform, NavController, Events} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';

import { RegisterPage } from './register';
import {WarnService} from "../../services/warn.service";

import {ForgetPwdPage} from "./forgetPwd";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";

@Component({

  templateUrl: "login.html"

})
export class LoginPage implements OnInit {

  constructor(
              public uService: UserService,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public http: HttpService,
              public events: Events

             ) {

  }

  ngOnInit() {
    console.log('登陆界面被创建了');
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

    let loading = this.warnCtrl.loading('登录中');
    this.http.post('/user/login',params).then((res) => {

      loading.dismiss();

      let tokenId = res["data"]["tokenId"];
      let userId = res["data"]["userId"];
      /*发出登陆成功通知*/
      this.events.publish("user:loginSuccess");

      //保存 uid  和  tokenid
      this.uService.saveUserInfo(tokenId, userId);
      //切换控制
      this.navCtrl.push(TabsPage);


    }).catch(error => {
      console.log("denglu");
      loading.dismiss();
    });

  }

  register($event) {
    this.navCtrl.push(RegisterPage)
  }

  findPwd($event){
    this.navCtrl.push(ForgetPwdPage);
  }

}
