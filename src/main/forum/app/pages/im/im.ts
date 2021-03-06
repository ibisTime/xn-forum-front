import {Component, AfterViewInit} from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import {ChatRoomPage } from './chat-room';

import { LocalNotifications, Badge} from 'ionic-native';

import {IMService} from "../../serve/im.service";
import {WarnService} from "../../serve/warn.service";
import {UserService} from "../../serve/user.serve";

@Component({
  templateUrl: 'build/pages/im/im.html'
})
export class ImPage implements AfterViewInit{

  url = "http://121.43.101.148:8065/im.html?tenantId=26192&restServer=a1.easemob.com&appKey=xiongniu-123%23chatapp&user=14444444443&to=13333333333&ticket=false&hideKeyboard=true"

  constructor(private navCtrl: NavController,
              public  imServe: IMService,
              private warn: WarnService,
              private userServe: UserService) {

    console.log("im被创建了");

  }

  ngAfterViewInit() {
  }

  goChatRoom(msgItem: any){

    let tab =  this.navCtrl.parent.getSelected();
    // /*从好友列表进入,只能传用户名进入下一级*/
    // if(typeof(msgItem) == "string" ){
    //   this.navCtrl.push(ChatRoomPage,msgItem);
    //   return;
    // }
    let linkMan = msgItem.from == this.imServe.me ? msgItem.to : msgItem.from;

    msgItem.showBadge = false;
    if(this.imServe.msgTotalCount > 0 && msgItem.badgeCount > 0){
      this.imServe.msgTotalCount -= msgItem.badgeCount;
      msgItem.badgeCount = 0;
    }

    tab.tabBadge = (this.imServe.msgTotalCount <= 0) ? null :`${this.imServe.msgTotalCount}`;
    this.navCtrl.push(ChatRoomPage,linkMan);
  }



  addFriend(friendName){
    this.imServe.addFriend(friendName,`我是${this.imServe.me}`);
  }

  getFriendList(){
    this.imServe.getFriendList();
  }


}
