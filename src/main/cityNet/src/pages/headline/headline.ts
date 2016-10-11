import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "./search-user-article";
import {SendArticlePage} from "../forum/send-article";
import {CityChoosePage} from "./city-choose";
import {IFramePage} from "./iframe";
import {weChat} from "../../services/release";
import {ContentPage} from "../forum/content/content";
import {DatePipe} from "@angular/common";

@Component({
  templateUrl: 'headline.html',
  providers:[DatePipe]

})
export class HeadlinePage implements AfterViewInit {

  cityName = "未知地点";
  redColor = "red";
  bannerHeight: string;
  articles = [];
  func3 = ['images/headline/headline-mall.png',
           'images/headline/headline-sign.png',
           'images/headline/headline-activity.png'];
  func8 = [
    // headline-cz.png
    {'name': '招聘', 'src': 'images/headline/headline-zp.png'},
    {'name': '二手', 'src': 'images/headline/headline-es.png'},
    {'name': '出租', 'src': 'images/headline/headline-cz.png'},
    {'name': '求助', 'src': 'images/headline/headline-qz.png'},
    {'name': '便民', 'src': 'images/headline/headline-bm.png'},
    {'name': '车友', 'src': 'images/headline/headline-cy.png'},
    {'name': '情感', 'src': 'images/headline/headline-qg.png'},
    {'name': '吃货', 'src': 'images/headline/headline-ch.png'}
  ];

  public headlineData = {};
  h8: string;
  h3h;
  h3w;

  mySlideOptions = {
    loop: true,
    pager: true,
    autoplay: 2000
  };

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public mCtrl: ModalController,
              public http: HttpService,
              public warn: WarnService,
              public cityS: CityService) {

    // this.headlineData = this.cityS.headlineData;
    setTimeout(() => {



    },500);

  }

  ngAfterViewInit(){
    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.h8 = `${(w - 35)/4}px`;
    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;

    setTimeout(() => {
      this.getArticle();
    },500)

  }

  /*所有跳转事件个功能点击事件*/
  goOther(url,title){

    if(weChat){
      console.log('点击功能');
      this.navCtrl.push(IFramePage,{"url":url,"title":title});
    } else {

    }


 }

    emit($event){
        console.log('终于成功了');
    }

  chooseCity(){

    let load = this.warn.loading("加载站点中..");

    let opt = {
      showBackdrop: false,
      enableBackdropDismiss : false
    };

    this.cityS.getCity().then(() => {

      load.dismiss().then(res => {

        let model = this.mCtrl.create(CityChoosePage);
        model.onDidDismiss((city) => {this.chooseCallBack(city)});
        model.present();

      });
        
    }).then((res) => {


    }).catch(error => {


    });


  }

  chooseCallBack(city){

    if( city != null && city.code != this.cityS.currentCity.code){
      this.cityName = city.name;
      let load = this.warn.loading('');
      // this.cityService.getDetail(city.code);
      this.cityS.currentCity = city;
      this.cityS.getNavigateBySiteCode(city.code).then(msg => {
        load.dismiss();
      }).catch(error => {
        load.dismiss();
        this.warn.alert('切换失败');
      });
    }

  }


  writeArticle(){

    let modelCtrl = this.mCtrl.create(SendArticlePage);
    modelCtrl.present();
  }

  /*搜索用户或者帖子*/
  search(){
   this.navCtrl.push(SearchUserAndArticlePage);
  }

  /*获取帖子数据*/
  getArticle(){
    let reqObj = {
      "start": "0",
      "limit": "10"
    };
    return this.http.get('/post/page',reqObj).then(res => {
      let list = res.data.list;
        for(let i = 0; i < list.length; i++){
          if( list[i].pic  != null){
            list[i].pic = list[i].pic.split(/\|\|/);
          }

        }
        this.articles = list;

    }).catch(error => {
        console.log(error);
    });

  }

  doRefresh(refresher){

    /*导航相关信息*/
   this.getArticle().then(res => {
     refresher.complete();
   }).catch(error => {

   });

  }

  doLoadMore(loadMore){
    setTimeout(() => {

      loadMore.complete();

    },2000);
  }

  browserArticle(code, user){
    this.navCtrl.push(ContentPage,{"code": code, "user": user});
  }


}




