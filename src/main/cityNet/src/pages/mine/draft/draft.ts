/**
 * Created by tianlei on 2016/10/13.
 */
import {Component, AfterViewInit,ViewChild} from '@angular/core';
import {NavController, Platform, NavParams,
        InfiniteScroll, Refresher, ModalController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";

import {ContentPage} from "../../forum/content/content";
import {PageDataService} from "../../headline/page-data.services";
import {SendArticlePage} from "../../forum/send-article";

@Component({
    templateUrl: 'draft.html',
    providers:[PageDataService]
})
export class DraftPage {

    src:string = 'images/marty-avatar.png';


    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public warnCtrl: WarnService,
                public params: NavParams,
                public pageDataService:PageDataService,
                public model: ModalController) {


    }

// -1 草稿 0 待审核 1 审核通过 2 审核不通过 3 已发布
    ngAfterViewInit(){
        this.pageDataService.url = "/post/my/page";
        this.pageDataService.reqObj = {
            "status":"-1"
        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.pageDataService.refresh();
    }

    refresh($event){

        this.pageDataService.refresh();
    }

    loadMore($event){
        this.pageDataService.loadMore();
    }

    goArticleDetail($event){
        this.navCtrl.push(ContentPage,$event);
    }

    /*重新进入编辑页*/
    goSendArticle(item){

       let model = this.model.create(SendArticlePage,item);
       model.present();

    }

}
