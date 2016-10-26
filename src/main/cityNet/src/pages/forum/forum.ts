import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController, Events} from 'ionic-angular';
import {PlatDetailPage} from "./detail/platDetail";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {ContentPage} from "./content/content";
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
  // pHeight: string;
  // imgUrl: string;
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
      this.events.subscribe('user:cityChange',() => {

          this.start = 1;
          this.limit = 10;
          this.queryPostPage();

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
             "status" : "B"
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
                        list[i].commentList.splice(5);
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
    openPage($event) {

        let target = $event.event.target;
        if(target.className == "people"){
            //点击@

            $event.event.stopPropagation();
            return;
        }else{
            this.navCtrl.push(ContentPage, $event);
        }

    }

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

    /*聊天*/
    // goChat(userId) {
    //     this.navCtrl.push(ChatRoomPage, userId);
    // }
    //
    // goDetail(toId) {
    //     this.navCtrl.push(MineDetailPage, {toUserId: toId});
    // }


  /*分类数据*/
    getClass() {

        if(this.classification.length > 0){
            return;
        }

        let obj = {
            "parentKey": "plate_kind"
        }
        this.http.get("/general/dict/list", obj).then(res => {

            let data = res["data"];
            if(data instanceof Array){
             this.classification = res["data"];

            }

        }).catch(res => {

        });
    }

    /*板块详情*/
    goPlateDetail($event) {

        this.navCtrl.push(PlatDetailPage,$event);

    }




    // //收藏
    // collect(code, index, flag?){
    //     if(!this.items[index].collectCount){
    //         this.items[index].collectCount = 1;
    //         this.http.post('/post/praise',{
    //               "type": "2",
    //               "postCode": code
    //           }).then((res) => {
    //                   this.items[index].collectCount = 0;
    //                   if(res.success){
    //                       if(!flag){
    //                           this.items[index].isSC = "1";
    //                       }else{
    //                           this.items[index].isSC = "0";
    //                       }
    //                   }else if(res.timeout){
    //                       this.warnCtrl.toast("登录超时，请重新登录!");
    //                   }else{
    //                       if(!flag){
    //                           this.warnCtrl.toast("收藏失败，请稍后重试!");
    //                       }else{
    //                           this.warnCtrl.toast("取消收藏失败，请稍后重试!");
    //                       }
    //                   }
    //               }).catch(error => {
    //                   this.items[index].collectCount = 0;
    //                   if(!flag){
    //                       this.warnCtrl.toast("收藏失败，请稍后重试!");
    //                   }else{
    //                       this.warnCtrl.toast("取消收藏失败，请稍后重试!");
    //                   }
    //               });
    //     }else{
    //         this.warnCtrl.toast("请勿重复点击!");
    //     }
    // }
    //
    // //点赞
    // praise(code, index, flag?){
    //     if(!this.items[index].praiseCount){
    //           this.items[index].praiseCount = 1;
    //           this.http.post('/post/praise',{
    //               "type": "1",
    //               "postCode": code
    //               })
    //               .then((res) => {
    //                   this.items[index].praiseCount = 0;
    //                   if(res.success){
    //                       if(!flag){
    //                           this.items[index].totalLikeNum = +this.items[index].totalLikeNum + 1;
    //                           this.items[index].isDZ = "1";
    //                       }else{
    //                           this.items[index].totalLikeNum = +this.items[index].totalLikeNum - 1;
    //                           this.items[index].isDZ = "0";
    //                       }
    //                   }else{
    //                       if(flag){
    //                           this.warnCtrl.toast("取消点赞失败，请稍后重试!");
    //                       }else{
    //                           this.warnCtrl.toast("点赞失败，请稍后重试!");
    //                       }
    //                   }
    //               }).catch(error => {
    //                   this.items[index].praiseCount = 0;
    //                   if(flag){
    //                       this.warnCtrl.toast("取消点赞失败，请稍后重试!");
    //                   }else{
    //                       this.warnCtrl.toast("点赞失败，请稍后重试!");
    //                   }
    //               });
    //     }else{
    //         this.warnCtrl.toast("请勿重复点击!");
    //     }
    // }


}
