import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CityService} from "../../services/city.service";
import {WarnService} from "../../services/warn.service";
import {weChat} from "../release";
import {IFramePage} from "../headline/iframe";


@Component({
  templateUrl: 'video.html'
})
export class VideoPage implements AfterViewInit{

  imgHeight = "";
  constructor(private navCtrl: NavController,
              private platform: Platform,
              private cityS: CityService,
              private warnService: WarnService) {

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
    if(weChat){
      this.navCtrl.push(IFramePage,{"url":url,"title":title});

    } else {

    }
  }
}
