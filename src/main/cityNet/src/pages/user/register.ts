import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, App, NavParams, ViewController, Events, TextInput, ModalController} from "ionic-angular";
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";
import {CityService} from "../../services/city.service";
import {CityChoosePage} from "../headline/city-choose";


@Component({
    templateUrl: "register.html"

})
export class RegisterPage implements OnInit {

  cityName = "";
  citycode;
  city;
  captchaValue;
  userNameValue;
  navbarHidden = false;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(   public navCtrl: NavController,
                 public warnCtrl: WarnService,
                 public user: UserService,
                 public imServe: IMService,
                 public http: HttpService,
                 public app: App,
                 public navParams: NavParams,
                 public viewCtrl: ViewController,
                 public events: Events,
                 public mCtrl: ModalController,
                 public cityS: CityService,
                 public warn: WarnService,
  ) {


    if(navParams.data.hidden){
      this.navbarHidden = navParams.data.hidden;
    }

    }

  ngOnInit() {

  }


  chooseCity($event){

    let load = this.warn.loading("加载站点中..");

    this.cityS.getCity().then(() => {

      load.dismiss().then(res => {

        let model = this.mCtrl.create(CityChoosePage,{"isReg":true});
        model.onDidDismiss((city) => {

          if(typeof(city) != "undefined"){

            this.cityName = city.name;
            this.citycode = city.code;
            this.city = city;

          }

        });
        model.present();

      });

    }).then((res) => {

    }).catch(error => {


    });

    $event.stopPropagation();

  }


  //验证码控件
  captchaClick(e){

    if (!this.userNameValue || this.userNameValue.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(this.userNameValue) ) {
      this.warnCtrl.toast("请输入正确的手机号码");
      return;
    }

    let btn = e.target;


    let mobile = {
      "mobile" : this.userNameValue
    };
    this.http.post('/gene/register/send',mobile).then((res) => {

      while( !/^button$/gi.test(btn.nodeName) ){
        btn = btn.parentNode;
      }
      btn.setAttribute("disabled", "disabled");
      for(var i = 0; i <= 60; i++){
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

    if(this.cityName.length <= 0){
      this.warnCtrl.toast("请选择站点");
      return;
    }

    let params = {
      mobile : userName,
      loginPwd: pwd,
      smsCaptcha: captcha,
      loginPwdStrength: "2"
    }

    params["province"] = this.city.province;
    params["city"] = this.city.city;
    params["area"] = this.city.area;

    // if(typeof(this.cityS.regAddress != "undefined")){
    //   params["province"] = this.cityS.regAddress.province;
    //   params["city"] = this.cityS.regAddress.city;
    //   params["area"] = this.cityS.regAddress.area;
    // }


    /*注册*/
    let loading = this.warnCtrl.loading('');
    this.user.register(params).then(res => {

      loading.dismiss().then(res =>{


        // this.user.registerHelper = true;
        // this.viewCtrl.dismiss({"success":true}).then(res => {
        //
        // });
        this.navCtrl.popToRoot();

      });


    }).catch(error => {

      loading.dismiss();

    });


  }


  cancle($event){
    this.viewCtrl.dismiss({"success":false});
  }


  backLogin(){
    this.navCtrl.pop();
  }

}
