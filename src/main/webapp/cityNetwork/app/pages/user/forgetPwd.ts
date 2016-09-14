import {
  Component, AfterViewInit, ViewChild, Renderer, Directive, ElementRef

} from '@angular/core';
import {App, NavController, NavParams} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";


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
  userNameValue = "";
  phone='';
  constructor(   private navCtrl: NavController,
                 private warnCtrl: WarnService,
                 private user: UserService,
                 private para: NavParams,
                 private http: HttpService,
                 private imServe: IMService
                 ) {
    let t = this.navCtrl;
  }

  ngAfterViewInit(){

    if(this.para.data == "修改密码"){
      this.title = this.para.data;
      let an =  this.userNameInput;
      this.inputDisable = "disabled";
      this.userNameValue = this.user.userName;
    }
    // this.inputDisable = false;

  }

  ngOnInit() {

  }

  //验证码控件
  captchaClick(){

    if (this.userNameValue.length < 5){

      this.warnCtrl.toast('请输入正确的手机号吗');
      return;
    }

    let mobile = {
      "mobile" : this.userNameValue
    };
    this.http.post('/gene/findloginpwd/send',mobile).then((res) => {
      this.captchaView.beginTime();
    }).catch((error) => {

    });

  }

  register(userName, pwd, rePwd) {

    if (!(userName.length > 5 && pwd.length > 5)) {

      this.warnCtrl.toast("请输入6~16位的账户和密码");
      return;
    }

    if(pwd != rePwd){
      this.warnCtrl.toast('两次密码输入不一致');
      return;
    }

    if(this.captchaView.captcha.length < 4){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }

    let find = {
      "mobile" : userName,
      "smsCaptcha":this.captchaView.captcha,
      "newLoginPwd" :pwd
    }

    let load = this.warnCtrl.loading("");
      this.http.post('/user/loginpwd/find',find).then((res) => {

        this.warnCtrl.toast('修改成功');

        //保存用户信息
        this.user.saveUserInfo(userName, pwd);
        this.imServe.login(userName);
        load.dismiss();
        this.navCtrl.push(TabsPage,null,{animate: false});


        // setTimeout(() => {
        //   this.navCtrl.pop();
        // },50);
        // this.imServe.login(userName);
        // this.navCtrl.parent.parent.push(TabsPage);

      }).catch((error) => {

        load.dismiss();

      });




  }

  pop(){
    this.navCtrl.popToRoot();
  }

}
