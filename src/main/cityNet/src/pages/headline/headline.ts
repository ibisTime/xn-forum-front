import {Component,AfterViewInit,ViewChild} from '@angular/core';
import {NavController, Platform, ModalController, InfiniteScroll, Refresher} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "./search-user-article";
import {SendArticlePage} from "../forum/send-article";
import {CityChoosePage} from "./city-choose";
import {IFramePage} from "./iframe";
import {Release} from "../../services/release";
import {ContentPage} from "../forum/content/content";
import {DatePipe} from "@angular/common";
import {PageDataService} from "./page-data.services";
import {MallPage} from "./mall/mall";

@Component({
  templateUrl: 'headline.html',
  providers:[DatePipe,PageDataService]

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

  start = 1;
  @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
  @ViewChild(Refresher)  refresher:  Refresher;

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
              public cityS: CityService,
              public pageDataService: PageDataService) {

  }

  ngAfterViewInit(){
    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.h8 = `${(w - 35)/4}px`;
    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;

      this.pageDataService.url = "/post/page";
      this.pageDataService.reqObj = {
         "siteCode" : this.cityS.currentCity.code,
          "isHeadlines": "1",
          "status" : "1"
      };
      this.pageDataService.refreshComp = this.refresher;
      this.pageDataService.loadMoreComp = this.loadMoreScroll;


      this.pageDataService.refresh();

  }

  /*所有跳转事件个功能点击事件*/
  goOther(url,title){

    if(Release.weChat){
      console.log('点击功能');
      this.navCtrl.push(IFramePage,{"url":url,"title":title});
    } else {

    }

 }


  chooseCity(){

    let load = this.warn.loading("加载站点中..");

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

      if (city != null && city.code != this.cityS.currentCity.code) {
          this.cityName = city.name;
          let load = this.warn.loading('');
          this.cityS.currentCity = city;
          this.cityS.getNavigateBySiteCode(city.code).then(msg => {

              load.dismiss();


              /*切换城市成功，刷新下面头条帖子*/
              this.pageDataService.refresh();

          }).catch(error => {
              load.dismiss();
              this.warn.alert('切换失败');
          });
      }

  }


  writeArticle(){

      if(this.userService.user){
          let modelCtrl = this.mCtrl.create(SendArticlePage);
          modelCtrl.present();
      } else {
          let modelCtrl = this.mCtrl.create(SendArticlePage);
          modelCtrl.present();
      }

  }

  /*搜索用户或者帖子*/
  search(){
   this.navCtrl.push(SearchUserAndArticlePage);
  }

    doRefresh(refresher) {

        this.pageDataService.refresh();

    }

    doLoadMore(loadMore) {

        this.pageDataService.loadMore();

    }


    browserArticle(article){

        this.navCtrl.push(ContentPage,article);
    }


   /*获取帖子数据*/
    // getArticle(refresh?) {
    //     let reqObj = {
    //         "start": this.start,
    //         "limit": 3,
    //         "siteCode": this.cityS.currentCity.code
    //     };
    //
    //     return this.http.get('/post/page', reqObj).then(res => {
    //
    //         (refresh == "refresh") && (this.articles = []);
    //         let list = res.data.list;
    //         if (list.length > 0) {
    //
    //             for (let i = 0; i < list.length; i++) {
    //                 if (list[i].pic != null) {
    //                     list[i].pic = list[i].pic.split(/\|\|/);
    //                 }
    //             }
    //             this.articles.push(...list);
    //
    //             if (3 * this.start >= res.data.totalCount) {
    //                 this.loadMoreScroll.enable(false)
    //             }
    //
    //         } else {
    //             this.loadMoreScroll.enable(false);
    //         }
    //
    //         this.start++;
    //
    //     }).catch(error => {
    //         console.log(error);
    //     });
    //
    // }


    /*商城*/
    goMall() {
     this.navCtrl.push(MallPage);
    }

    /*签到*/
    sign() {
        let obj = {
            "location" : "杭州"
        }

        let load = this.warn.loading("");
        this.http.post("/user/signIn",obj).then(res => {

            load.dismiss();
            this.warn.toast("签到成功");

        }).catch(error => {

            load.dismiss();
        });

    }

}




