/**
 * Created by tianlei on 16/8/24.
 */
import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController,Content, TextInput} from 'ionic-angular'
import {KefuService} from "../../services/kefu.serve";
import {Satisfaction} from "./satisfaction";
import {CityService} from "../../services/city.service";
import {ChatViewComponent} from "../../components/chat-view/chat.component";
import {IFramePage} from "../headline/iframe";
import {UserService} from "../../services/user.service";
import {LoginPage} from "../user/login";
import {NavService} from "../../services/nav.service";

@Component({
    templateUrl: 'kefu.html'
})
export class KefuPage implements AfterViewInit {

  inputValue;
  isMine = true;
  listOfChatData;
  public satisfaction;
  public timer_top;
  public timer_bottom;
  public isActive = false;

  @ViewChild(Content) content: Content;
  @ViewChild(ChatViewComponent) chatView: ChatViewComponent;
  @ViewChild(TextInput) msgPut: any;

  constructor(public  nav: NavController,
              public imServe: KefuService,
              public cityServe: CityService,
              public userService: UserService,
              public navService: NavService) {
    this.listOfChatData = this.imServe.getDataByFromName();
    this.satisfaction = new Satisfaction(this.imServe);
    this.imServe.scroll_bottom = ()=>{
      this.scrollBottom();
    }
    this.imServe.scroll_top = ()=>{
      this.scrollTop();
    }
    //kefuData
  }

  ngAfterViewInit() {
    this.chatView.me = this.imServe.me;
    this.chatView.listOfChatData = this.listOfChatData;
    let data = {
      from: this.imServe.me + "1",  //不等于me就可以了
      cityData: this.cityServe.kefuData,
      type: "yliu"
    }
    this.imServe.getCompanyWelcome(data) ;
  }

  doFocus(e){
      setTimeout(()=>{
          window.scrollTo(0, 1000);
      }, 1);
  }

  sendMsg(value) {

      if(!this.userService.user){
          this.nav.push(LoginPage);
          return;
      }
    //this.msgPut.setFocus();
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

  goIframe(item){
      this.navService.transition(item.url,item.title);
  }
}//类的结尾
