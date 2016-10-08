import {Component, AfterViewInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChatRoomPage } from './chat-room';

import {IMService} from "../../../services/im.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {FriendPage} from "../friend/friend";

@Component({
  templateUrl: 'im.html'
})
export class ImPage implements AfterViewInit{

  func3 = [
    {"name":"提到我的","src":"../../images/mine/mine-msg-@.png"},
    {"name":"评论","src":"../../images/mine/mine-msg-comment.png"},
    {"name":"系统消息","src":"../../images/mine/mine-msg-system-msg.png"},
  ];

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

  getFriendList(){
    // this.imServe.getFriendList();
  }

  addFriend(){
    this.navCtrl.push(FriendPage);
  }


}
