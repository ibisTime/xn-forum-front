import {Component, OnInit} from '@angular/core';
import {Platform, NavController } from "ionic-angular";
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
              private uService: UserService,
              private navCtrl: NavController,
              private platform: Platform,
              private warnCtrl : WarnService,
              private http: HttpService

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
      this.platform.ready().then(() => {

        console.log('在真机中使用');
        //保存用户信息
        this.uService.saveUserInfo(userName,res.data);

        //切换控制
        this.navCtrl.push(TabsPage);

        // this.navCtrl.pop();
        // //登录环信
        // this.imServe.login(userName);
        // //客服,赋值
        // this.kefu.me = userName;
        // this.navCtrl.parent.parent.push(TabsPage);
      });

    }).catch(error => {
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
