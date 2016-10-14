import {Component, AfterViewInit,ViewChild} from '@angular/core';
import {NavController, Platform, NavParams,InfiniteScroll,Refresher} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";

import {ContentPage} from "../../forum/content/content";
import {PageDataService} from "../../headline/page-data.services";



@Component({
  templateUrl: 'collection.html',
  providers:[PageDataService]
})
export class CollectionPage {

  src:string = 'images/marty-avatar.png';


    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl: WarnService,
              public params: NavParams,
              public pageDataService:PageDataService) {


  }

  ngAfterViewInit(){

      this.pageDataService.url = "/post/collection/page";
      this.pageDataService.reqObj = {};
      this.pageDataService.refreshComp = this.refresher;
      this.pageDataService.loadMoreComp = this.loadMoreScroll;

      this.pageDataService.refresh();

  }


    doRefresh($event){
        this.pageDataService.refresh();
    }


    doAppendData($event){
        this.pageDataService.loadMore();
    }

    goArticleDetail($event){
        this.navCtrl.push(ContentPage,$event);
    }
}
