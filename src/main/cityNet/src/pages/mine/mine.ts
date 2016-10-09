import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {ImPage} from "./im/im";
import {IMService} from "../../services/im.service";
import {LoginPage} from "../user/login";
import {HttpService} from "../../services/http.service";
import {MineDetailPage} from "./detail/detail";


@Component({
  templateUrl: 'mine.html'
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
  tzCount = '0';
  gzCount = '0';
  fsCount = '0';

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public app :App) {
    this.getUserInfo();
    this.queryTZCount();
    this.queryGZCount();
    this.queryFSCount();
  }

  loginOut(){
    this.userService.loginOut();
    this.imService.clearCurrentData();
    this.imService.close();
    this.app.getRootNav().setRoot(LoginPage);
  }
  getUserInfo(){
    return this.http.get('/user').then((res) => {
      let userExt = res.data.userExt;
      this.src = userExt && userExt.src || "assets/images/marty-avatar.png";
      document.getElementById("nickname").innerText = res.data.nickname || res.data.mobile;
    }).catch((error) => {
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  queryTZCount(event?){
      return this.http.get('/post/page',{
          "start": 0,
          "limit": 1
        })
        .then((res) => {
            if(res.success){
                this.tzCount = res.data.totalCount;
                event && event.complete();
            }
        }).catch(error => {
            event && event.complete();
        });
  }
  queryGZCount(){
      return this.http.get('/rs/follows/page',{
          "start": 0,
          "limit": 1
        })
        .then((res) => {
            if(res.success){
                this.gzCount = res.data.totalCount;
            }
        }).catch(error => {
        });
  }
  queryFSCount(){
      return this.http.get('/rs/fans/page',{
          "start": 0,
          "limit": 1
        })
        .then((res) => {
            if(res.success){
                this.fsCount = res.data.totalCount;
            }
        }).catch(error => {
        });
  }
  goDetail(){
    this.navCtrl.push(MineDetailPage);

  }
  goTZList(){
    this.navCtrl.push(MineDetailPage, {"tz": true});
  }

}
