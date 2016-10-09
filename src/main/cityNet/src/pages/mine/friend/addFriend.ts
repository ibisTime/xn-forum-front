import {Component} from '@angular/core';
import {NavController,Item, AlertController, ViewController, NavParams} from 'ionic-angular';
import {IMService} from "../../../services/im.service";
import {ChatRoomPage} from "../im/chat-room";
import {WarnService} from "../../../services/warn.service";


@Component({
  templateUrl: 'addFriend.html'
})
export class AddFriendPage {

  /*搜索好友时,优化设置*/
  showFriend = false;

  friendName: string;
  compareTitle = "新的朋友";
  title = "添加好友";

  constructor(public navCtrl: NavController,
              public imServe: IMService,
              public alertCtrl: AlertController,
              public warn: WarnService,
              public vc: ViewController,
              public navParas: NavParams) {

    if (this.navParas.data == "search") {

    } else {
      this.title = this.compareTitle;
    }

  }

  goChat(friendName) {
    this.navCtrl.push(ChatRoomPage, friendName);
  }

  beginSearch() {
    if (this.showFriend == true) {
      this.showFriend = false;
    }
  }

  searchAction(target) {

    if (target.value.length > 0 && target.value != this.imServe.me) {
      this.friendName = target.value;
      this.showFriend = true;
      target.value = this.friendName;
    }

  }

  addFriend() {

    let alert = this.alertCtrl.create({
      title: '对他说点什么',
      inputs: [
        {
          name: 'content',
          placeholder: `我是${this.imServe.me}`
        },
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确认',
          handler: data => {

            let content = `我是${this.imServe.me}`;
            if (data["content"].length > 0) {
              content = data.content;
            }
            this.imServe.addFriend(this.friendName, content);
            this.warn.toast("发送成功");

          }
        }
      ]
    });
    alert.present();

  }

  /*接受朋友的请求*/
  accept(friendName) {
    this.warn.toast("接受好友成功");
    this.remove(friendName);
    this.imServe.accept(friendName)
  }

  /*拒绝一个朋友的请求*/
  rejectFriend(friendName) {
    this.remove(friendName);
    this.imServe.conn.unsubscribed({
      to: friendName,
      message : `${this.imServe.me}拒绝了你的好友请求`
    });
  }
  /*从准好友列表中移除*/
  remove(friendName){
    let indexAddr;
    this.imServe.listOfFutureFriend.find((value,index,obj) => {

      indexAddr = index;
      return value.from == friendName;

    });

    this.imServe.listOfFutureFriend.splice(indexAddr);
  }
}
