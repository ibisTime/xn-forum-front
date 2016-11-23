import {Component,AfterViewInit,ViewChild} from '@angular/core';
import {NavController, Platform, ModalController, InfiniteScroll, Refresher, Events} from 'ionic-angular';
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "./search-user-article";
import {SendArticlePage} from "../forum/send-article";
import {CityChoosePage} from "./city-choose";
import {ContentPage} from "../forum/content/content";
import {DatePipe} from "@angular/common";
import {PageDataService} from "./page-data.services";
import {LoginPage} from "../user/login";
import {NavService} from "../../services/nav.service";
import {WXService} from "../../services/wx.service";
import { Release } from "../../services/release";
import {WXLoginPage} from "../user/wxLogin";
import {BindingMobilePage} from "../user/bindingMobile";



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
  w8;
  h3h;
  h3w;
  adsDisplay = "block";
  changeAds = true;

  mySlideOptions = {
    loop: false,
    pager: true,
    autoplay: 3000
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
              public navService: NavService,
              public wxService: WXService) {

      // let url = "http://121.43.101.148:8901/2016110317/20161130805475684754151.jpg";
      // this.bk = "url(" + url + ")";

  }

  ngAfterViewInit(){


      /*获取导航数据*/
      setTimeout(res => { //延时

          if(Release.weChat) {
              var reg = new RegExp('(^|&)' + "code" + '=([^&]*)(&|$)', 'i');
              var r = window.location.search.substr(1).match(reg);
              if (r != null) {

                  //微信授权登陆
                  let code = decodeURIComponent(r[2]);

                  //1.判断用户是否存在
                  let codeV = code;
                  let obj = {
                      code: codeV
                  }


                  let load = this.warn.loading();
                  let wxLoginObj = {
                     "code": code
                  }

                  //定位成功 把地址传过去
                  if(typeof(this.cityS.locationSuccessAddressCode) != "undefined" && this.cityS.locationSuccessAddressCode.length > 0){
                      wxLoginObj["companyCode"] = this.cityS.locationSuccessAddressCode;
                  }

                  let mobile;

                  this.http.get("/auth2/login/wx",wxLoginObj).then(res => {

                    // alert(JSON.stringify(res));

                    mobile = res["data"]["mobile"];
                    return this.userService.wxLogin(res["data"]["userId"], res["data"]["tokenId"], res["data"]["isExist"]);

                  }).then(res => {

                      load.dismiss();
                      this.warn.toast("登录成功");
                      //判断是否绑定手机号码，没绑定————绑定

                      if(!mobile){
                          this.navCtrl.push(BindingMobilePage,{"type":"mine"});
                      }

                  }).catch(error => {

                      this.warn.toast("登录失败");
                      load.dismiss();

                  });


              } else { //非登陆状态 提示下载

                  setTimeout(() => {

                      this.warn.alert2("前往下载城市网App",() => {
                          window.open("http://a.app.qq.com/o/simple.jsp?pkgname=com.ionicframework.cutepuppypics929824");
                      },() => {},"确定","取消")

                  },3000);

              }

          }

      },2000); ///    延时



    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.w8 = `${(w - 35)/4}px`;
      this.h8 = `${(w - 35)/6}px`

    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;

      this.pageDataService.url = "/post/page";

      this.pageDataService.reqObj = {
          "siteCode" : this.cityS.currentCity.code,
          "location": "C",
          "status" : "BD"
      };

      this.pageDataService.refreshComp = this.refresher;
      this.pageDataService.loadMoreComp = this.loadMoreScroll;
      this.pageRefresh();

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
              this.pageDataService.reqObj["siteCode"] = this.cityS.currentCity.code;

              this.events.publish("user:cityChange");
              load.dismiss();

              this.changeAds = false;
              setTimeout(res => {

                  this.changeAds = true;

              },0);


              /*切换城市成功，刷新下面头条帖子*/
              this.pageRefresh();
              // this.pageDataService.refresh();

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

      this.pageRefresh();
      this.cityS.getNavigateBySiteCode(this.cityS.currentCity.code);


    };

    pageRefresh(){

        this.pageDataService.refresh(() => {

            this.pageDataService.articles.forEach((articles:any,index,array) => {

                if(articles.picArr && articles.picArr.length){

                    let newUrls = [];
                    articles.picArr.forEach((url:string,index,array) => {

                        newUrls.push("url(" + url + ")");

                    });
                    let oneArticle = newUrls[0];

                    articles.picArr = [];
                    articles.picArr.push(oneArticle);

                    articles.picArr1 = newUrls;

                }

            });
            this.articles = this.pageDataService.articles;

        });


    }

    doLoadMore(loadMore) {

       this.pageDataService.loadMore();

    }


    browserArticle(article) {

        this.navCtrl.push(ContentPage, article);
    }




    /*所有跳转事件个功能点击事件*/
    goOther(url,title){

        this.navService.transition(url,title,() => {
            this.sign();
        });

    }

    /*商城*/
    // goMall() {
    //  this.navCtrl.push(MallPage);
    // }

    /*签到*/
    sign(){

        //
        if(!this.userService.user){
            this.navCtrl.push(LoginPage);
            return;
        }

        let obj = {
            "location" : "CSW"
        }
        let load = this.warn.loading("");
        this.http.post("/user/signIn",obj).then(res => {

            load.dismiss().then(msg => {

                this.events.publish("user:signin",res.data.amount/1000);

            });

        }).catch(error => {

            load.dismiss().then(res => {

                this.events.publish("user:signin",-1);

            });

        });

    }


}


// status（选填）		A 草稿中 B 已发布 C1 不信任待审批 C2 被举报待审批 D 审批通过 E 待回收 F 被过滤
// location（选填）		A 置顶 B 精华 C 头条
// isLock（选填）	是否锁帖	1 是 0 否


