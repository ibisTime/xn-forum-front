/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList,
         ElementRef,Renderer,OnChanges,
  AfterViewChecked} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController,Toolbar, Content, NavParams, TextInput, Platform, ViewController} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {IMService} from "../../serve/im.serve";
import {AfterViewInit} from "@angular/core";
import { Observable }  from 'rxjs/Observable'


@Component({
  templateUrl: 'build/pages/im/chat-room.html'
})
export class ChatRoomPage implements AfterViewInit , OnChanges{

  inputValue;
  listOfChatData;
  disable = false;
  placeholderView = false;
  heightValue = "none";
  height;

  @ViewChild(Content) content: Content;
  @ViewChild(TextInput) msgPut: any;

  constructor(private  nav: NavController,
              private imServe: IMService,
              private params: NavParams,
              private platform: Platform,
              private vc: ViewController
              ) {

    console.log(params.data);
    this.listOfChatData = this.imServe.getDataByFromName(params.data);

    console.log('检测到平台');
    console.log(this.platform.height(),this.platform.width());

    //1.哪到导航数据就去获取信息
    this.imServe.onTextMessageInner = msg => {
      setTimeout(() => {
        this.content.scrollToBottom();
      },300)
    };

    setTimeout(() => {

      console.log('你们好');
      // this.platform.ready().then((msg) => {
      //   Keyboard.disableScroll(false);
      // });
      this.platform.ready().then(() => {

        Keyboard.onKeyboardShow().subscribe((msg) => {

          // document.body.clientHeight - msg.keyboardHeight
          // this.placeholderView = true;
          this.heightValue = "block";
          setTimeout(() => {

            this.content.scrollToBottom();
            console.log('键盘上来了');
          },100)
        });

        Keyboard.onKeyboardHide().subscribe(() => {
          this.placeholderView = false;
          this.heightValue = "none";
          setTimeout(() => {
            this.content.scrollToBottom();
            console.log('键盘下去了');
          },100)
        });

      });

    },2000);

    //

  }

  ngOnChanges(){
    console.log('绑定改变');
  }


  ngAfterViewInit() {

  }

  //解决刚进入时有很多聊天记录
  ionViewWillEnter(){
    setTimeout(() => {
      this.content.scrollToBottom();
    },50)
  }

  sendMsg(msgInput) {

    // this.msgPut.setFocus();

    this.imServe.handleToMsg(msgInput.value,this.params.data);
    this.imServe.sendTextMsg(msgInput.value,this.params.data, (id, serverMsgId) => {
      msgInput.value = "";

    });

    setTimeout(() => {
      this.content.scrollToBottom();
    },200)

  }

}//类的结尾

