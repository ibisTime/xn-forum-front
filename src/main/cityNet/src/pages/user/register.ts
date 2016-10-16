import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, App} from "ionic-angular";
import { TabsPage} from '../tabs/tabs';
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";
import {CityService} from "../../services/city.service";


@Component({
    templateUrl: "register.html"

})
export class RegisterPage implements OnInit {

  captchaValue;
  userNameValue;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(   public navCtrl: NavController,
                 public warnCtrl: WarnService,
                 public user: UserService,
                 public imServe: IMService,
                 public http: HttpService,
                 public app: App,
                 public cityService: CityService
                 ) {
    }

  ngOnInit() {
  }


  //验证码控件
  captchaClick(e){

    if (!this.userNameValue || this.userNameValue.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(this.userNameValue) ) {
      this.warnCtrl.toast("请输入正确的手机号码");
      return;
    }

    let btn = e.target;
    while( !/^button$/gi.test(btn.nodeName) ){
      btn = btn.parentNode;
    }
    btn.setAttribute("disabled", "disabled");

    for(var i = 0; i <= 30; i++){
        (function (i) {
            setTimeout(function(){
                if(i < 30){
                    btn.innerText = (30 - i) + "s";
                }else{
                    btn.removeAttribute("disabled");
                    btn.innerText = "发送验证码";
                }
            }, 1000*i);
        })(i);
    }

    let mobile = {
      "mobile" : this.userNameValue
    };
    this.http.post('/gene/register/send',mobile).then((res) => {
      //this.captchaView.beginTime();

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

    if(!captcha || captcha.length <= 3){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }

    let params = {
      mobile : userName,
      loginPwd: pwd,
      smsCaptcha: captcha
    }


    if(typeof(this.cityService.address != "undefined")){
      params["province"] = this.cityService.address.province;
      params["city"] = this.cityService.address.city;
      params["area"] = this.cityService.address.area;
    }


    /*注册*/
    let loading = this.warnCtrl.loading('');
    this.user.register(params).then(res => {

      loading.dismiss();
      this.app.getRootNav().setRoot(TabsPage);

    }).catch(error => {

      loading.dismiss();

    });

    // /*注册*/
    // this.http.post("/user/reg",params).then( res => {
    //
    //   this.warnCtrl.toast('注册成功');
    //   let userId = res.data.userId;
    //   // let tokenId = res.data
    //
    //   /*通过userId注册环信*/
    //   this.imServe.register(userId,"").then(() => {
    //
    //     loading.dismiss();
    //     this.warnCtrl.toast('注册IM成功');
    //     /*帮用户进行登陆*/
    //     let loginParams = {
    //       loginName: userName,
    //       loginPwd: pwd,
    //       terminalType: "1"
    //     }
    //
    //     return this.http.post('/user/login',loginParams);
    //
    //   }).then(res => {
    //     /*登陆成功 保存信息*/
    //     let tokenId = res["data"]["tokenId"];
    //     let userId = res["data"]["userId"];
    //
    //     console.log('在真机中使用');
    //     //保存 uid  和  tokenid
    //     this.user.saveUserInfo(tokenId,userId);
    //
    //     //切换控制
    //     this.navCtrl.push(TabsPage);
    //
    //   }).catch((error) => {
    //     this.warnCtrl.toast('注册IM失败');
    //     loading.dismiss();
    //   });
    //
    // }).catch( error => {
    //
    //   loading.dismiss();
    //   console.log('外部--失败');
    //
    // });


  }

  backLogin(){
    this.navCtrl.pop();
  }


}
