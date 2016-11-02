import {Component, ViewChild, ViewChildren, QueryList, AfterViewInit} from '@angular/core';
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
export class TabsPage implements AfterViewInit{

   tab1Root: any;
   tab2Root: any;
   tab3Root: any;
   tab4Root: any;
   tab5Root: any;

  lastSelected;

  addNum;
  tabItems = [];
  @ViewChild(Tabs) tabs: Tabs;
  @ViewChildren("tabTitleSpan") titleItems: QueryList<any>;
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



    this.events.subscribe("user:signin",(res) => {

      this.addNum = res;
      this.signinDisplay = "block";

      setTimeout(() => {

        this.signinDisplay = "none";

      },3500);

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

  ngAfterViewInit(){

    console.log(this.titleItems);

    let items = <any>this.titleItems;
    let arr = items._results;

    arr[0].nativeElement.style.color = "rgb(208,64,66)";
    this.lastSelected = arr[0].nativeElement;

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


  selected(i,tabTitleSpan){

      if(typeof(this.lastSelected) != "undefined"){
        this.lastSelected.style.color = "#4b4c4d";
      }

      tabTitleSpan.style.color = "rgb(208,64,66)";
      this.lastSelected = tabTitleSpan;
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




