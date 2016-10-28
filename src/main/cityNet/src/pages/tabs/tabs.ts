import {Component, ViewChild} from '@angular/core';
import {HeadlinePage} from "../headline/headline";
import {ForumPage} from "../forum/forum";
import {MinePage} from "../mine/mine";
import {KefuPage} from "../kefu/kefu";
import {VideoPage} from "../video/video";

import {Tabs, Events, Platform, App} from 'ionic-angular';
import {IMService} from "../../services/im.service";
import {CityService} from "../../services/city.service";
import {HttpService} from "../../services/http.service";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

   tab1Root: any;
   tab2Root: any;
   tab3Root: any;
   tab4Root: any;
   tab5Root: any;


  tabItems = [];
  @ViewChild(Tabs) tabs: Tabs;
  signinDisplay = "none";
  pHeight;
  constructor(
              public imServe: IMService,
              public cityS: CityService,
              public http: HttpService,
              public events: Events,
              public  platform: Platform,
              public app: App) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.changeTab();
    this.pHeight = `${this.platform.height()}px`;
    this.events.subscribe("city:change",res => {

      this.changeTab();

    });

    // setTimeout(() => {
    //
    //   let ele:any = document.getElementById('signin-mask');
    //   ele.style.animation = "animation01 3s";
    //
    // },2000);
    //
    // setTimeout(() => {
    //
    //   let ele:any = document.getElementById('signin-mask');
    //   ele.style.display = "none";
    //
    // },3000);


    this.events.subscribe("user:signin",(res) => {

      this.signinDisplay = "block";

      setTimeout(() => {

        this.signinDisplay = "none";

      },2000);

    });

    /*展示图片*/
    this.events.subscribe("displayImg",res => {

      let sDiv = document.getElementById("ylImg");
      sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
      document.getElementById("yl-img").setAttribute("src", res);

    });


    this.events.subscribe("transtion",res => {

      let tabDict = {
        "page:headline" : HeadlinePage,
        "page:forum" : ForumPage,
        "page:xiaomi" : KefuPage,
        "page:custom" : VideoPage,
        "page:mine" : MinePage
      }

      let page = tabDict[res];
      let nav = this.app.getActiveNav();
      nav.push(page);

    });


  }

  changeTab(){

    let tabDict = {

      "page:headline" : HeadlinePage,
      "page:forum" : ForumPage,
      "page:xiaomi" : KefuPage,
      "page:custom" : VideoPage,
      "page:mine" : MinePage

    }

    this.tab1Root = tabDict[this.cityS.tabbarItems[0].url];
    this.tab2Root = tabDict[this.cityS.tabbarItems[1].url];
    this.tab3Root = tabDict[this.cityS.tabbarItems[2].url];
    this.tab4Root = tabDict[this.cityS.tabbarItems[3].url];
    this.tab5Root = tabDict[this.cityS.tabbarItems[4].url];

  }


  selected(i){
    this.tabs.select(i);
  }



  goOther(index){

    if(index != 3){
      this.tabs.select(index);
    } else {
      this.tabs.select(index);
    }

  }



  closeImg(){
    let sDiv = document.getElementById("ylImg");
    sDiv.className = sDiv.className + "hidden";
  }


}




