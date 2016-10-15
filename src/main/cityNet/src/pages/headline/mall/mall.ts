/**
 * Created by tianlei on 2016/10/14.
 */
import {Component, OnInit, ViewChild,AfterViewInit} from '@angular/core';
import {Platform, NavController, InfiniteScroll, Refresher} from "ionic-angular";
import {GoodsDetailPage} from "./goods-detail";
import {PageDataService} from "../page-data.services";
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {CityService} from "../../../services/city.service";

@Component({
    templateUrl: 'mall.html',
    providers:[PageDataService]

})
export class MallPage implements OnInit,AfterViewInit {

    imgHeight;

    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public platform: Platform,
                public nav: NavController,
                public http: HttpService,
                public warn: WarnService,
                public cityS: CityService,
                public pageDataService:PageDataService) {

        this.imgHeight = `${(this.platform.width() - 20) * 0.48 * 0.55}px`;



        // this.getGoodsList();

    }
    ngAfterViewInit(){

        this.pageDataService.url = "/commodity/queryProducePage";
        this.pageDataService.reqObj = {
            "siteCode": this.cityS.currentCity.code
        };
        this.pageDataService.type = "other";
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;

        this.pageDataService.refresh();

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

    goDetail(item){
        this.nav.push(GoodsDetailPage,item);
    }

    refresh($event){
      this.pageDataService.refresh();
    }

    loadMore($event){
       this.pageDataService.loadMore();
    }

}

//
// code: "CP2016101310581745311"
// description: "<p>1</p>"
// kind:  "B"
// name:  "草帽"
// pic:   "http://121.43.101.148:8901/2016101310/20161028710584868546307.png"
// price:
// 1000000
// siteCode: "GS2016101110040872244"
// status: "2"
