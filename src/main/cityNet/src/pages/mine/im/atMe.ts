/**
 * Created by tianlei on 2016/10/13.
 */
import {Component,ViewChild} from '@angular/core';
import {NavController, Platform, NavParams,
    InfiniteScroll, Refresher, ModalController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";

import {ContentPage} from "../../forum/content/content";
import {PageDataService} from "../../headline/page-data.services";
import {SendArticlePage} from "../../forum/send-article";
import {HttpService} from "../../../services/http.service";

@Component({
    templateUrl: 'atMe.html',
    providers:[PageDataService]
})
export class AtMePage {

    src:string = 'images/marty-avatar.png';

    result = false;
    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public navCtrl: NavController,
                public platform: Platform,
                public warnCtrl: WarnService,
                public params: NavParams,
                public pageDataService:PageDataService,
                public model: ModalController,
                public http: HttpService) {


    }

// A 草稿中 B 已发布 C1 不信任待审批 C2 被举报待审批 D 审批通过 E 待回收 F 被过滤

    ngAfterViewInit(){
        this.pageDataService.url = "/post/talkMe/page";
        this.pageDataService.reqObj = {
        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.refresh("our");
    }

    refresh($event){

        this.pageDataService.refresh(() => {
            this.result = this.pageDataService.items.length <= 0;
        });

    }

    loadMore($event){
        this.pageDataService.loadMore();
    }

    goArticleDetail($event){
        this.navCtrl.push(ContentPage,$event);
    }



}

// code: "TZ2016101317200592039"
// commentList: Array[
//     0
//     ]
// content: "4444"
// isDZ: "0"
// isSC: "0"
// likeList: Array[
//     0
//     ]
// nickname: "tianlei"
// picArr: Array[
//     1
//     ]
// plateCode: "BK2016101118522446147"
// publishDatetime: "Oct 13, 2016 5:20:05 PM"
// publisher: "U2016100913405823244"
// status: "-1"
// title: "444"
// totalCommNum:
//     0
// totalLikeNum:
//     0
// totalReadTimes:
//     0
