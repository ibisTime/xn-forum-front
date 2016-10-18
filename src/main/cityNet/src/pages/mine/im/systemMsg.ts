/**
 * Created by tianlei on 2016/10/17.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {InfiniteScroll,Refresher} from 'ionic-angular';
import {PageDataService} from "../../headline/page-data.services";
import {HttpService} from "../../../services/http.service";
@Component({
    templateUrl: 'system-msg.html',
    providers:[PageDataService]


})
export class SystemMsgPage implements OnInit, AfterViewInit {

    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;
    constructor(public pageDataService:PageDataService,
                public http: HttpService) {
    }

    ngAfterViewInit(){

        this.pageDataService.url = "/msg/read/page";
        this.pageDataService.reqObj = {};
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.refresher._beginRefresh();

    }
    ngOnInit() {
        // let params = {
        //   "smsCode" : ""
        // };
        // this.http.post("/msg/read",params).then(res => {
        //
        // }).catch(error => {
        //
        // });
        //
        //
        //    let params = {
        //     "id":""
        //    };
        //     this.http.post("/msg/read/delete",params).then(res => {
        //
        //     }).catch(error => {
        //
        //     });

    }


    refresh($event){
      this.pageDataService.refresh();
    }

    loadMore($event){
       this.pageDataService.loadMore();

    }
}