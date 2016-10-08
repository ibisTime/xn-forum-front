import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController,Slides} from 'ionic-angular';
import {LoginPage} from "../user/login";
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "./search-user-article";
import {SendArticlePage} from "../forum/send-article";
import {CityChoosePage} from "./city-choose";
import {IFramePage} from "./iframe";
import {weChat} from "../release";
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
      this.headlineData = this.cityS.headlineData;
      this.cityName = this.cityS.currentCity.name;
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

    // setTimeout(() => {
    //
    //
    //   let loadNav = this.warn.loading('定位中...');
    //   navigator.geolocation.getCurrentPosition( (position:any) => {
    //
    //     /*同意定位加载*/
    //     console.log(position);
    //
    //     /*同意加载站点*/
    //     this.cityS.getNavigateByPosition(position.x,position.y).then(res => {
    //       loadNav.dismiss().then(() => {
    //         this.getArticle();
    //       });
    //
    //
    //     }).catch(error => {
    //       loadNav.dismiss().then(res => {
    //         this.warn.toast('加载站点失败');
    //       });
    //     });
    //
    //   }, error => {
    //
    //     /*不同意获取默认站点*/
    //     this.cityS.getNavigateByPosition(0,0).then(res => {
    //       loadNav.dismiss().then(() => {
    //
    //         this.getArticle();
    //       });
    //
    //     }).catch(error => {
    //       loadNav.dismiss().then(res => {
    //
    //         this.warn.toast('加载站点失败');
    //
    //       });
    //     });
    //
    //   },{timeout: 5000});
    //
    // },500);

  }

  /*所有跳转事件个功能点击事件*/
  goOther(url,title){

    if(weChat){
      console.log('点击功能');
      this.navCtrl.push(IFramePage,{"url":url,"title":title});
    } else {

    }


 }

  chooseCity(){

    let load = this.warn.loading("加载站点中..");

    // let obj = {"da":"da"};
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

    //   .catch( error => {
    //
    //   load.dismiss().then(() => {
    //     this.warn.alert('获取站点失败');
    //   });
    //
    //   console.log('外部失败');
    // });

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
            // list[i].publishDatetime = this.jsDateDiff( new Date(list[i].publishDatetime).getTime()/1000);
            list[i].pic = list[i].pic.split(/\|\|/);
          }

        }
        this.articles = list;

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

  browserArticle(code){
    this.navCtrl.push(ContentPage,{"code": code});
  }


}




