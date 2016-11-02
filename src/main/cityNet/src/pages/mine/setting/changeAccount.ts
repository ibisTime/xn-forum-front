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
    templateUrl: 'changeAccount.html'
})
export class ChangeAccountPage {

    @ViewChild(CaptchaComponent) captchaView: CaptchaComponent;

    loginName;
    oldLoginName
    constructor(public navCtrl: NavController,
                public platform: Platform,
                public userService: UserService,
                public warnCtrl: WarnService,
                public http: HttpService) {

        this.oldLoginName = this.userService.user.loginName;

    }

    change(){
        if(this.loginName && this.loginName.trim() !== ""){
            let obj = {
                "loginName": this.loginName.trim(),
            };
            let load = this.warnCtrl.loading();

            this.http.post("/user/username",obj).then(res => {
                load.dismiss();
                this.warnCtrl.toast("修改成功");
                this.navCtrl.pop();
                this.userService.user.loginName = obj.loginName;
            }).catch(error => {
                load.dismiss();
            });
        }else{
            this.warnCtrl.toast("登录名不能为空!");
        }
    }

}
