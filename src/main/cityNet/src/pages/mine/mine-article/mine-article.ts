import {Component,ViewChild} from '@angular/core';
import {NavController, Platform, NavParams,InfiniteScroll,Refresher} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";

import {PageDataService} from "../../headline/page-data.services";
import {UserService} from "../../../services/user.service";



@Component({
    templateUrl: 'mine-article.html',
    providers:[PageDataService]
})
export class MineArticlePage {



    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public warnCtrl: WarnService,
                public params: NavParams,
                public pageDataService:PageDataService,
                public userService: UserService
                ) {


    }

    ngAfterViewInit(){

        this.pageDataService.url = "/post/my/page";
        this.pageDataService.reqObj = {
            "userId":this.userService.userId,
            "status":"NO_A"
        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.refresher._beginRefresh();

    }


    refresh($event){
        this.pageDataService.refresh();
    }


    loadMore($event){
        this.pageDataService.loadMore();
    }


}
