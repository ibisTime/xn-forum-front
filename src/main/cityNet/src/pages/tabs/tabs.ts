import {Component, ViewChild} from '@angular/core';
import {HeadlinePage} from "../headline/headline";
import {ForumPage} from "../forum/forum";
import {MinePage} from "../mine/mine";
import {KefuPage} from "../kefu/kefu";
import {VideoPage} from "../video/video";

import {Tabs, Events} from 'ionic-angular';
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



  @ViewChild(Tabs) tabs: Tabs;
  constructor(
              public imServe: IMService,
              public cityS: CityService,
              public http: HttpService,
              public events: Events) {
    // this tells the tabs component which Pages
    // should be each tab's root Page

    this.tab1Root = HeadlinePage;
    this.tab2Root = ForumPage;
    this.tab3Root = KefuPage;
    this.tab4Root = VideoPage;
    this.tab5Root = MinePage;

    /**/


    /*login-t登陆*/
    // this.login();
    //超时帮用户登陆

  }



  goOther(index){

    if(index != 3){
      this.tabs.select(index);
    } else {
      this.tabs.select(index);
    }

  }

  goKefu(){
    this.tabs.select(2);
  }

  goVideo($event){
    this.tabs.select(3);
    // if(weChat){
    //
    // } else {
    //   /*app*/
    //   let url = this.cityS.headlineData.tabs[3].url;
    //   window.open(url);
    //   setTimeout(() => {
    //     let tab = this.tabs.previousTab();
    //     this.tabs.select(tab);
    //   },50);
    //
    // }
  }

}




