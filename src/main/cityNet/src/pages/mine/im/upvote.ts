import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController, Platform, Content, ModalController, InfiniteScroll,Refresher} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {MineDetailPage} from "../../../pages/mine/detail/detail";
import {ContentPage} from "../../../pages/forum/content/content";

@Component({
  templateUrl: 'upvote.html'
})
export class UpvotePage implements AfterViewInit{


  start1 = 1;
  start2 = 1;

  limit = 15;
  first = true;

  fromMe = [];
  toMe = [];

  type = "left";

  @ViewChild(InfiniteScroll)  loadMoreComp:  InfiniteScroll;
  @ViewChild(Refresher)  refreshCmp:  Refresher;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public mCtrl: ModalController,
              public http: HttpService) {

      this.type = "left";

  }

  ngAfterViewInit(){
      this.getCommentFromMe();
      this.getCommentToMe();
  }

  changType($event){

      this.loadMoreComp.enable(true);

      if($event == "left"){

          this.type = "left";

      } else {

          this.type = "right";

      }

  }
/*点击头像去详情页*/
goDetail(event, article){
    event.stopPropagation();
    this.navCtrl.push(MineDetailPage, {publisher: article});
}
openPage($event, code, publisher) {
    this.navCtrl.push(ContentPage, {code: code, openType: 1, publisher: publisher});
}

  /*我收到的评论*/
  getCommentToMe() {

      let obj = {
          "start": this.start2,
          "limit": this.limit
      }
      this.http.get("/post/myfromcomment/page",obj).then(res => {

          if(this.start2 == 1){
              this.toMe = [];
          }
          this.toMe.push(...res.data.list);
          this.start2 ++;


          this.refreshCmp.complete();
          this.loadMoreComp.complete();

          if (!this.first && this.limit*this.start2 >= res.data.totalCount) {
              this.loadMoreComp.enable(false);
          }
          this.first = false;
      }).catch(error => {

          this.refreshCmp.complete();
          this.loadMoreComp.complete();
      })
      
  }

  /*我发出的评论*/
  getCommentFromMe(){

      let obj = {
          "start": this.start1,
          "limit": this.limit
      }

      this.http.get("/post/mytocomment/page",obj).then(res => {

          if(this.start1 == 1){
              this.fromMe = [];
          }
          this.fromMe.push(...res.data.list);
          this.start1 ++;

          this.refreshCmp.complete();
          this.loadMoreComp.complete();

          if (this.limit*this.start1 >= res.data.totalCount) {
              this.loadMoreComp.enable(false);
          }


      }).catch(error => {

          this.refreshCmp.complete();
          this.loadMoreComp.complete();

      })

  }

  refresh($event){
    if(this.type == "left"){
        this.start1 = 1;
        this.getCommentFromMe();
    } else {
        this.start2 = 1;
        this.getCommentToMe();
    }
    this.loadMoreComp.enable(true);
  }

  loadMore($event){
      if(this.type == "left"){
          this.getCommentFromMe();
      } else {
          this.getCommentToMe();
      }

  }


}

//我收到的
/*code: "PL2016101514234219354"
commDatetime: "Oct 15, 2016 2:23:42 PM"
commer: "U2016101412435083050"
content: "评论我自己"
nickname: "我是？？？"
parentCode: "TZ2016101423003422779"
post: Object[
    code: "TZ2016101423003422779"
    content: "321312"
    nickname: "我是？？？"
    pic: "http://121.43.101.148:8901/2016101423/2016102881100345716341.jpg"
    plateCode: "BK2016101413580681223"
    publishDatetime: "Oct 14, 2016 11:00:34 PM"
    publisher: "U2016101412435083050"
    status: "0"
    title: "323"
    totalReadTimes:0
]*/


//我发出的
/*code:     "PL2016101212203137384"
commDatetime: "Oct 12, 2016 12:20:31 PM"
commer:     "U2016100913405823244"
content:    "23233232323"
nextCommentList: Array[0]
nickname:   "tianlei"
parentCode: "TZ2016101211362092517"*/

