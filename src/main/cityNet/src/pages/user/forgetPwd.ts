import {
  Component, AfterViewInit, ViewChild, Directive

} from '@angular/core';
import { NavController, NavParams} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";


@Directive({ selector: 'input' })
export class InputItem {}

@Component({
  templateUrl: "forgetPwd.html"

})
export class ForgetPwdPage implements AfterViewInit {

  title = "忘记密码";
  @ViewChild(InputItem) userNameInput: InputItem;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  list;
  inputDisable = "";
  userNameValue = "";
  captchaValue = "";
  phone='';
  constructor(   public navCtrl: NavController,
                 public warnCtrl: WarnService,
                 public user: UserService,
                 public para: NavParams,
                 public http: HttpService,
                 public imServe: IMService
                 ) {
  }

  ngAfterViewInit(){

    if(this.para.data == "修改密码"){
      this.title = this.para.data;
      let an =  this.userNameInput;
      this.inputDisable = "disabled";
      // this.userNameValue = this.user.userName;
    }
    // this.inputDisable = false;

  }

  ngOnInit() {

  }

  //验证码控件
  captchaClick(e){

    if (this.userNameValue.length < 5){

      this.warnCtrl.toast('请输入正确的手机号吗');
      return;
    }

    let btn = e.target;





    let mobile = {
      "mobile" : this.userNameValue
    };
    this.http.post('/gene/findloginpwd/send',mobile).then((res) => {

      while( !/^button$/gi.test(btn.nodeName) ){
        btn = btn.parentNode;
      }
      btn.setAttribute("disabled", "disabled");
      for(var i = 0; i <= 60; i++){
        (function (i) {
          setTimeout(function(){
            if(i < 60){
              btn.innerText = (60 - i) + "s";
            }else{
              btn.removeAttribute("disabled");
              btn.innerText = "发送验证码";
            }
          }, 1000*i);
        })(i);
      }

    }).catch((error) => {
      this.warnCtrl.toast('验证码发送失败，请稍后重试!');
    });

  }

  register(userName, captcha, pwd, rePwd) {
    if (!userName || userName.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(userName) ) {
      this.warnCtrl.toast("请输入正确的手机号码");
      return;
    }

    if(pwd != rePwd){
      this.warnCtrl.toast('两次密码输入不一致');
      return;
    }

    if(!captcha || captcha.length < 4){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }

    let find = {
      "mobile" : userName,
      "smsCaptcha":captcha,
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
