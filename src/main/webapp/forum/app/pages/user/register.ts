import { Component, OnInit } from '@angular/core';
import {AlertController, App, ToastController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {UserService} from "../../serve/user.serve";
import {IMService} from "../../serve/im.serve";
import {WarnService} from "../../serve/warn.serve";


@Component({
    templateUrl: "build/pages/user/register.html",
    providers: [UserService]
})
export class RegisterPage implements OnInit {
    constructor(
                 private app:App,
                 private warnCtrl: WarnService,
                 private user: UserService,
                 private imServe: IMService) { }

  ngOnInit() { }

  register(userName, pwd) {

    if (!(userName.length > 5 && pwd.length > 5)) {

      this.warnCtrl.alert('请输入正确的账户名和密码');

    } else {

      //检测到用户没有注册,帮助注册环信
      this.imServe.register(userName, pwd, userName).then(() => {
        this.imServe.login(userName,pwd);
      });
      //提示
      this.warnCtrl.toast('注册成功');
      //保存用户信息
      this.user.saveUserInfo(userName);
      this.app.getRootNav().setRoot(TabsPage);
    }

  }


}
