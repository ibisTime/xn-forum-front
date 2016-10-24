/**
 * Created by tianlei on 2016/10/20.
 */
import {Component, OnInit,ViewChild, AfterViewInit} from '@angular/core';
import {PageDataService} from "../../headline/page-data.services";
import {InfiniteScroll, Refresher, Platform, NavController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";
import {CityService} from "../../../services/city.service";
import {MinePropertyDetail} from "./mine-property-datail";

@Component({

    templateUrl: 'mine-property.html',
    providers:[PageDataService]

})
export class MineProperty implements OnInit,AfterViewInit {

    imgHeight;

    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;

    constructor(public platform: Platform,
                public nav: NavController,
                public warn: WarnService,
                public cityS: CityService,
                public pageDataService:PageDataService) {

        this.imgHeight = `${(this.platform.width() - 20) * 0.48 * 0.55}px`;


    }

    ngAfterViewInit(){

        this.pageDataService.url = "/commodity/order/page";
        this.pageDataService.reqObj = {
        };
        this.pageDataService.type = "other";
        this.pageDataService.httpMethod = "post";
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;

        this.pageDataService.refresh();

    }
    ngOnInit() {

    }

    goDetail(item){
        this.nav.push(MinePropertyDetail,item);
    }

    refresh($event){
        this.pageDataService.refresh();
    }

    loadMore($event){
        this.pageDataService.loadMore();
    }

}