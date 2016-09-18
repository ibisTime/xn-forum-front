import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {LoginPage} from "../user/login";
import {UserService} from "../../services/user.service";
import {CityChoosePage} from "./city-choose";
import {HttpService} from "../../services/http.service";
import {CityService} from "./city.service";
import {WarnService} from "../../services/warn.service";


@Component({
  templateUrl: 'build/pages/headline/headline.html',
  providers: [CityService]

})
export class HeadlinePage implements AfterViewInit {

  cityName = "乐青城市网";
  bannerHeight: string;
  func3 = ['../../images/headline/headline-mall.png',
           '../../images/headline/headline-sign.png',
           '../../images/headline/headline-activity.png'];
  func8 = [
    // headline-cz.png
    {'name': '招聘', 'src': 'images/headline/headline-zp.png'},
    {'name': '二手', 'src': 'images/headline/headline-es.png'},
    {'name': '出租', 'src': 'images/tab-bar-xiaomi.png'},
    {'name': '求助', 'src': 'images/headline/headline-qz.png'},
    {'name': '便民', 'src': 'images/headline/headline-bm.png'},
    {'name': '车友', 'src': 'images/headline/headline-cy.png'},
    {'name': '情感', 'src': 'images/headline/headline-qg.png'},
    {'name': '吃货', 'src': 'images/headline/headline-ch.png'}
  ];

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
              private cityService: CityService,
              private warn: WarnService) {


    // let nav = new Navigator();
    // nav.language;




  }

  ngAfterViewInit(){
    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.h8 = `${(w - 35)/4}px`;
    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;
  }

  chooseCity(){

    let load = this.warn.loading("");
    this.cityService.getCity(() => {

      load.dismiss();

      setTimeout(() => {
        let model = this.mCtrl.create(CityChoosePage);
        model.present();
        model.onDidDismiss((city) => {this.chooseCalllBack(city)});
      },500);

    }, () => {
      load.dismiss();
    });

  }

  chooseCalllBack(city){
    if( city != null){
      this.cityName = city.name;
      this.cityService.getDetail(city.code);
    }

  }

  writeArticle(){

   this.cityService.getCurrentCityByIp();


  }

}




