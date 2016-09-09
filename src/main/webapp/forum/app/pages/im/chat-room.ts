/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList,
         ElementRef,Renderer,OnChanges,
  AfterViewChecked} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController,Toolbar, Content, NavParams, TextInput, Platform, ViewController} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {IMService} from "../../serve/im.service";
import {AfterViewInit} from "@angular/core";
import { Observable }  from 'rxjs/Observable'


@Component({
  templateUrl: 'build/pages/im/chat-room.html'
})
export class ChatRoomPage implements AfterViewInit {

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
              private platform: Platform
              ) {

    /*通过聊天人获取数据*/
    this.listOfChatData = this.imServe.getDataByFromName( params.data);

    let peo = {
      name : 'd'
    }
    console.log(typeof(peo),typeof('sdds'));
    //1.哪到导航数据就去获取信息
    // this.imServe.onTextMessageInner = msg => {
    //   setTimeout(() => {
    //     this.content.scrollToBottom();
    //   },300)
    // };

    setTimeout(() => {


      this.platform.ready().then(() => {

        Keyboard.onKeyboardShow().subscribe((msg) => {
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

  ionViewDidEnter(){
    this.imServe.currentLinkMan = this.params.data;
    /*删除当前*/
  }
  ionViewDidLeave(){
    this.imServe.currentLinkMan = "";
  }
  ionViewWillLeave(){
    // this.imServe.onTextMessageInner = () => {};
  }

  ngAfterViewInit() {

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


    this.imServe.handleToMsg(msgInput.value,this.params.data);
    this.imServe.sendTextMsg(msgInput.value,this.params.data, (id, serverMsgId) => {
      msgInput.value = "";
      let s = this.imServe.listOfChatRoomData;

    });

    setTimeout(() => {
      this.content.scrollToBottom();
    },200)

  }

}//类的结尾

