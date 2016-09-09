import {Component, AfterViewInit} from '@angular/core';
import {NavController, Tabs} from 'ionic-angular';
import {IMService} from "../../serve/im.service";
import {ChatRoomPage} from "../im/chat-room";
import {AddFriendPage} from "./addFriend";
import {WarnService} from "../../serve/warn.service";
import { Observable }  from 'rxjs/Observable'

@Component({
  templateUrl: 'build/pages/friend/friend.html'
})
export class FriendPage implements AfterViewInit{

  constructor(private navCtrl: NavController,
              private imServe: IMService,
              private warnServe: WarnService) {

  }

  ngAfterViewInit(){

    setTimeout(()=>{

      let tab =  this.navCtrl.parent.getSelected();
      tab.tabBadge = null;
      // tab.tabBadgeStyle = "danger";
      // tab.tabBadge = this.imServe.listOfFutureFriend.length;
      // tab.tabBadge = " ";
    },50);

  }

  goChat(friendName){
    this.navCtrl.push(ChatRoomPage,friendName);

  }
  searchAction(){
    console.log("搜索了");
  }

  lookFriendAsk(){

    let tab =  this.navCtrl.parent.getSelected();
    tab.tabBadge = null;
    this.navCtrl.push(AddFriendPage);

  }

  addFriend(){
    this.navCtrl.push(AddFriendPage,"search");
  }

  deleteFriend(friend){

   this.imServe.deleteFriend(friend).then(() => {
     this.warnServe.toast("删除成功");
   }).catch( (error) => {
     this.warnServe.toast("删除失败");
   });
  }

}
