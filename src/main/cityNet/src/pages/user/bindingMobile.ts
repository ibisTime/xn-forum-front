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
    templateUrl: "bindingMobile.html"
})
export class BindingMobilePage implements OnInit {

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


        // if(navParams.data.hidden){
        //     this.navbarHidden = navParams.data.hidden;
        // }

        this.code =  navParams.data.code;
        this.type =   navParams.data.type;


        // {"code":res, "type":"noMine"}
    }

    ngOnInit() {


    }


    //验证码控件
    captchaClick(e){


         let load = this.warnCtrl.loading();
        if (!this.userNameValue || this.userNameValue.length != 11 || !/^1[3,4,5,7,8]\d{9}$/.test(this.userNameValue) ) {
            this.warnCtrl.toast("请输入正确的手机号码");
            return;
        }

        let btn = e.target;
        let mobile = {
            "mobile" : this.userNameValue
        };

        this.http.post('/gene/bindmobile/send',mobile).then((res) => {

            load.dismiss();
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

            load.dismiss();
            // this.warnCtrl.alert("验证码失败" + error);

        });

        e.stopPropagation();

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


        //注册参数
        let params = {
            mobile: userName,
            smsCaptcha: captcha,
        }


        // alert(JSON.stringify(params));
        /*注册*/
        let loading = this.warnCtrl.loading('');
        // 10.201.6.19/xn-forum-front/
        this.http.post("/user/mobile/bind",params).then(res => {

            loading.dismiss();
            this.warn.toast("绑定成功");
            if(this.type == "mine"){

                this.navCtrl.pop();

            }  else if(this.type == "noMine"){

                this.navCtrl.popToRoot();
            }

            /*异步更新用户数据*/
            this.http.get('/user/info').then(res => {
                this.user.user = res.data;
            }).catch(error => {

            });

        }).catch(error => {
            loading.dismiss();
            // this.warn.toast("绑定失败"+ error);
        });


    }


    backLogin(){
        this.navCtrl.pop();
    }



}
