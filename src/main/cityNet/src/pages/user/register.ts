import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, App, NavParams, ViewController, Events, ModalController} from "ionic-angular";
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
  citycode = "";
  city;
  captchaValue;
  userNameValue;
  navbarHidden = false;
  locationSuccess;
  @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;
  constructor(   public navCtrl: NavController,
                 public warnCtrl: WarnService,
                 public user: UserService,
                 public http: HttpService,
                 public app: App,
                 public navParams: NavParams,
                 public viewCtrl: ViewController,
                 public events: Events,
                 public mCtrl: ModalController,
                 public cityS: CityService,
                 public warn: WarnService,
  ) {

    console.log(this.cityS.locationSuccessAddressCode);
    this.locationSuccess = typeof(this.cityS.locationSuccessAddressCode) != "undefined" && this.cityS.locationSuccessAddressCode.length > 0;

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
      for(var i = 0; i <= 120; i++){
        (function (i) {
          setTimeout(function(){
            if(i < 120){
              btn.innerText = "已发送" + "("+(120 - i) + "s"+")";
            }else{
              btn.removeAttribute("disabled");
              btn.innerText = "发送验证码";
            }
          }, 1000*i);
        })(i);
      }

    }).catch((error) => {

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

    if(!/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{6,16})$/.test(pwd)){

      this.warnCtrl.toast("密码必须为6~16位,同时包含数字和字母");
      return;
    }

    if(!captcha || captcha.length <= 3){
      this.warnCtrl.toast('请输入正确的验证码');
      return;
    }

    if((typeof(this.cityS.locationSuccessAddressCode) == "undefined") && this.citycode.length <= 0){
      this.warnCtrl.toast("请选择站点");
      return;
    }

    let params = {
      mobile : userName,
      loginPwd: pwd,
      smsCaptcha: captcha
    }

    if(typeof(this.cityS.locationSuccessAddressCode) != "undefined" && this.cityS.locationSuccessAddressCode.length > 0){

      this.citycode = this.cityS.locationSuccessAddressCode;

    }

    params["companyCode"] = this.citycode;



    /*注册*/
    let loading = this.warnCtrl.loading('');
    this.user.register(params).then(res => {

      loading.dismiss().then(res =>{

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
