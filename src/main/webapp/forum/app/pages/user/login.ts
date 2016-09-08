import {Component, OnInit, ViewChild} from '@angular/core';
import {Platform, App, NavController } from "ionic-angular";
import { TabsPage} from '../tabs/tabs';

import { RegisterPage } from './register';
import {WarnService} from "../../serve/warn.service";
import {IMService} from "../../serve/im.service";
import {UserService} from "../../serve/user.serve";

import {ForgetPwdPage} from "./forgetPwd";
import {HttpService} from "../../serve/http.service";

@Component({
  templateUrl: "build/pages/user/login.html"
})
export class LoginPage implements OnInit {

  constructor(
              private navCtrl: NavController,
              private platform: Platform,
              private app:App,
              private userServe: UserService,
              private warnCtrl : WarnService,
              private imServe: IMService,
              private http: HttpService
             ) {
  }
  // private toast: ToastController


  ngOnInit() {
    console.log('登陆界面被创建了');
  }

  login(userName,pwd) {

    if (!(userName.length > 5 && pwd.length >5)) {
      this.warnCtrl.toast('请输入正确的账户和密码');
      return;
    }


    let params = {
      loginName: userName,
      loginPwd: pwd,
      terminalType: 1
    }

    // /**/
    // this.imServe.login(this.userServe.userName);
    // this.navCtrl.push(TabsPage,null,{animate: false});
    // this.userServe.saveUserInfo(userName, pwd);
    // /**/

    let loading = this.warnCtrl.loading('登录中');
    this.http.post('/user/login',params).then((res) => {

      loading.dismiss();
      this.platform.ready().then(() => {
        console.log('在真机中使用');
        //保存用户信息
        this.userServe.saveUserInfo(userName,pwd);
        //切换控制
        this.navCtrl.push(TabsPage,null,{animate: false});
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
