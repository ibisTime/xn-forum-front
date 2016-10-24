import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {InfiniteScroll,Refresher} from "ionic-angular"
import {CityService} from "../../../services/city.service";
import {PageDataService} from "../../headline/page-data.services";
import {Http} from "@angular/http";

@Component({
  templateUrl: 'bzPlatDetail.html',
  providers: [PageDataService]
})
export class BZPlatDetailPage {

  segment: string = "isCheck";
  plate;
  items = [];
  isEnd = false;


    @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
    @ViewChild(Refresher)  refresher:  Refresher;


  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public http: HttpService,
              public cityService: CityService,
              public pageDataService: PageDataService,
              public navParams: NavParams
  ) {
      this.plate = navParams.data;
  }

    ngAfterViewInit(){
        this.pageDataService.url = "/post/my/page";
        this.pageDataService.reqObj = {
            "plateCode" : this.plate.code
        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.refresh();
    }

    refresh(){

        this.pageDataService.refresh(() => {
        });
    }

    loadMore(){
        this.pageDataService.loadMore();
    }


    ignore(){


    }


    delete(item){

        //1 帖子 2 评论
        let load = this.warnCtrl.loading();
        this.http.post("/post/delete",{code:item.code,type:"1"}).then(res => {

            load.dismiss();
            this.warnCtrl.toast("删帖成功");

            let index =  this.pageDataService.items.indexOf(item);
            this.pageDataService.items.splice(index,1);

        }).catch(error => {
            this.warnCtrl.toast("删帖失败");
        });

    }


    pass(item){

        let load = this.warnCtrl.loading();
        let obj = {
            code: item.code,
            approveResult: "1",
            approver:this.uService.userId,
            approveNote: "审核通过",
            type: "1"
        };
        this.http.post("/past/check",obj).then(res => {
            load.dismiss();
            this.warnCtrl.toast('审核成功');
        }).catch(error => {
            load.dismiss();
            this.warnCtrl.toast('审核失败');
        });

    }


    lock(item){

        let load = this.warnCtrl.loading();
       this.http.post("/post/lock",{code:item.code}).then(res => {
           load.dismiss();
           this.warnCtrl.toast("锁帖成功");
       }).catch(error => {
           this.warnCtrl.toast("锁帖失败");
       });

    }


    essence(item){

        this.http.post("/post/setTop",{"code":item.code,location:"B",endDatetime:""}).then(res => {

        }).catch(error => {

        });

    }


    //  A置顶 B 精华 C 头条
    top(item){

      this.http.post("/post/setTop",{"code":item.code,location:"A",endDatetime:""}).then(res => {

      }).catch(error => {

      });

    }





}
