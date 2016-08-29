/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList, ElementRef} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController, InfiniteScroll, Scroll, Content, NavParams, TextInput} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {IMService} from "../../serve/im.serve";
// import {ReleaseServe} from "../serve/Release.serve";


@Component({
  templateUrl: 'build/pages/im/chatRoom.html'
  // styleUrls: ['app/pages/contact/css/base.css']
})
export class ChatRoomPage implements OnInit {

  inputValue;
  isMine = true;
  listOfChatData;
  disable = false;

  @ViewChild(Content) content: Content;
  @ViewChild('bootomInput') msgPut: any;

  constructor(private  nav: NavController,
              private imServe: IMService,
              private params: NavParams) {

    console.log(params.data);
    this.listOfChatData = this.imServe.getDataByFromName(params.data);
    //1.哪到导航数据就去获取信息
    this.imServe.onTextMessageInner = msg => {
      setTimeout(() => {
        this.content.scrollToBottom();
      },300)
    };

    setTimeout(() => {
      Keyboard.disableScroll(false);
    },2000)

  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    setTimeout(() => {
      this.content.scrollToBottom();
    },50)
  }

  sendMsg(msgInput) {

    this.imServe.handleToMsg(msgInput.value,this.params.data);
    this.imServe.sendTextMsg(msgInput.value,this.params.data, (id, serverMsgId) => {
      msgInput.value = "";
    });
    setTimeout(() => {
      this.content.scrollToBottom();
    },200)


  }

}//类的结尾

