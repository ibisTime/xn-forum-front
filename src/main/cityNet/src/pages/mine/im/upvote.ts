import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, Platform, Content, ModalController, InfiniteScroll, Refresher } from 'ionic-angular';
import { HttpService } from "../../../services/http.service";
import { WarnService } from "../../../services/warn.service";
import { UserService } from "../../../services/user.service";
import { MineDetailPage } from "../../../pages/mine/detail/detail";
import { ContentPage } from "../../../pages/forum/content/content";

@Component({
    templateUrl: 'upvote.html'
})
export class UpvotePage implements AfterViewInit {
    start = 1;
    limit = 15;
    pageData = [];

    @ViewChild(InfiniteScroll) loadMoreComp: InfiniteScroll;
    @ViewChild(Refresher) refreshCmp: Refresher;
    @ViewChild(Content) content: Content;

    constructor(public navCtrl: NavController,
        public platform: Platform,
        public warnCtrl: WarnService,
        public uService: UserService,
        public mCtrl: ModalController,
        public http: HttpService) {

    }

    ngAfterViewInit() {
        this.getPagePraise();
    }

    /*点击头像去详情页*/
    goDetail(event, article) {
        event.stopPropagation();
        this.navCtrl.push(MineDetailPage, { publisher: article });
    }
    openPage($event, code, publisher) {
        this.navCtrl.push(ContentPage, { code: code, openType: 1, publisher: publisher });
    }

    /*点赞分页查询*/
    getPagePraise() {
        let obj = {
            "start": this.start,
            "limit": this.limit
        }
        this.http.get("/post/praise/page", obj).then(res => {
            if (this.start == 1) {
                this.pageData = [];
            }
            this.pageData.push(...res.data.list);
            this.start++;

            this.refreshCmp.complete();
            this.loadMoreComp.complete();

            if (this.limit * this.start >= res.data.totalCount) {
                this.loadMoreComp.enable(false);
            }
        }).catch(error => {
            this.refreshCmp.complete();
            this.loadMoreComp.complete();
        });
    }

    refresh($event) {
        this.start = 1;
        this.getPagePraise();
        this.loadMoreComp.enable(true);
    }

    loadMore($event) {
        this.getPagePraise();
    }
}