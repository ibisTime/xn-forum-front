import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CityService} from "../../services/city.service";
import {WarnService} from "../../services/warn.service";


@Component({
  templateUrl: 'video.html'
})
export class VideoPage implements AfterViewInit{

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private cityS: CityService,
              private warnService: WarnService) {

  }

  ngAfterViewInit(){


    setTimeout(() => {

      let load = this.warnService.loading('');
      let iframe: any = document.getElementById("city-video");
      iframe.src = this.cityS.headlineData.tabs[3].url;
      iframe.onload = (res) => {
        load.dismiss();
      };

    },500);

  }

}
