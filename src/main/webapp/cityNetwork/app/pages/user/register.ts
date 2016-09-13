import {Component, OnInit, ViewChild} from '@angular/core';
import {App, NavController} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.services";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";


@Component({
    templateUrl: "build/pages/user/register.html",
    directives: [CaptchaComponent]

})
export class RegisterPage implements OnInit {

  src;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(   private navCtrl: NavController,
                 private warnCtrl: WarnService,
                 private user: UserService,
                 private imServe: IMService,
                 private http: HttpService
                 ) {
    this.src = this.http.src;
    }

  ngOnInit() {
  }


  //验证码控件
  captchaClick(){

    1 && this.captchaView.beginTime();

  }

  refreshImg($event){
    $event.target.src = this.src;
  }

  register(userName ,imgCaptcha) {

    if (!(userName.length > 5 )) {

      this.warnCtrl.toast('请输入正确的账户名和密码');
      return;
    }
    //
    // if(pwd != rePwd){
    //   this.warnCtrl.toast('两次密码输入不一致');
    //   return;
    // }

    // if(this.captchaView.captcha.length <= 4){
    //   this.warnCtrl.toast('请输入正确的验证码');
    //   return;
    // }
    if(imgCaptcha.length <= 0){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }

    let params = {
      loginName : userName,
      captcha: imgCaptcha,
      userReferee: "tianlei"
    }



    let loading = this.warnCtrl.loading('');
    /*注册*/
    this.http.post("/user/regist",params).then( res => {
      console.log(res);

      this.warnCtrl.toast('注册成功');
      //帮助用户注册环信
      this.imServe.register(userName,"").then(() => {
        this.warnCtrl.toast('注册IM成功');
        //保存用户信息
        this.user.saveUserInfo(userName, userName);
        this.navCtrl.push(TabsPage);
        loading.dismiss();
      }).catch((error) => {
        this.warnCtrl.toast('注册IM失败');
        loading.dismiss();
      });

    }).catch( error => {

      loading.dismiss();
      console.log('外部--失败');

    });






  }

  backLogin(){
    this.navCtrl.pop();
  }


}
