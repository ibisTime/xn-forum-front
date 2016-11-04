/**
 * Created by tianlei on 16/8/24.
 */
import {Component, ViewChild} from '@angular/core';
import {NavController, Content, NavParams, TextInput, Platform} from 'ionic-angular'
import {IMService} from "../../../services/im.service";
import {AfterViewInit} from "@angular/core";
import {ChatViewComponent} from "../../../components/chat-view/chat.component";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";


@Component({
  templateUrl: 'chat-room.html'
  // directives: [ChatViewComponent]
})
export class ChatRoomPage implements AfterViewInit {

  inputValue;
  listOfChatData;
  disable = false;
  placeholderView = false;
  heightValue = "none";
  height;

  bottom="250px";

  otherImg;
  @ViewChild(Content) content: Content;
  @ViewChild(TextInput) msgPut: any;
  @ViewChild(ChatViewComponent) chatView: ChatViewComponent;

  constructor(public  nav: NavController,
              public imServe: IMService,
              public params: NavParams,
              public platform: Platform,
              public warn: WarnService,
              public userService: UserService
              ) {

    //接受参数包含     userId    nickname   photo

    /*把user 对象传送过来*/
    this.listOfChatData = this.imServe.getDataByFromName(params.data.userId);

    this.otherImg = this.params.data.photo || "assets/images/marty-avatar.png";


    //1.哪到导航数据就去获取信息
    this.imServe.imTextMessageInner = msg => {

      setTimeout(() => {
        this.content.scrollToBottom();
      },300)

    };

    setTimeout(() => {


      this.platform.ready().then(() => {


      });

    },2000);

    //
  }


  ionViewDidEnter(){
    this.imServe.currentLinkMan = this.params.data.userId;
    /*删除当前*/
  }
  ionViewDidLeave(){
    this.imServe.currentLinkMan = "";
  }
  ionViewWillLeave(){
    this.imServe.imTextMessageInner = () => {};
  }

  ngAfterViewInit() {

    this.chatView.me = this.imServe.me;
    this.chatView.listOfChatData = this.listOfChatData;
  }

  //解决刚进入时有很多聊天记录
  ionViewWillEnter(){
    setTimeout(() => {
      this.content.scrollToBottom();
    },50)
  }

  /*进行列表优化*/
  trackById(index,item){
    return item.id;
  }

  sendMsg(msgInput) {


    let success = false;
    let load = this.warn.loading("发送中");

    let msg = msgInput.value;
    let ext = {
      "nickname":this.userService.user.nickname,
      "photo": this.userService.user.userExt.photo || "",
      "nicknameOther": this.params.data.nickname,
      "photoOther": this.params.data.photo || ""
    };

    this.imServe.sendTextMsg(msg,this.params.data.userId,ext, (id, serverMsgId) => {

      load.dismiss();
      success = true;
      this.imServe.handleToMsg(msg,this.params.data.userId,ext);
      msgInput.value = "";
    });

    // setTimeout(() => {
    //
    //   this.content.scrollToBottom();
    //
    // },200)
    setTimeout(() => {

      if(!success){
        load.dismiss();
        this.warn.toast('发送失败');
      }

    },10000);

  }

  doFocus($event){
    setTimeout(()=>{
      window.scrollTo(0, 1000);
    }, 1);
  }

}//类的结尾

