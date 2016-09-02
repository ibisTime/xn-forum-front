import {Component, OnInit, ViewChild} from '@angular/core';
import {App, NavController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../serve/im.serve";
import {WarnService} from "../../serve/warn.service";
import {UserAccountService} from "../../serve/user-account.serve";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {Http, HTTP_PROVIDERS} from "@angular/http";


@Component({
    templateUrl: "build/pages/user/register.html",
    directives: [CaptchaComponent]

})
export class RegisterPage implements OnInit {

  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(   private navCtrl: NavController,
                 private app:App,
                 private warnCtrl: WarnService,
                 private user: UserAccountService,
                 private imServe: IMService,
                 private http: Http) {
    }

  ngOnInit() {
  }

  //验证码控件
  captchaClick(){

    1 && this.captchaView.beginTime();

  }

  register(userName, pwd, rePwd) {

    if (!(userName.length > 5 && pwd.length > 5)) {

      this.warnCtrl.toast('请输入正确的账户名和密码');
      return;
    }

    if(pwd != rePwd){
      this.warnCtrl.toast('两次密码输入不一致');
      return;
    }

    if(this.captchaView.captcha.length <= 4){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }


      //检测到用户没有注册,环信在im模块登陆
    // this.http.get()
    // let hero = {
    //   name: "tianlei005",
    //   age: 22
    // }
    // JSON.stringify(hero);

      //提示
      this.warnCtrl.toast('注册成功');

      //帮助用户注册环信
      this.imServe.register(userName,pwd,"");

      //保存用户信息
      this.user.saveUserInfo(userName, pwd);
      this.app.getRootNav().setRoot(TabsPage);


  }
  backLogin(){
    this.navCtrl.pop();
  }


}
