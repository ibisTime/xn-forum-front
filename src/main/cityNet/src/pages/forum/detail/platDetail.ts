import {Component, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {NavController, Platform, Content, NavParams} from 'ionic-angular';
import {ContentPage} from '../content/content';
import {HttpService} from "../../../services/http.service";
import {PlatService} from "./plat.services";
import {WarnService} from "../../../services/warn.service";


@Component({
  templateUrl: 'platDetail.html',
    providers: [PlatService]
})
export class PlatDetailPage implements AfterViewInit,OnDestroy{

  segment: string = "all";
  imgHeight: string;
  pHeight: string;
  plat;

  topLoadMoreHidden = false;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public http: HttpService,
              public platService: PlatService,
              public navParams: NavParams,
              public warn: WarnService
              ) {
      this.plat = navParams.data;
      this.platService.platCode = this.plat.code;
  }


    openContent() {
        this.navCtrl.push(ContentPage);
    }

    ngAfterViewInit() {


     this.changeType("all");
     this.loadModeTopArticle();

    }


    loadModeTopArticle() {
        this.platService.getTopArticle().then(res => {

            this.topLoadMoreHidden = !res;

        }).catch(error => {

        })
    }


    goArticleDetail(item){
        this.navCtrl.push(ContentPage,item);
    }

    changeType($event){

         this.platService.getArticleByType(this.segment);

        //      .then(res => {
        //
        //     load.dismiss();
        // }).cathch(error => {
        //
        //     load.dismiss();
        //
        // });

    }

    doLoadMore(infiniteScroll){


        infiniteScroll.complete();

    }


}
