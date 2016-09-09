/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController,ViewController, InfiniteScroll, Scroll, Content, Tab,Tabs} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {KefuService} from "../../serve/kefu.serve";
import {Satisfaction} from "./satisfaction";
import {UserService} from "../../serve/user.serve";
import {HttpService} from "../../serve/http.service";


@Component({
    templateUrl: 'build/pages/kefu/nextpage.html'
    // styleUrls: ['app/pages/contact/css/base.css']
})
export class NextPage implements AfterViewInit {

  inputValue;
  isMine = true;
  listOfChatData;
  private satisfaction;
  private timer;
  private isActive = false;


  @ViewChild(Content) content: Content;

  constructor(private  nav: NavController,
              private imServe: KefuService,
              private uServe: UserService,
              private ajax: HttpService) {
    this.listOfChatData = this.imServe.getDataByFromName();
    this.satisfaction = new Satisfaction(this.imServe);
    this.imServe.scroll_bottom = ()=>{
      this.scrollBottom();
    } 
  }

  ngAfterViewInit() {
    //2.登陆
    //this.imServe.login('tianlei009',"123456");
    this.imServe.getHistory();
  }

  sendMsg(value) {

    this.imServe.handleToMsg(value);
    this.imServe.sendTextMsg(value, (id, serverMsgId) => {
    }, "");
  }
  doCaidan(id, name){
      this.imServe.handleToMsg(name);
      this.imServe.sendTextMsg(name, (id, serverMsgId) => {
      }, {choice: { menuid: id }});
  }
  doPingjia(inviteId, serviceSessionId){
    this.satisfaction.initArgs();
    this.satisfaction.doPingjia(inviteId, serviceSessionId);
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
    this.imServe.getHistory();
  }
  scrollBottom() {
      if(!this.isActive){
          let tab =  this.nav.parent.getByIndex(2);
          tab.tabBadge = this.imServe.totalMsg && `${this.imServe.totalMsg}` || null;
      }
      if(this.timer){
          clearTimeout(this.timer);
      }
      this.timer = setTimeout(()=>{
          this.content.scrollToBottom();
      }, 200);
  }
}//类的结尾
