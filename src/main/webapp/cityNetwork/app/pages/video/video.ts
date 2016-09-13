import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/video/video.html'
})
export class VideoPage {

  constructor(private navCtrl: NavController,
              private platform: Platform) {

  }

}
