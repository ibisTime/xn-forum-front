import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CityService} from "../../services/city.service";
import {IFramePage} from "../headline/iframe";
import {Release} from "../../services/release"

@Component({
  templateUrl: 'video.html'
})
export class VideoPage implements AfterViewInit{

  imgHeight = "";
  constructor(public navCtrl: NavController,
              public platform: Platform,
              public cityS: CityService
              ) {
    if(Release.weChat){

    }
  }

  ngAfterViewInit(){

    this.imgHeight = `${(this.platform.width() - 20)*0.48*0.55}px`;

    // setTimeout(() => {
    //
    //   let load = this.warnService.loading('');
    //   let iframe: any = document.getElementById("city-video");
    //   iframe.src = this.cityS.headlineData.tabs[3].url;
    //   iframe.onload = (res) => {
    //     load.dismiss();
    //   };
    //
    // },500);

  }

  goOther(url,title){
    if(Release.weChat){

      this.navCtrl.push(IFramePage,{"url":url,"title":title});

    } else {

    }
  }
}
