import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {ImPage} from "../im/im";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "./editDetail";


@Component({
  templateUrl: 'build/pages/mine/detail/detail.html'
})
export class DetailPage {
  src:string = 'images/marty-avatar.png';
  imgHeight: string;
  pHeight: string;
  constructor(private navCtrl: NavController,
              private platform: Platform,
              private userService: UserService,
              private imService: IMService,
              private warnCtrl: WarnService,
              private http: HttpService,
              private app :App) {
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
      document.getElementById("nickname").innerText = res.data.nickname || res.data.mobile;
    }).catch((error) => {
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  goChat(){
    this.navCtrl.push(EditDetailPage);
  }

}