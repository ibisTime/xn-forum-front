import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController, Platform, Content, ModalController} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: 'comment.html'
})
export class CommentPage implements AfterViewInit{

  segment: string = "wsdd";
  imgHeight: string;
  pHeight: string;
  imgUrl: string;
  start1: number;
  limit1: number;
  start2: number;
  limit2: number;
  items1 = [];
  items2 = [];
  appendCount = 0;
  load;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public mCtrl: ModalController,
              public http: HttpService) {
      this.start1 = 1;
      this.limit1 = 10;
      this.start2 = 1;
      this.limit2 = 10;

  }

  ngAfterViewInit(){
      this.getCommentFromMe();
      this.getCommentToMe();
  }

  /*我发出的评论*/
  getCommentFromMe() {
      let obj = {
          "start": 1,
          "limit": 10
      }
      this.http.get("/post/mytocomment/page",obj).then(res => {

      }).catch(error => {

      })

  }


  /*我收到的评论*/
  getCommentToMe(){

      let obj = {
          "start": 1,
          "limit": 10
      }
      this.http.get("/post/myfromcomment/page",obj).then(res => {

      }).catch(error => {

      })

  }

  refresh($event){


  }

  loadMore($event){


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
/*code: "PL2016101212203137384"
commDatetime: "Oct 12, 2016 12:20:31 PM"
commer: "U2016100913405823244"
content: "23233232323"
nextCommentList: Array[0]
nickname: "tianlei"
parentCode: "TZ2016101211362092517"*/

