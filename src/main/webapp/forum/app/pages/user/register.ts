import { Component, OnInit } from '@angular/core';
import {AlertController, App, ToastController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {UserService} from "../../serve/user.serve";
import {IMService} from "../../serve/im.serve";


@Component({
    templateUrl: "build/pages/login/register.html"
})
export class RegisterPage implements OnInit {
    constructor( private alert: AlertController,
                 private app:App,
                 private toast: ToastController,
                 private user: UserService,
                 private imServe: IMService) { }

  ngOnInit() { }

  register(userName, pwd) {

    if (!(userName.length > 5 && pwd.length > 5)) {

      this.cdAlert('请输入正确的账户名和密码');

    } else {

      //检测到用户没有注册,帮助注册环信
      this.imServe.register(userName, pwd, userName);

      let toast = this.toast.create({
        message: '注册成功',
        duration: 3000,
        position: 'top',
      });
      toast.present();

      this.user.saveUserInfo(userName);

      this.app.getRootNav().setRoot(TabsPage);
    }

  }

  cdAlert(message,confirmAction?: () => void){

    let  alert = this.alert.create({
      message: message,
      buttons: [{
        text: '确定',
        handler: () => {
          // console.log(confirmAction);
          typeof(confirmAction) === "undefined"  ? 1>0 : confirmAction();
        }
      }]
    });
    alert.present();

  };

}
