import { Component, OnInit } from '@angular/core';
import { Platform, App, NavController, ToastController, AlertController} from "ionic-angular";
import { UserService } from '../serve/user-serve';
import { TabsPage} from '../tabs/tabs';
import { RegisterPage } from './register';


@Component({
  templateUrl: 'build/pages/login/login.html'
})
export class LoginPage implements OnInit {
  constructor(private  platform: Platform,
              private userServe: UserService,
              private app:App,
              private navCtrl: NavController,
              private toast: ToastController) {

  }

  ngOnInit() {
    console.log('登陆界面被创建了');
  }

  login(userName,pwd) {

    if (!(userName.length > 5 && pwd.length >5)) {
      let toast = this.toast.create({
        message: '请输入正确的账户和密码',
        duration: 2000,
        position: 'top'
      });
      toast.present();
      return;
    }

    this.platform.ready().then(() => {
      console.log('在真机中使用');
      this.userServe.saveUserInfo(userName);
      this.app.getRootNav().setRoot(TabsPage);
    });

  }

  register($event) {
    this.navCtrl.push(RegisterPage)
  }


}
