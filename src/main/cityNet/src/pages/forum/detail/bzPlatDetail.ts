import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {InfiniteScroll,Refresher} from "ionic-angular"
import {CityService} from "../../../services/city.service";
import {PageDataService} from "../../headline/page-data.services";

@Component({
  templateUrl: 'bzPlatDetail.html',
  providers: [PageDataService]
})
export class BZPlatDetailPage {

  segment: string = "isCheck";


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
              public pageDataService: PageDataService
  ) {

  }

    ngAfterViewInit(){
        this.pageDataService.url = "/post/my/page";
        this.pageDataService.reqObj = {
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

    delete(){

    }

    pass(){

    }

    lock(){

    }

    ignore(){

    }

    essence(){

    }

    top(){

    }


}
