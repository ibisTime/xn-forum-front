/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController,ViewController, InfiniteScroll, Scroll, Content, Tab,Tabs} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {KefuService} from "../../services/kefu.serve";
import {Satisfaction} from "./satisfaction";
import {UserService} from "../../services/user.services";
import {HttpService} from "../../services/http.service";
import {ChatViewComponent} from "../../components/chat-view/chat.component";


@Component({
    templateUrl: 'build/pages/kefu/kefu.html',
    directives: [ChatViewComponent]
    // styleUrls: ['app/pages/contact/css/base.css']
})
export class KefuPage implements AfterViewInit {

  inputValue;
  isMine = true;
  listOfChatData;
  private satisfaction;
  private timer_top;
  private timer_bottom;
  private isActive = false;


  @ViewChild(Content) content: Content;
  @ViewChild(ChatViewComponent) chatView: ChatViewComponent;

  constructor(private  nav: NavController,
              private imServe: KefuService,
              private uServe: UserService,
              private ajax: HttpService) {
    this.listOfChatData = this.imServe.getDataByFromName();
    this.satisfaction = new Satisfaction(this.imServe);
    this.imServe.scroll_bottom = ()=>{
      this.scrollBottom();
    }
    this.imServe.scroll_top = ()=>{
      this.scrollTop();
    }
  }

  ngAfterViewInit() {
    this.chatView.me = this.imServe.me;
    this.chatView.listOfChatData = this.listOfChatData;
    this.imServe.getHistory();

  }

  sendMsg(value) {
    this.imServe.handleToMsg(value);
    this.imServe.sendTextMsg(value, (id, serverMsgId) => {
    }, "");
    this.inputValue = "";
  }
  cancelSatis(){
    this.satisfaction.doCancelSatis();
  }
  submitSatis(){
    this.satisfaction.doSubmitSatis();
  }

  ionViewDidEnter(){
    this.imServe.totalMsg = 0;
    this.scrollBottom();
    this.isActive = true;
  }
  ionViewDidLeave(){
    this.imServe.totalMsg = 0;
    this.isActive = false;
  }
  doRefresh(event){
    this.imServe.getHistory(event);
  }
  scrollBottom() {
      if(!this.isActive){
          let tab =  this.nav.parent.getByIndex(2);
          tab.tabBadge = this.imServe.totalMsg && `${this.imServe.totalMsg}` || null;
      }
      if(this.timer_bottom){
          clearTimeout(this.timer_bottom);
      }
      this.timer_bottom = setTimeout(()=>{
          this.content.scrollToBottom();
      }, 200);
  }
  scrollTop() {
      if(this.timer_top){
          clearTimeout(this.timer_top);
      }
      this.timer_top = setTimeout(()=>{
          this.content.scrollToTop();
      }, 200);
  }
  doCaidan(item){
    this.imServe.handleToMsg(item.name);
    this.imServe.sendTextMsg(item.name, (id, serverMsgId) => {
    }, {choice: { menuid: item.id }});

  }

  doPingjia(item){
    this.satisfaction.initArgs();
    this.satisfaction.doPingjia(item.inviteId, item.serviceSessionId);

  }
}//类的结尾