import {Component, AfterViewInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ChatRoomPage } from './chat-room';
import {CommentPage} from "./comment";
import {IMService} from "../../../services/im.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {FriendPage} from "../friend/friend";
import {SystemMsgPage} from "./systemMsg";

@Component({
  templateUrl: 'im.html'
})
export class ImPage implements AfterViewInit{

  func3 = [
    {"name":"提到我的","src":"../../assets/images/mine/mine-msg-@.png"},
    {"name":"评论","src":"../../assets/images/mine/mine-msg-comment.png"},
    {"name":"系统消息","src":"../../assets/images/mine/mine-msg-system-msg.png"},
  ];

  constructor(public navCtrl: NavController,
              public  imServe: IMService,
              public warn: WarnService,
              public userServe: UserService) {

    console.log("im被创建了");

  }

  ngAfterViewInit() {
  }

  goChatRoom(msgItem: any){

    console.log(msgItem);
    let tab =  this.navCtrl.parent.getSelected();
    // let linkMan = msgItem.from == this.imServe.me ? msgItem.to : msgItem.from;

    msgItem.showBadge = false;
    if(this.imServe.msgTotalCount > 0 && msgItem.badgeCount > 0){
      this.imServe.msgTotalCount -= msgItem.badgeCount;
      msgItem.badgeCount = 0;
    }

    tab.tabBadge = (this.imServe.msgTotalCount <= 0) ? null :`${this.imServe.msgTotalCount}`;
    this.navCtrl.push(ChatRoomPage,msgItem);

  }

  getFriendList(){
    // this.imServe.getFriendList();
  }

  searchFriend(){
    this.navCtrl.push(FriendPage);
  }

  goComment(){
    this.navCtrl.push(CommentPage);
  }
  goSystemMsg(){
    this.navCtrl.push(SystemMsgPage);
  }
}
