/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList,
         ElementRef,Renderer,OnChanges,
  AfterViewChecked} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController,Toolbar, Content, NavParams, TextInput, Platform, ViewController, Refresher} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {IMService} from "../../serve/im.service";
import {AfterViewInit} from "@angular/core";
import { Observable }  from 'rxjs/Observable'
import {ChatViewComponent} from "../../components/chat-view/chat.component";


@Component({
  templateUrl: 'build/pages/im/chat-room.html',
  directives: [ChatViewComponent]
})
export class ChatRoomPage implements AfterViewInit {

  inputValue;
  listOfChatData;
  disable = false;
  placeholderView = false;
  heightValue = "none";
  height;

  bottom="250px";

  @ViewChild(Content) content: Content;
  @ViewChild(TextInput) msgPut: any;
  @ViewChild(ChatViewComponent) chatView: ChatViewComponent;

  constructor(private  nav: NavController,
              private imServe: IMService,
              private params: NavParams,
              private platform: Platform
              ) {

    /*通过聊天人获取数据*/
    this.listOfChatData = this.imServe.getDataByFromName( params.data);

    //1.哪到导航数据就去获取信息
    this.imServe.imTextMessageInner = msg => {
      setTimeout(() => {
        this.content.scrollToBottom();
      },300)
    };

    setTimeout(() => {


      this.platform.ready().then(() => {

        Keyboard.onKeyboardShow().subscribe((msg) => {
          this.heightValue = "block";

          setTimeout(() => {
            console.log(msg);
            this.content.scrollToBottom();

            if(this.platform.is('ios')){
              // let h = this.platform.height();
              // let elem:any = document.getElementsByClassName('show-page')[0];
              // if(elem.style.height == "100%"){
              //   console.log(msg.keyboardHeight);
              //   let ro = 1 -  msg.keyboardHeight/h;
              //   elem.style.height = `${ro*100}%`;
              //   console.log('键盘上来了');
              // }
              // this.bottom = '250px';
              // document.getElementById('tianleiInput').style.bottom = "226px";
            }

          },100)
        });

        Keyboard.onKeyboardHide().subscribe(() => {
          this.placeholderView = false;
          this.heightValue = "none";
          setTimeout(() => {
            this.content.scrollToBottom();

            // if(this.platform.is('ios')){
            //   let elem:any = document.getElementsByClassName('show-page')[0];
            //   elem.style.height = "100%";
            // }
            // this.bottom = '250px';
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

    this.msgPut.setFocus();
    this.imServe.handleToMsg(msgInput.value,this.params.data);
    this.imServe.sendTextMsg(msgInput.value,this.params.data, (id, serverMsgId) => {

      msgInput.value = "";
      this.msgPut.setFocus();

    });

    setTimeout(() => {
      this.content.scrollToBottom();
    },200)

  }

}//类的结尾

