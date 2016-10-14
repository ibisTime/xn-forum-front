/**
 * Created by tianlei on 2016/10/14.
 */
import {Component, AfterViewInit, ViewChild} from '@angular/core';
import {NavController, NavParams,InfiniteScroll,Refresher} from 'ionic-angular';
import {PageDataService} from "../../headline/page-data.services";
import {MineDetailPage} from "../detail/detail";

@Component({
    templateUrl: 'relationship.html',
    providers:[PageDataService]
})
export class RelationPage implements AfterViewInit {


    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;
    url;
    title;
    constructor(public pageDataService: PageDataService,
                public navParams: NavParams,
                public navCtrl: NavController) {

        if(navParams.data == "fans"){
            this.title = "粉丝";
            this.url = "/rs/fans/page";
        }
        if(navParams.data == "follow"){
            this.title = "关注";
            this.url = "/rs/follows/page";
        }

    }

    ngAfterViewInit() {

        this.pageDataService.url = this.url;
        this.pageDataService.reqObj = {

        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.pageDataService.refresh();
    }

    goDetail(item){
        this.navCtrl.push(MineDetailPage,{"toUserId":item.userId});
    }


    doRefresh($event){
        this.pageDataService.refresh();
    }


    doLoadMore($event) {
        this.pageDataService.loadMore();
    }

}

// kind: "f1"
// level: "0"
// loginName: "18767101908"
// mobile: "18767101908"
// remark: "前端个人用户"
// status: "0"
// updateDatetime: "Oct 13, 2016 2:22:27 AM"
// updater: "U2016101302222711950"
// userId: "U2016101302222711950"