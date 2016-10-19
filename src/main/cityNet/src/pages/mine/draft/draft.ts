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
                public model: ModalController,public http: HttpService) {


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

    reSend($event,item,index){

        $event.stopPropagation();

       let load = this.warnCtrl.loading();
        let obj = {
            "code":item.code,
            "title":item.title,
            "content":item.content,
            "plateCode": item.platCode
        };

        if (typeof(item.picArr) != "undefined") {

            obj["pic"] = item.picArr.join("||");

        }

        this.http.post("/post/craft/publish",obj).then(res => {

            load.dismiss();
            this.warnCtrl.toast("重新发布成功");
            this.pageDataService.articles.splice(index,1);

        }).catch(error => {

            load.dismiss();
            this.warnCtrl.toast("重新发布失败");

        });

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
