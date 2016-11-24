import {Component} from '@angular/core';
import {Platform, NavController, Events, App, ViewController} from "ionic-angular";

import { RegisterPage } from './register';
import {WarnService} from "../../services/warn.service";

import {ForgetPwdPage} from "./forgetPwd";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {WXService} from "../../services/wx.service";
import {Release } from "../../services/release"
import {NavService} from "../../services/nav.service";
import {IFramePage} from "../headline/iframe";
import {WXLoginPage} from "./wxLogin";
import {BindingMobilePage} from "./bindingMobile";
@Component({

  templateUrl: "login.html"

})
export class LoginPage  {

  fromReg = false;
  otherLoginDisplay = "block";
  constructor(
              public uService: UserService,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public http: HttpService,
              public app: App,
              public viewCtrl: ViewController,
              public events: Events,
              public wxService: WXService

             ) {

    // this.events.subscribe("reginst：success",res => {
    //
    //   this.fromReg = true;
    //
    // });
    if(!Release.weChat){
      this.otherLoginDisplay = this.wxService.isInstalled ? "block" : "none";
    }


    //微信登陆成功
    // window.addEventListener('message',e => {
    //
    // },false);


  }


  ionViewWillEnter(){
    // if(this.uService.registerHelper){
    //   this.viewCtrl.dismiss();
    // }
  }


  login(userName,pwd) {
    if (userName.length <= 0) {
      this.warnCtrl.toast("请输入登录名");
      return;
    }

    let params = {
      loginName: userName,
      loginPwd: pwd,
      terminalType: "1"
    }

    let loading = this.warnCtrl.loading('登录中');
    this.uService.login(params).then(res => {

      loading.dismiss().then(res => {

        // this.viewCtrl.dismiss({"success":true});
        this.navCtrl.pop();

      });
      // let rootNav: NavController = this.app.getRootNav();
      // rootNav.setRoot(TabsPage);


    }).catch(error => {

      loading.dismiss();

    });




  }

  cancle($event){
    this.viewCtrl.dismiss({"success":false});
  }

  register($event) {
    this.navCtrl.push(RegisterPage)
  }

  findPwd($event){
    this.navCtrl.push(ForgetPwdPage);
  }

  wxLogin(){

    if(Release.weChat){
      //微信

      let url = Release.wxLoginUrl();

     // let url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef7fda595f81f6d6&redirect_uri=http://tcaigo.xiongniujr.com&response_type=code&scope=snsapi_userinfo&state=register&connect_redirect=1#wechat_redirect"
      console.log(url);
      this.navCtrl.push(IFramePage,{"url":url,"title":""});


    } else {


      //1.获取code
      this.wxService.wxGetAuthCode().then(res => {

        console.log("微信code" + res);
        //1.判断用户是否存在

        let codeV = res;
        let obj = {
          code: codeV,
          appid: "wxa6c6d2544f85d4b9",
          secret: "eb0daccd6e456f604fc5dde0d14d6c69"
        }

        let load = this.warnCtrl.loading();
        let mobile;
        this.http.get("/auth2/login/wx",obj).then(res => {

          // alert(JSON.stringify(res));

          mobile = res["data"]["mobile"];
          return this.uService.wxLogin(res["data"]["userId"], res["data"]["tokenId"], res["data"]["isExist"]);

        }).then(res => {

            load.dismiss();
            this.warnCtrl.toast("登录成功");
            //判断是否绑定手机号码，没绑定————绑定
            if(!mobile){
                this.navCtrl.push(BindingMobilePage,{"type":"noMine"});
            }

        }).catch(error => {

            this.warnCtrl.toast("登录失败");
            load.dismiss();

        });


      }).catch(error => {

        this.warnCtrl.toast("登录失败");

      });


      //app
      // let load = this.warnCtrl.loading();
      // this.wxService.wxLogin().then(res => {
      //
      //  return this.uService.wxLogin(res["data"]["userId"],res["data"]["tokenId"],res["data"]["isExist"]);
      //
      //
      // }).then(res => {
      //
      //   load.dismiss();
      //   this.warnCtrl.toast("登录成功");
      //   this.navCtrl.pop();
      //
      // }).catch(error => {
      //
      //   this.warnCtrl.toast("登录失败");
      //   load.dismiss();
      //
      // });


    }

  }

}
