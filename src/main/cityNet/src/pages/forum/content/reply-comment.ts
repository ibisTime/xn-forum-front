/**
 * Created by tianlei on 16/9/22.
 */
import { Component, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ViewController, Platform, ModalController, NavParams, Events } from "ionic-angular";
import { HttpService } from "../../../services/http.service";
import { UserService } from "../../../services/user.service";
import { WarnService } from "../../../services/warn.service";
import { Keyboard } from "ionic-native";

@Component({
  templateUrl: 'reply-comment.html'
})
export class ReplyCommentPage implements AfterViewInit, OnDestroy {

  showTopicDashboard = false;
  isEditing = false;
  placeholderStr = "回复评论";
  content = "";
  commentCode = "";
  parentCommer = "";
  parentNickname = "";
  code = "";
  type = "";

  @ViewChild('contentTextarea') textArea: ElementRef;


  constructor(public viewCtrl: ViewController,
    public platform: Platform,
    public http: HttpService,
    public userS: UserService,
    public warn: WarnService,
    public model: ModalController,
    public navParams: NavParams,
    public events: Events) {

    if (navParams.data) {
      this.type = navParams.data.type;
      if (this.type == "1") {
        this.code = navParams.data.code;
        this.placeholderStr = "回复帖子";
      } else {
        this.commentCode = navParams.data.code;
        this.parentCommer = navParams.data.commer;
        this.parentNickname = navParams.data.nickname;
      }
    }
    console.log(this.parentNickname);
  }

  ngOnDestroy() {
  }

  ngAfterViewInit() {

    document.getElementById("replay_textarea").focus();

  }



  cancle() {
    this.viewCtrl.dismiss(false);
    Keyboard.close();
  }

  send(contentTextarea) {
    let successStr = "评论成功";
    let url = "/post/comment";
    let articleObj = {};
    if (contentTextarea.value.length <= 0) {
      this.warn.alert('评论内容不能为空');
      return;
    }
    if(this.type == "1"){
      articleObj = {
        parentCode: this.code,
        content: contentTextarea.value
      }
    }else{
      articleObj = {
        parentCode: this.commentCode,
        content: contentTextarea.value
      };
    }
    
    let load = this.warn.loading("发布中");
    

    this.http.post(url, articleObj)
      .then(res => {
        this.warn.toast(successStr);
        load.dismiss().then(res => {
          this.viewCtrl.dismiss(true);
        });
        let rCode = res.data.code;
        if (/\;filter:true$/.test(rCode)) {
          this.warn.toast("评论中含有敏感词汇!");
        } else {
          let obj = {};
          if(this.type == "1"){
            obj = {
              msg: contentTextarea.value,
              code: rCode,
              type: "1"
            }
          }else{
            obj = {
              msg: contentTextarea.value,
              parentCommer: this.parentCommer,
              parentNickname: this.parentNickname,
              code: rCode
            };
          }
          
          this.events.publish("user:replyCommentSuccess", obj);
        }
      }).catch(error => {
        load.dismiss();
      });

  }

}
