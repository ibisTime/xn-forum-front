import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/mine/mine.html'
})
export class MinePage {

  forumData = [
    {"name": '帖子',"count":'16'},
    {"name": '关注',"count":'26'},
    {"name": '粉丝',"count":'36'},
    {"name": '赏金',"count":'66'},
  ];

  listItem = [
    {"name":'我的物品',"src":''},
    {"name":'我的收藏',"src":''},
    {"name":'草稿箱',"src":''},
    {"name":'我的消息',"src":''},
    {"name":'设置',"src":''},
    {"name":'退出登录',"src":''},
  ];

  constructor(private navCtrl: NavController,
              private platform: Platform) {

  }

}
