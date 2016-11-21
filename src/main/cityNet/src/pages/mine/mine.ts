import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App, ModalController, Events} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {ImPage} from "./im/im";
import {IMService} from "../../services/im.service";
import {LoginPage} from "../user/login";
import {HttpService} from "../../services/http.service";
import {NavService} from "../../services/nav.service";

import {MineDetailPage} from "./detail/detail";
import {CollectionPage} from "./collection/collection";
import {SettingPage} from "./setting/setting";
import {DraftPage} from "./draft/draft";
import {RelationPage} from "./relationship-people/relationship";
import {RegisterPage} from "../user/register";
import {MinePlatePage} from "./mine-plate/mine-plate";
import {MineProperty} from "./property/mine-property";
import {MineArticlePage} from "./mine-article/mine-article";
import {CityService} from "../../services/city.service";
import {ForgetPwdPage} from "../user/forgetPwd";
import {JFPage} from "./jfDetail/jfDetail";
import {Release} from "../../services/release"
import {AboutusPage} from "./setting/aboutus";
import {WXService} from "../../services/wx.service";


@Component({
  templateUrl: 'mine.html'
})
export class MinePage implements AfterViewInit{

  className = 'test-class';
  hiddenMyPlate = true;
  otherLoginDisplay = "block";

  listItem = [
    {"name":'我的物品',"src":'iconfont icon-search'},
    {"name":'我的收藏',"src":'&#xe60e;'},
    {"name":'草稿箱',"src":'&#xe613;'},
    {"name":'我的消息',"src":'&#xe610;'},
    {"name":'设置',"src":'&#xe603;'},
    {"name":'退出登录',"src":'&#xe617;'},
  ];

  src:string = 'assets/images/marty-avatar.png';
  sMobile: "";
  sTime: "";
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public app :App,
              public modelCtrl :ModalController,
              public navS: NavService,
              public events: Events,
              public cityService: CityService,
              public wxService: WXService) {


    this.events.subscribe('user:loginout',res => {


    });

    this.events.subscribe('user:loginSuccess',res => {

      this.getPostNum();
      this.goMyPlate(false);

    });

    //微信未安装    隐藏
    if(!Release.weChat){
      this.otherLoginDisplay = this.wxService.isInstalled ? "block" : "none";
    }


    if(this.userService.user){
      this.getPostNum();
    }
    this.getMobileAndTime();

  }

  ngAfterViewInit(){

    this.goMyPlate(false);

  }



  getMobileAndTime(){
    this.http.get("/sconfig/info", {ckey: "sysMobile"})
        .then((res)=>{
          this.sMobile = res.data.cvalue;
        });
    this.http.get("/sconfig/info",{ckey: "serviceTime"})
        .then((res)=>{
          this.sTime = res.data.cvalue;
        })
  }

  goLogin(){

    this.navCtrl.push(LoginPage);

  }

  goReg(){

    this.navCtrl.push(RegisterPage,{"hidden": true});
  }


  doRefresh($event){

    this.goMyPlate(false);
     this.getPostNum();
      this.userService.UpdateUserInfo().then(res => {

        $event.complete();

      }).catch(error => {
        $event.complete();
      });

  }


  getPostNum(){

    this.http.get("/post/total",{"status":"NO_A"}).then(res => {

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

  // goUs(){
  //   this.navCtrl.push(AboutusPage);
  // }
  goUs(){
    this.navCtrl.push(AboutusPage);
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

  goMyPlate(showAlert){

    let load;
    if(showAlert){

      load = this.warnCtrl.loading();

    }

    this.http.get('/plate/list1').then(res => {

      let array = res.data;

      showAlert && load.dismiss();

      if(array.length > 0){


        this.hiddenMyPlate = true;
        showAlert &&  this.navCtrl.push(MinePlatePage,array);

      } else {
        this.hiddenMyPlate = false;
        showAlert && this.warnCtrl.toast("您还不是版主");

      }

    }).catch(error => {

      showAlert && load.dismiss();

    });

  }

  goMineProperty(){
    this.navCtrl.push(MineProperty);
  }



  /*登陆注册相关*/
  login(userName,pwd) {
    if (userName.length <= 0) {
      this.warnCtrl.toast("请输入登录名");
      return;
    }

    let params = {
      loginName: userName,
      loginPwd: pwd,
      terminalType: "1"
    }

    let loading = this.warnCtrl.loading('登录中');
    this.userService.login(params).then(res => {

      loading.dismiss().then(res => {

      });

    }).catch(error => {

      loading.dismiss();

    });

  }


  register($event) {
    this.navCtrl.push(RegisterPage)
  }


  findPwd($event){
    this.navCtrl.push(ForgetPwdPage);
  }

  goJFList(){
    this.navCtrl.push(JFPage);
  }

  wxLogin(){

    if(Release.weChat){
      //微信

      this.navS.transition("","");

    } else {
      //app
      this.wxService.wxLogin().then(res => {

      }).catch(error => {

      });

    }

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
