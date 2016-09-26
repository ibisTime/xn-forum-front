import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {LoginPage} from "../user/login";
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "./search-user-article";
import {SendArticlePage} from "./send-article";
import {CityChoosePage} from "./city-choose";
import {IFramePage} from "./iframe";

const wei_xin = true;

@Component({
  templateUrl: 'build/pages/headline/headline.html',
})
export class HeadlinePage implements AfterViewInit {

  cityName = "未知地点";
  bannerHeight: string;
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

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private userService: UserService,
              private mCtrl: ModalController,
              private http: HttpService,
              private warn: WarnService,
              private cityS: CityService) {


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
      // let load = this.warn.loading('定位中');
      // this.cityS.getCurrentCityByIp().then( msg => {
      //
      //   load.dismiss();
      //
      // }).catch( error => {
      //   /*定位失败*/
      //   load.dismiss();
      //   alert("ip定位失败");
      // });

      let loadNav = this.warn.loading('加载中');
      navigator.geolocation.getCurrentPosition( (position:any) => {

        /*同意定位加载*/
        console.log(position);

        /*同意加载站点*/
        this.cityS.getNavigateByPosition(position.x,position.y).then(res => {
          loadNav.dismiss();
        }).catch(error => {
          loadNav.dismiss();
        });

      }, error => {

        /*不同意获取默认站点*/
        this.cityS.getNavigateByPosition(0,0).then(res => {
          loadNav.dismiss();
        }).catch(error => {
          loadNav.dismiss();
        });

      },{timeout: 3000});

    },500);

  }

  /*所有跳转事件个功能点击事件*/
  goOther(url,title){

    console.log('点击功能');
    this.navCtrl.push(IFramePage,{"url":url,"title":title});

 }

  chooseCity(){

    let load = this.warn.loading("加载站点中..");

    let obj = {"da":"da"};
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

}




