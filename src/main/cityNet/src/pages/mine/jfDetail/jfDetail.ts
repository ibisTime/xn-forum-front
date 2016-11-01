import {Component,ViewChild} from '@angular/core';
import {NavController, Platform, NavParams,InfiniteScroll,Refresher} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";

import {ContentPage} from "../../forum/content/content";
import {PageDataService} from "../../headline/page-data.services";



@Component({
    templateUrl: 'jfDetail.html',
    providers:[PageDataService]
})
export class JFPage {



    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public warnCtrl: WarnService,
                public params: NavParams,
                public pageDataService:PageDataService) {



    }

    ngAfterViewInit(){

        this.pageDataService.url = "/account/capitalflow/page";
        this.pageDataService.reqObj = {};
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
       this.refresher._beginRefresh();
    }


    refresh(){
        this.pageDataService.refresh();
    }


    loadMore(){
        this.pageDataService.loadMore();
    }

    goArticleDetail($event){
        this.navCtrl.push(ContentPage,$event);
    }
}
