/**
 * Created by tianlei on 2016/10/21.
 */
import {Component,ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {CaptchaComponent} from "../../../components/captcha-view/captcha.component";


@Component({
    templateUrl: 'changeMobile.html'
})
export class ChangeMobilePage {

    @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;

    phoneNum;
    constructor(public navCtrl: NavController,
                public platform: Platform,
                public userService: UserService,
                public warnCtrl: WarnService,
                public http: HttpService) {

    }

    captchaClick($event){

        if (!/^1[3,4,5,7,8]\d{9}$/.test(this.phoneNum) ) {
            this.warnCtrl.toast("请输入正确的手机号码");
            return;
        }

        this.captchaView.beginTime();
        let mobile = {
            "mobile" : this.phoneNum
        };
        this.http.post('/gene/changemobile/send',mobile).then((res) => {

           this.captchaView.beginTime();


        }).catch((error) => {
        });


    }


    change(){

        if (!/^1[3,4,5,7,8]\d{9}$/.test(this.phoneNum) ) {
            this.warnCtrl.toast("请输入正确的手机号码");
            return;
        }

        let obj = {
            "newMobile": this.phoneNum,
            "smsCaptcha":this.captchaView.captcha
        };
        let load = this.warnCtrl.loading();
        this.http.post("/user/mobile/change",obj).then(res => {

            load.dismiss();
            this.warnCtrl.toast("修改成功");
            this.navCtrl.pop();
        }).catch(error => {
            load.dismiss();
        });


    }

}
