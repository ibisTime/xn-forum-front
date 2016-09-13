import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/mine/mine.html'
})
export class HeadlinePage {

  constructor(private navCtrl: NavController,
              private platform: Platform) {

  }

}
