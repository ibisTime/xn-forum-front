import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {ImPage} from "./im/im";
import {IMService} from "../../services/im.service";
import {LoginPage} from "../user/login";
import {HttpService} from "../../services/http.service";


@Component({
  templateUrl: 'build/pages/mine/mine.html'
})
export class MinePage {

  className = 'test-class';
  forumData = [
    {"name": '帖子',"count":'16'},
    {"name": '关注',"count":'26'},
    {"name": '粉丝',"count":'36'},
    {"name": '赏金',"count":'66'},
  ];

  listItem = [
    {"name":'我的物品',"src":'iconfont icon-search'},
    {"name":'我的收藏',"src":'&#xe60e;'},
    {"name":'草稿箱',"src":'&#xe613;'},
    {"name":'我的消息',"src":'&#xe610;'},
    {"name":'设置',"src":'&#xe603;'},
    {"name":'退出登录',"src":'&#xe617;'},
  ];
  src:string = 'images/marty-avatar.png';

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private userService: UserService,
              private imService: IMService,
              private warnCtrl: WarnService,
              private http: HttpService,
              private app :App) {
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
    }).catch((error) => {
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  goChat(){
    this.navCtrl.push(ImPage);

  }

}
