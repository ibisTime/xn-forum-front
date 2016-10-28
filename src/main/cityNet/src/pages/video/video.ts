import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CityService} from "../../services/city.service";
import {IFramePage} from "../headline/iframe";
import {Release} from "../../services/release"
import {NavService} from "../../services/nav.service";

@Component({
  templateUrl: 'video.html'
})
export class VideoPage implements AfterViewInit{

  imgHeight = "";
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public cityS: CityService,
              public navService: NavService
              ) {
    if(Release.weChat){

    }
  }

  ngAfterViewInit(){

    this.imgHeight = `${(this.platform.width() - 20)*0.48*0.55}px`;

  }


  goOther(url,title){

    this.navService.transition(url,title);

  }

}
