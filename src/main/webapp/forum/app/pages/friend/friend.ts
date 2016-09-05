import {Component} from '@angular/core';
import {NavController, Button} from 'ionic-angular';
import {IMService} from "../../serve/im.serve";
import {ChatRoomPage} from "../im/chat-room";
import {AddFriendPage} from "./addFriend";


@Component({
  templateUrl: 'build/pages/friend/friend.html'
})
export class FriendPage {
  constructor(private navCtrl: NavController,
              private imServe: IMService) {

  }

  goChat(friendName){
    this.navCtrl.push(ChatRoomPage,friendName);

  }
  searchAction(){
    console.log("搜索了");
  }

  lookFriendAsk(){
    this.navCtrl.push(AddFriendPage);
  }

  addFriend(){
    this.navCtrl.push(AddFriendPage,"search");
  }
  deleteFriend(friend){
   let a = 1;
  }

}
