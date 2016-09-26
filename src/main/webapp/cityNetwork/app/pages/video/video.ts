import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CityService} from "../../services/city.service";


@Component({
  templateUrl: 'build/pages/video/video.html'
})
export class VideoPage implements AfterViewInit{

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private cityS: CityService) {

  }

  ngAfterViewInit(){

    setTimeout(() => {

      let iframe: any = document.getElementById("city-video");
      iframe.src = this.cityS.headlineData.tabs[3].url;

    },500);

  }

}
