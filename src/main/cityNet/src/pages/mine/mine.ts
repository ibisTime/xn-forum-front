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
import {MinePlatePage} from "./mine-plate/mine-plate";
import {MineProperty} from "./property/mine-property";
import {MineArticlePage} from "./mine-article/mine-article";


@Component({
  templateUrl: 'mine.html'
})
export class MinePage implements AfterViewInit{

  className = 'test-class';

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
  levelName = "333";
  leveDict;
  // statisticsInfo = {totalPostNum: 0}


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

    });


    this.events.subscribe('user:loginSuccess',res => {

      this.getPostNum();

    });




  }

  ngAfterViewInit(){


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

     this.getPostNum();
      this.userService.UpdateUserInfo().then(res => {

        $event.complete();

      }).catch(error => {
        $event.complete();
        this.warnCtrl.toast("获取用户信息失败");
      });

  }


  getPostNum(){

    this.http.get("/post/total").then(res => {

      this.userService.totalPostNum = res.data.totalPostNum;

    }).catch(error => {

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
    this.navCtrl.push(MineArticlePage);
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
    let load = this.warnCtrl.loading();
    this.http.get('/plate/list1').then(res => {

      let array = res.data;
      load.dismiss();
      if(array.length > 0){

        this.navCtrl.push(MinePlatePage,array);

      } else {
        this.warnCtrl.toast("您还不是版主");
      }

    }).catch(error => {
      load.dismiss();
    });

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
