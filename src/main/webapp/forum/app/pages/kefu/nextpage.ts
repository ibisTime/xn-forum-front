/**
 * Created by tianlei on 16/8/24.
 */
import {Component, OnInit, ViewChild, QueryList, ElementRef, AfterViewInit} from '@angular/core';
import { NgFor } from '@angular/common';

import {NavController, InfiniteScroll, Scroll, Content} from 'ionic-angular'
import { Keyboard } from 'ionic-native';
import {KefuService} from "../../serve/kefu.serve";
import {Satisfaction} from "./satisfaction";
import {UserService} from "../../serve/user.serve";


@Component({
    templateUrl: 'build/pages/kefu/nextpage.html'
    // styleUrls: ['app/pages/contact/css/base.css']
})
export class NextPage implements AfterViewInit {

  inputValue;
  isMine = true;
  listOfChatData;
  private satisfaction;
  private scbT = 0;


  @ViewChild(Content) content: Content;

  constructor(private  nav: NavController,
              private imServe: KefuService,
              private uServe: UserService) {
     
    


    //console.log(params.data);
    this.listOfChatData = this.imServe.getDataByFromName();
    this.satisfaction = new Satisfaction(this.imServe);
  }

  ngAfterViewInit() {
    //2.登陆
    //this.imServe.login('tianlei009',"123456");
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
  scrollBottom( wait ) {
      var ocw = document.getElementById("imCont");

      wait 
      ? (clearTimeout(this.scbT), this.scbT = setTimeout(function () {
          ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000;
      }, wait))
      : (ocw.scrollTop = ocw.scrollHeight - ocw.offsetHeight + 10000);
  }
}//类的结尾
