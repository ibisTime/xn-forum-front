import { Component, OnInit } from '@angular/core';
import {Platform, App, NavController } from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import { RegisterPage } from './register';
import {WarnService} from "../../serve/warn.serve";
import {IMService} from "../../serve/im.serve";
import {UserAccountService} from "../../serve/user-account.serve";


@Component({
  templateUrl: "build/pages/user/login.html"
})
export class LoginPage implements OnInit {

  constructor(
              private navCtrl: NavController,
              private platform: Platform,
              private app:App,
              private userServe: UserAccountService,
              private warnCtrl : WarnService,
              private imServe: IMService
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
    let loading = this.warnCtrl.loading('登录中');
    loading.present();

    setTimeout(() => {

      loading.dismiss();
      this.platform.ready().then(() => {
        console.log('在真机中使用');
        //保存用户信息
        this.userServe.saveUserInfo(userName,pwd);
        //切换控制
        this.app.getRootNav().setRoot(TabsPage);
      });

    },500);
  }

  register($event) {
    this.navCtrl.push(RegisterPage)
  }

}
