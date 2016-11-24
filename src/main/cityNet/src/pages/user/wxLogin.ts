import {Component, OnInit, ViewChild} from '@angular/core';
import {NavController, App, NavParams, ViewController, Events, ModalController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {CaptchaComponent} from "../../components/captcha-view/captcha.component";
import {HttpService} from "../../services/http.service";
import {CityService} from "../../services/city.service";
import {CityChoosePage} from "../headline/city-choose";
import {ServiceProtocolPage} from "./serviceProtocol";
import {WXService} from "../../services/wx.service";
import {Release} from "../../services/release";


@Component({
    templateUrl: "wxLogin.html"

})
export class WXLoginPage implements OnInit {

    cityName = "";
    citycode = "";
    city;
    captchaValue;
    userNameValue;
    navbarHidden = false;
    locationSuccess;

    type;
    code;
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
                   public wxService: WXService
    ) {

        this.locationSuccess = typeof(this.cityS.locationSuccessAddressCode) != "undefined" && this.cityS.locationSuccessAddressCode.length > 0;

        // if(navParams.data.hidden){
        //     this.navbarHidden = navParams.data.hidden;
        // }

     this.code =  navParams.data.code;
     this.type =   navParams.data.type;


        // {"code":res, "type":"noMine"}
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
                            btn.innerText = "已发送" + "("+(120 - i)+")";
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

    register(userName, captcha) {

        if (!userName || userName.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(userName) ) {
            this.warnCtrl.toast("请输入正确的手机号码");
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


        //注册参数
        let params = {
            mobile: userName,
            smsCaptcha: captcha,
            code:this.code
        }

        if(!Release.weChat){
            params["appid"] = "wxa6c6d2544f85d4b9";
            params["secret"] = "eb0daccd6e456f604fc5dde0d14d6c69";
        }

        if(typeof(this.cityS.locationSuccessAddressCode) != "undefined" && this.cityS.locationSuccessAddressCode.length > 0){

            this.citycode = this.cityS.locationSuccessAddressCode;

        }

        params["companyCode"] = this.citycode;



        alert(JSON.stringify(params));

        /*注册*/
        let loading = this.warnCtrl.loading('');

        //10.201.6.19/xn-forum-front/
        this.http.get("/auth2/login/wx",params).then(res => {

            alert(JSON.stringify(res));
            // this.http.get("/auth2/login/wx",params).then(res => {

        return  this.user.wxLogin(res["data"]["userId"],res["data"]["tokenId"],res["data"]["isExist"]);

        }).then(res => {

            loading.dismiss();
            //登陆成功
            if(this.type == "noMine"){

                this.navCtrl.popToRoot();

            }  else  if(this.type = "mine") {

                this.navCtrl.pop();
                this.warn.toast("注册成功");

            }

        }).catch(error => {

            loading.dismiss();
            this.warn.toast(JSON.stringify(error));

        });

        //改为微信注册
        // code值  手机号 和 公司编号



    }


    cancle($event){
        this.viewCtrl.dismiss({"success":false});
    }


    backLogin(){
        this.navCtrl.pop();
    }

    //
    serviceProtocol(){

        this.navCtrl.push(ServiceProtocolPage);

    }

}
