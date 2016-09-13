import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/headline/headline.html'
})
export class HeadlinePage implements AfterViewInit {

  bannerHeight: string;
  func3 = ['积分商城','每日签到','同城活动'];
  func8 = ['招聘','出租','二手','求助','便民','车友','情感','吃货'];

  h8: string;
  h3h;
  h3w;
  mySlideOptions = {
    loop: true,
    pager: true
    // autoplay: 2000

  };
  constructor(private navCtrl: NavController,
              private platform: Platform) {



  }
  ngAfterViewInit(){
    let w = this.platform.width();
    this.bannerHeight = `${w/2.3}px`;
    this.h8 = `${(w - 35)/4}px`;
    this.h3w = `${(w - 36)/3}px`;
    this.h3h = `${(w - 36)/9}px`;
  }
}
