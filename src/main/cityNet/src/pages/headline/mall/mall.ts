/**
 * Created by tianlei on 2016/10/14.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {Platform, NavController, InfiniteScroll, Refresher} from "ionic-angular";
import {GoodsDetailPage} from "./goods-detail";
import {PageDataService} from "../page-data.services";
import {HttpService} from "../../../services/http.service";

@Component({
    templateUrl: 'mall.html'
})
export class MallPage implements OnInit {

    imgHeight;

    // @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    // @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public platform: Platform,
                public nav: NavController,
                public pageDataService: PageDataService,
                public http: HttpService,
                public warn: WarnService) {

        this.imgHeight = `${(this.platform.width() - 20) * 0.48 * 0.55}px`;

        // this.pageDataService.url = "/post/collection/page";
        // this.pageDataService.reqObj = {};
        // this.pageDataService.type = "other";
        // this.pageDataService.refreshComp = this.refresher;
        // this.pageDataService.loadMoreComp = this.loadMoreScroll;
        // this.pageDataService.refresh();

        this.getGoodsList();

    }

    ngOnInit() {

    }

    getGoodsList(){

        let load = this.warn.loading();
        this.http.get("/commodity/queryProduces").then(res => {

            load.dismiss();
        }).catch(error => {
            load.dismiss();
            this.warn.toast('获取商品列表失败');
        });

    }

    goDetail(){
        this.nav.push(GoodsDetailPage);

    }
}