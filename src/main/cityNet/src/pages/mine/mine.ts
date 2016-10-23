import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App, ModalController, Events} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {ImPage} from "./im/im";
import {IMService} from "../../services/im.service";
import {LoginPage} from "../user/login";
import {HttpService} from "../../services/http.service";
import {MineDetailPage} from "./detail/detail";
import {CollectionPage} from "./collection/collection";
import {SettingPage} from "./setting/setting";
import {DraftPage} from "./draft/draft";
import {RelationPage} from "./relationship-people/relationship";
import {RegisterPage} from "../user/register";
import {BZPlatDetailPage} from "../forum/detail/bzPlatDetail";
import {MinePlatePage} from "./mine-plate/mine-plate";
import {MineProperty} from "./property/mine-property";


@Component({
  templateUrl: 'mine.html'
})
export class MinePage implements AfterViewInit{

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

  src:string = 'assets/images/marty-avatar.png';
  myUser;

  statisticsInfo = {
    totalFansNum: "0",
    totalFollowNum: "0",
    totalPostNum:"0",
    amount:"0"
  };

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public app :App,
              public modelCtrl :ModalController,
              public events: Events) {


    this.events.subscribe('user:loginout',res => {

      this.statisticsInfo = {

        totalFansNum: "0",
        totalFollowNum: "0",
        totalPostNum:"0",
        amount:"0"
      };

    });

    this.events.subscribe('user:loginSuccess',res => {
      this.getStatisticsInfo();
    });

  }

  ngAfterViewInit(){

    if(this.userService.user){
      this.getStatisticsInfo();
    }

  }

  goLogin(){

   // let model = this.modelCtrl.create(LoginPage);
   //  model.present();
    this.navCtrl.push(LoginPage);

  }

  goReg(){
    // let model = this.modelCtrl.create(RegisterPage,{"hidden": true});
    // model.present();
    this.navCtrl.push(RegisterPage,{"hidden": true});
  }


  doRefresh($event){
      this.getStatisticsInfo($event);
      this.userService.UpdateUserInfo();
  }

  getStatisticsInfo($event?){
      this.http.get("/user/stats").then(res => {

          this.statisticsInfo = res.data;
          (typeof($event) != "undefined")&& ($event.complete());

      }).catch(error => {
          (typeof($event) != "undefined")&& ($event.complete());
      });
  }


  /**/
  goRelationList(type){
     this.navCtrl.push(RelationPage,type);
  }

  goDetail(){
    this.navCtrl.push(MineDetailPage,{"userId": this.userService.userId});
  }
  goTZList(){
    this.navCtrl.push(MineDetailPage, {"tz": true});
  }

  goMinePlate(){
    this.navCtrl.push(MinePlatePage);
  }

  /*跳转事件*/
  goChat(){
    this.navCtrl.push(ImPage);
  }
  goCollect(){
    this.navCtrl.push(CollectionPage);
  }
  goSetting(){
    this.navCtrl.push(SettingPage);
  }
  goDraft(){
    this.navCtrl.push(DraftPage);
  }
  goMyPlate(){
    this.navCtrl.push(BZPlatDetailPage);
  }
  goMineProperty(){
    this.navCtrl.push(MineProperty);
  }

}

// amount: "null"
// level: "1"
// ljAmount: "null"

// loginName: "13868074590"
// mobile: "13868074590"
// nickname: "tianlei"
// status: "0"
// totalFansNum: "0"
// totalFollowNum: "0"
// totalPostNum:
// 16
// userId: "U2016100913405823244"
