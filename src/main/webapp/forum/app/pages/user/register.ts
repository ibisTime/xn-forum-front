import {Component, OnInit, ViewChild} from '@angular/core';
import {App, NavController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../serve/im.serve";
import {WarnService} from "../../serve/warn.serve";
import {UserAccountService} from "../../serve/user-account.serve";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";


@Component({
    templateUrl: "build/pages/user/register.html",
    directives: [CaptchaComponent]

})
export class RegisterPage implements OnInit {

  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(  private navCtrl: NavController,
                 private app:App,
                 private warnCtrl: WarnService,
                 private user: UserAccountService,
                 private imServe: IMService) {
    }

  ngOnInit() {
  }

  //验证码控件
  captchaClick(){

    1 && this.captchaView.beginTime();

  }

  register(userName, pwd) {

    if (!(userName.length > 5 && pwd.length > 5)) {

      this.warnCtrl.toast('请输入正确的账户名和密码');

    } else {

      //检测到用户没有注册,环信在im模块登陆

      //提示
      this.warnCtrl.toast('注册成功');

      //帮助用户注册环信
      this.imServe.register(userName,pwd,"");

      //保存用户信息
      this.user.saveUserInfo(userName, pwd);
      this.app.getRootNav().setRoot(TabsPage);

    }
  }
  backLogin(){
    this.navCtrl.pop();
  }


}
