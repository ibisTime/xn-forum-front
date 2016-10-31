import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController, NavParams} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {InfiniteScroll,Refresher} from "ionic-angular"
import {CityService} from "../../../services/city.service";
import {PageDataService} from "../../headline/page-data.services";
import {EndDateChoose} from "./end-date-choose";

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
        this.pageDataService.url = "/post/page";
        this.pageDataService.reqObj = {
            "plateCode" : this.plate.code
        };
        this.pageDataService.refreshComp = this.refresher;
        this.pageDataService.loadMoreComp = this.loadMoreScroll;
        this.refresh();
    }

    refresh(){

        this.http.get("/plate/info",{"code":this.plate.code}).then(res => {
            this.plate = res.data;
        }).catch(error => {

        });
        this.pageDataService.refresh(() => {
        });
    }

    loadMore(){
        this.pageDataService.loadMore();
    }


    ignore(item){

        let index =  this.pageDataService.items.indexOf(item);
        this.pageDataService.items.splice(index,1);

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
            approveNote: "审核通过",
            type: "1"
        };
        this.http.get("/post/check",obj).then(res => {
            load.dismiss();
            this.warnCtrl.toast('审核成功');
        }).catch(error => {
            load.dismiss();
        });

    }


    lock(item){


        let successMsg = "锁帖成功";
        let failureMsg = "锁帖失败";
        if(item.islock == "1"){
            successMsg = "解锁成功";
            failureMsg = "解锁失败";
        }

        let load = this.warnCtrl.loading();
       this.http.get("/post/lock",{code:item.code}).then(res => {
           load.dismiss();
           this.warnCtrl.toast(successMsg);
           if(item.isLock == "1"){
               item.isLock = "0";
           } else {
               item.isLock = "1";
           }
       }).catch(error => {
           load.dismiss();
       });

    }


    essence(item){

        this.navCtrl.push(EndDateChoose,{"item":item,type:"essence"});

        // let load = this.warnCtrl.loading();
        // this.http.get("/post/setTop",{"code":item.code,location:"B",endDatetime:""}).then(res => {
        //
        //     load.dismiss();
        //     this.warnCtrl.toast("精华帖设置成功");
        //   item["location"] = "B";
        // }).catch(error => {
        //
        //     this.warnCtrl.toast("精华帖设置失败");
        //     load.dismiss();
        // });

    }


    //  A置顶 B 精华 C 头条
    top(item){


        this.navCtrl.push(EndDateChoose,{"item":item,type:"top"});

    //   let load = this.warnCtrl.loading();
    //   this.http.get("/post/setTop",{"code":item.code,location:"A",endDatetime:""}).then(res => {
    //
    //       load.dismiss();
    //       this.warnCtrl.toast("置顶成功");
    //       item["location"] = "A";
    //
    //   }).catch(error => {
    //       this.warnCtrl.toast("置顶失败");
    //       load.dismiss();
    //   });
    //
    }





}
