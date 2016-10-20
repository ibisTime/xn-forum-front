import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController, Platform, Content, NavParams, InfiniteScroll} from 'ionic-angular';
import {ContentPage} from '../content/content';
import {HttpService} from "../../../services/http.service";
import {PlatService} from "./plat.services";
import {WarnService} from "../../../services/warn.service";
import {SearchUserAndArticlePage} from "../../headline/search-user-article";
import {UserService} from "../../../services/user.service";
import {SendArticlePage} from "../send-article";
import {LoginPage} from "../../user/login";


@Component({
  templateUrl: 'platDetail.html',
    providers: [PlatService]
})
export class PlatDetailPage implements AfterViewInit{

  segment: string = "all";
  imgHeight: string;
  pHeight: string;
  plat;

  enableLoadMore = {
      "all" :true,
      "new" :true,
      "essence" : true
  }



  topLoadMoreHidden = true;
  @ViewChild(InfiniteScroll)  loadMoreScroll:  InfiniteScroll;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public http: HttpService,
              public platService: PlatService,
              public navParams: NavParams,
              public warn: WarnService,
              public userService: UserService
              ) {
      this.plat = navParams.data;
      this.platService.platCode = this.plat.code;
  }


    openContent() {
        this.navCtrl.push(ContentPage);
    }

    ngAfterViewInit() {

     this.changeType({"value":"all"});
     this.loadModeTopArticle();

    }


    loadModeTopArticle() {
        let load = this.warn.loading("");
        this.platService.getTopArticle().then(res => {
            load.dismiss();
            console.log(res);
            this.topLoadMoreHidden = res;

        }).catch(error => {
            load.dismiss();
            this.warn.toast('加载失败，请稍后再试');

        })
    }


    goArticleDetail(item){
        this.navCtrl.push(ContentPage,item);
    }


    changeType($event){
        // console.log($event);
        this.loadMoreScroll.enable(this.enableLoadMore[$event.value]);
        this.platService.getArticleByType($event.value).then(res => {

        }).catch(err => {

        });
    }


    doLoadMore(infiniteScroll){

        this.platService.getArticleByType(this.segment).then(res => {

            console.log(res);
            infiniteScroll.complete();
            if(!res){
                infiniteScroll.enable(false);
                this.enableLoadMore[this.segment] = false;
            }

        }).catch(err => {

            infiniteScroll.complete();


        });

    }

    search(){

        this.navCtrl.push(SearchUserAndArticlePage);

    }

    send(){

        if(this.userService.user){
            this.navCtrl.push(SendArticlePage);
        } else  {
            this.navCtrl.push(LoginPage);
        }

    }


}
