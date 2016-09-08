import {
  Component, AfterViewInit, ViewChild, Renderer, Directive, ElementRef

} from '@angular/core';
import {App, NavController, NavParams} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../serve/im.service";
import {WarnService} from "../../serve/warn.service";
import {UserService} from "../../serve/user.serve";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";


@Directive({ selector: 'input' })
export class InputItem {}

@Component({
  templateUrl: "build/pages/user/forgetPwd.html",
  directives: [CaptchaComponent]

})
export class ForgetPwdPage implements AfterViewInit {

  title = "忘记密码";
  @ViewChild(InputItem) userNameInput: InputItem;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  list;
  inputDisable = "";
  userNameValue = null;
  constructor(   private navCtrl: NavController,
                 private app:App,
                 private warnCtrl: WarnService,
                 private user: UserService,
                 private para: NavParams,
                 private render: Renderer,
                 private ele: ElementRef
                 ) {
  }

  ngAfterViewInit(){

    if(this.para.data == "修改密码"){
      this.title = this.para.data;
      let an =  this.userNameInput;
      this.inputDisable = "disabled";
      this.userNameValue = this.user.userName;
    }
    // this.inputDisable = false;
    setTimeout(() => {
      console.log(this.userNameInput);

    },3000);

    // let userNameInput = this.ele.nativeElement.query('input');

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

    //提示
    this.warnCtrl.toast('修改成功');
    //帮助用户注册环信

    //保存用户信息
    this.user.saveUserInfo(userName, pwd);
    this.app.getRootNav().setRoot(TabsPage);
  }

}
