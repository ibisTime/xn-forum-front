import { Component, OnInit } from '@angular/core';
import { Platform, App, NavController, ToastController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import { RegisterPage } from './register';
import { UserService } from "../../serve/user.serve";
import {UserCopyService} from "../../serve/user.copy.serve";


@Component({
  templateUrl: 'build/pages/user/login.html',
})
export class LoginPage implements OnInit {

  constructor(
              private navCtrl: NavController,
              private platform: Platform,
              private app:App,
              private toast: ToastController,
              private userServe: UserService
             ) {
  }


  // private toast: ToastController
  ngOnInit() {
    console.log('登陆界面被创建了');
  }

  // login(userName,pwd) {
  //
  //   if (!(userName.length > 5 && pwd.length >5)) {
  //     let toastCon = this.toast.create({
  //       message: '请输入正确的账户和密码',
  //       duration: 2000,
  //       position: 'top'
  //     });
  //     toastCon.present();
  //     return;
  //   }
  //
  //   this.platform.ready().then(() => {
  //     console.log('在真机中使用');
  //     this.userServe.saveUserInfo(userName);
  //     this.app.getRootNav().setRoot(TabsPage);
  //   });
  //
  // }
  //
  // register($event) {
  //   this.navCtrl.push(RegisterPage)
  // }

}
