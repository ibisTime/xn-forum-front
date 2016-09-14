import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UserService} from "../../services/user.services";
import {ImPage} from "./im/im";


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

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private userService: UserService) {

  }

  loginOut(){
    this.userService.loginOut();
  }

  goChat(){
    this.navCtrl.push(ImPage);

  }

}
