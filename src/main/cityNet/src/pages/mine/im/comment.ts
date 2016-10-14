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

  }

  /*我发出的评论*/
  getCommentFromMe() {
      let obj = {
          "start": 1,
          "limit": 10
      }
      this.http.get("/post/mytocomment/page").then(res => {

      }).catch(error => {

      })

  }


  /*我收到的评论*/
  getCommentToMe(){

      this.http.get("/post/myfromcomment/page").then(res => {

      }).catch(error => {

      })

  }

}
