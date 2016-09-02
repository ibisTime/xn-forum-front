/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList, ElementRef} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController, InfiniteScroll, Scroll, Content, NavParams} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {KefuService} from "../../serve/kefu.serve";
import {Satisfaction} from "./satisfaction";


@Component({
    templateUrl: 'build/pages/kefu/nextpage.html'
    // styleUrls: ['app/pages/contact/css/base.css']
})
export class NextPage implements OnInit {

  inputValue;
  isMine = true;
  listOfChatData;
  private satisfaction;
  private scbT = 0;


  @ViewChild(Content) content: Content;

  constructor(private  nav: NavController,
              private imServe: KefuService,
              private params: NavParams) {

    console.log(params.data);
    this.listOfChatData = this.imServe.getDataByFromName(params.data);
    //1.哪到导航数据就去获取信息
    this.imServe.onTextMessageInner = msg => {
      console.log('内部收到信息');
    };
    this.satisfaction = new Satisfaction(this.imServe);
  }

  ngOnInit() {

  }

  sendMsg(value) {

    this.imServe.handleToMsg(value,this.params.data);
    this.imServe.sendTextMsg(value,this.params.data, (id, serverMsgId) => {
    }, "");
  }
  doCaidan(id, name){
      this.imServe.handleToMsg(name,this.params.data);
      this.imServe.sendTextMsg(name,this.params.data, (id, serverMsgId) => {
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
  scrollBottom( wait ) {
      var ocw = document.getElementById("imCont");

      wait 
      ? (clearTimeout(this.scbT), this.scbT = setTimeout(function () {
          ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000;
      }, wait))
      : (ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000);
  }
}//类的结尾
