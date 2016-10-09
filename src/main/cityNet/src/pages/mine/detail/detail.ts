import {Component} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "./editDetail";


@Component({
  templateUrl: 'detail.html'
})
export class MineDetailPage {
  src:string = 'images/marty-avatar.png';
  imgHeight: string;
  pHeight: string;
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public app :App) {
    this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
    this.pHeight = `${this.platform.height()}px`;
    this.getUserInfo();

  }

  loginOut(){
    this.userService.loginOut();
    this.imService.clearCurrentData();
    this.imService.close();
    this.app.getRootNav().setRoot(LoginPage);

  }
  getUserInfo(){
    this.http.get('/user').then((res) => {
      let userExt = res.data.userExt;
      this.src = userExt && userExt.src || "images/marty-avatar.png";
      document.getElementById("nickName").innerText = res.data.nickname || res.data.mobile;
      document.getElementById("introduce").innerText = userExt.introduce || "还没有个人介绍哦";
    }).catch((error) => {
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  goChat(){
    this.navCtrl.push(EditDetailPage);
  }
  showImg($event){

  }

}
