import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, ModalController} from 'ionic-angular';
import {LoginPage} from "../user/login";
import {UserService} from "../../services/user.services";


@Component({
  templateUrl: 'build/pages/headline/headline.html'
})
export class HeadlinePage implements AfterViewInit {

  bannerHeight: string;
  func3 = ['../../images/headline/headline-mall.png',
           '../../images/headline/headline-sign.png',
           '../../images/headline/headline-activity.png'];
  func8 = [
    {'name': '招聘', 'src': '../../images/headline/headline-zp.png'},
    {'name': '二手', 'src': '../../images/headline/headline-es.png'},
    {'name': '出租', 'src': '../../images/headline/headline-cz.png'},
    {'name': '求助', 'src': '../../images/headline/headline-qz.png'},
    {'name': '便民', 'src': '../../images/headline/headline-bm.png'},
    {'name': '车友', 'src': '../../images/headline/headline-cy.png'},
    {'name': '情感', 'src': '../../images/headline/headline-qg.png'},
    {'name': '吃货', 'src': '../../images/headline/headline-ch.png'}
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
              private userService: UserService) {



  }
  ngAfterViewInit(){
    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.h8 = `${(w - 35)/4}px`;
    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;
  }

  writeArticle(){


    if (this.userService.whetherLogin()) {

    } else {
      this.navCtrl.push(LoginPage);
    }

  }

}
