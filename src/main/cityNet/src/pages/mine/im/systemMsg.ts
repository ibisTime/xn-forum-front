/**
 * Created by tianlei on 2016/10/17.
 */
import {Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import {InfiniteScroll, Refresher, NavController} from 'ionic-angular';
import {PageDataService} from "../../headline/page-data.services";
import {HttpService} from "../../../services/http.service";
import {SysMsgDetailPage} from "./sysMsgDetail";
@Component({
    templateUrl: 'system-msg.html',
    providers:[PageDataService]


})
export class SystemMsgPage implements OnInit, AfterViewInit {

    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;
    constructor(public pageDataService:PageDataService,
                public http: HttpService,
                public nav: NavController) {
    }

    ngAfterViewInit(){

        this.pageDataService.url = "/msg/read/page";
        this.pageDataService.reqObj = {

        };
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


    selected(detail){
        this.nav.push(SysMsgDetailPage,detail);
    }

    refresh($event){
      this.pageDataService.refresh();
    }

    loadMore($event){

       this.pageDataService.loadMore();

    }

    // b2cSms: Object
    // code: "XX2016102514111968238"
    // companyCode: "0"
    // content: "<p>第一条</p>"
    // status: "1"
    // title: "第一条"
    // toCompany: "0"
    // toLevel: "0"
    // toUser: "0"
    // type: "1"
    // updateDatetime: "Oct 25, 2016 2:11:24 PM"
    // updater: "admin"
    // __proto__: Object
    // id:5
    // smsCode: "XX2016102514111968238"
    // status: "0"
    // userId: "U2016102315460204043"
}