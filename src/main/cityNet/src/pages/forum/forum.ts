import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController, Events} from 'ionic-angular';
import {PlatDetailPage} from "./detail/platDetail";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {LoginPage} from "../user/login";
import {CityService} from "../../services/city.service";
import {SearchUserAndArticlePage} from "../headline/search-user-article";
import {SendArticlePage} from "./send-article";

@Component({
  templateUrl: 'forum.html'
})
export class ForumPage {

  segment: string = "yliao";
  isAndroid: boolean= false;
  imgHeight: string;

  //pHeight: string;
  //imgUrl: string;

  start: number;
  limit: number;
  items = [];
  isEnd = false;
  appendCount = 0;

  /*分类*/
  classification = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public userService : UserService,
              public mCtrl: ModalController,
              public http: HttpService,
              public events: Events,
              public warn: WarnService,
              public cityService: CityService) {

      this.start = 1;
      this.limit = 10;
      this.queryPostPage();
      this.getClass();
      this.events.subscribe('content:delete',
            (code) => {
                for(let i = 0; i < this.items.length; i++){
                    if(this.items[i].code == code){
                        this.items.splice(i, 1);
                        break;
                    }
                }
            });
      /*城市变更刷新*/
      this.events.subscribe('user:cityChange',() => {

          this.start = 1;
          this.limit = 10;
          this.items = [];
          this.queryPostPage();
          this.getClass();

      });

      /*发帖陈功刷新*/
      this.events.subscribe("user:postSuccess",() => {
          //是用户所属当前区域
          if(this.cityService.currentCity.code == this.userService.user.companyCode){

              this.start = 1;
              this.limit = 10;
              this.items = [];
              this.queryPostPage();
          };

      });

  }
  showLogin(){
    let modelCtrl = this.mCtrl.create(LoginPage);
    modelCtrl.present();
  }
  
  queryPostPage(event?, refresh?){
      return this.http.get('/post/page',{
            "start": this.start,
            "limit": this.limit,
             "siteCode" : this.cityService.currentCity.code,
             "status" : "BD"
            })
            .then((res) => {
                if(res.success){
                    let list = res.data.list;
                    let i = 0;
                    if(refresh){
                        this.items = [];
                    }
                    if(!list.length){
                        this.isEnd = true;
                    }
                    for(i = 0; i < list.length; i++){
                        list[i].collectCount = 0;   //点击收藏次数
                        list[i].praiseCount = 0;    //点击点赞次数
                        this.items.push(list[i]);
                    }
                    if(i > 0){
                        this.start++;
                    }
                }
                this.appendCount = 0;
                event && event.complete();
            }).catch(error => {
                this.appendCount = 0;
                event && event.complete();
            });
  }




  doRefresh(event){
        this.start = 1;
        this.isEnd = false;
        this.queryPostPage(event, true);
        this.getClass();
  }

  doAppendData(event){
        if(!this.appendCount && !this.isEnd){
            this.appendCount = 1;
            this.queryPostPage(event);
        }else{
            event.complete();
        }

  }

    // showDetail(code) {
    //     console.log('打开详情页');
    //     this.navCtrl.push(DetailPage);
    // }


    /*帖子详情*/

    search(){
        this.navCtrl.push(SearchUserAndArticlePage);
    }

    send(){

        if(this.userService.user){

            let modelCtrl = this.mCtrl.create(SendArticlePage);
            modelCtrl.present();

        } else {

            this.navCtrl.push(LoginPage);

        }
    }


  /*分类数据*/
    getClass() {

        // if(this.classification.length > 0){
        //     return;
        // }


        console.log("刷新了");
        let obj = {

            "companyCode": this.cityService.currentCity.code
        }
        this.http.get("/plate/category/list", obj).then(res => {

            let data = res["data"];
            if(data instanceof Array){

                this.classification = res["data"];

            }

        }).catch(res => {

        });

        // let obj = {
        //     "parentKey": "plate_kind"
        // }
        // this.http.get("/general/dict/list", obj).then(res => {
        //
        //     let data = res["data"];
        //     if(data instanceof Array){
        //      this.classification = res["data"];
        //
        //     }
        //
        // }).catch(res => {
        //
        // });


    }


    /*板块详情*/
    goPlateDetail($event) {

        this.navCtrl.push(PlatDetailPage,$event);

    }

}
