import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {LoginPage} from "../user/login";
import {UserService} from "../../services/user.service";
import {CityChoosePage} from "./city-choose";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";

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
    pager: true
    // autoplay: 2000

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
      this.cityS.getCurrentCityByIp().then( msg => {

        // load.dismiss();
      }).catch( error => {
        /*定位失败*/
        // load.dismiss();
        // this.warn.alert('定位失败');
      });

    },500);

  }

  /*所有跳转事件个功能点击事件*/
  goOther(url){
    console.log('点击功能');
    if(this.platform.is('ios') || this.platform.is('android')){

    } else {
      window.open(url);
    }

 }

  chooseCity(){

    let load = this.warn.loading("");
    this.cityS.getCity().then(() => {

      load.dismiss();
    }).then(() => {

      let model = this.mCtrl.create(CityChoosePage);
      model.present();
      model.onDidDismiss((city) => {this.chooseCallBack(city)});
      // setTimeout(() => {
      //
      // },500);

    }).catch( error => {
      load.dismiss();
      this.warn.alert('获取站点失败');
      console.log('外部失败');
    });

  }

  chooseCallBack(city){

    if( city != null && city.code != this.cityS.currentCity.code){
      this.cityName = city.name;
      let load = this.warn.loading('');
      // this.cityService.getDetail(city.code);
      this.cityS.currentCity = city;
      this.cityS.getNavigateByCode(city.code).then(msg => {
        load.dismiss();
      }).catch(error => {
        load.dismiss();
        this.warn.alert('切换失败');
      });
    }

  }

  writeArticle(){

    navigator.geolocation.getCurrentPosition( position => {
     console.log(position);
    });

    // if(this.platform.is('ios') || this.platform.is('android')){
    //   /*通过经纬度获取站点*/
    // } else {
    //   /*通过ip获取地址*/
    //   this.cityS.getCurrentCityByIp();
    // }

  }


}




