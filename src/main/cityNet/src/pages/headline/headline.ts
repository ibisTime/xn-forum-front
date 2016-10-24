import {Component,AfterViewInit,ViewChild} from '@angular/core';
import {NavController, Platform, ModalController, InfiniteScroll, Refresher, Events} from 'ionic-angular';
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
import {LoginPage} from "../user/login";
import {NavService} from "../../services/nav.service";

@Component({
  templateUrl: 'headline.html',
  providers:[DatePipe,PageDataService]

})
export class HeadlinePage implements AfterViewInit {

  cityName = "未知地点";
  redColor = "red";
  bannerHeight: string;
  articles = [];

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
              public pageDataService: PageDataService,
              public events: Events,
              public navService: NavService) {

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
          "location": "C",
          "status" : "D"
      };
      this.pageDataService.refreshComp = this.refresher;
      this.pageDataService.loadMoreComp = this.loadMoreScroll;


      this.pageDataService.refresh();


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
          let load = this.warn.loading('');
          this.cityS.getNavigateBySiteCode(city.code).then(msg => {


              this.cityName = city.name;
              this.cityS.currentCity = city;

              this.events.publish("user:cityChange");
              load.dismiss();
              /*切换城市成功，刷新下面头条帖子*/
              this.pageDataService.refresh();

          }).catch(error => {
              load.dismiss();
              this.warn.toast('切换失败');
          });
      }

  }


  writeArticle(){

      if(this.userService.user){

          let modelCtrl = this.mCtrl.create(SendArticlePage);
          modelCtrl.present();

      } else {

          this.navCtrl.push(LoginPage);
      }

  }

  /*搜索用户或者帖子*/
    search() {
        this.navCtrl.push(SearchUserAndArticlePage);
    }

    doRefresh(refresher) {

        this.pageDataService.refresh();
        this.cityS.getNavigateBySiteCode(this.cityS.currentCity.code);

    }

    doLoadMore(loadMore) {

       this.pageDataService.loadMore();

    }


    browserArticle(article) {

        this.navCtrl.push(ContentPage, article);
    }




    /*所有跳转事件个功能点击事件*/
    goOther(url,title){

        this.navService.transition(url,title,this.sign());
    }

    /*商城*/
    goMall() {
     this.navCtrl.push(MallPage);
    }

    /*签到*/
    //签到动画
    sign(){


        if(!this.userService.user){
            this.navCtrl.push(LoginPage);
            return;
        }


        let obj = {
            "location" : "杭州"
        }
        let load = this.warn.loading("");
        this.http.post("/user/signIn",obj).then(res => {

            load.dismiss();
            this.events.publish("user:signin");
            // this.warn.toast("签到成功");

        }).catch(error => {

            load.dismiss();
            this.warn.toast("签到失败");
        });

    }


}


// status（选填）		A 草稿中 B 已发布 C1 不信任待审批 C2 被举报待审批 D 审批通过 E 待回收 F 被过滤
// location（选填）		A 置顶 B 精华 C 头条
// isLock（选填）	是否锁帖	1 是 0 否


