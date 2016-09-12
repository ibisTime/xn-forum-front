import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/headline/headline.html'
})
export class HeadlinePage {

  bannerHeight: string;
  constructor(private navCtrl: NavController,
              private platform: Platform) {

         this.bannerHeight = `${this.platform.width()/2.3}px`;

  }
}
