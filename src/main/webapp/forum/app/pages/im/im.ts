import {Component, AfterViewInit} from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import {ChatRoomPage } from './chat-room';

import { LocalNotifications, Badge, Keyboard} from 'ionic-native';

import {IMService} from "../../serve/im.serve";
import {WarnService} from "../../serve/warn.serve";
import {UserService} from "../../serve/user.serve";
import {UserAccountService} from "../../serve/user-account.serve";

@Component({
  templateUrl: 'build/pages/im/im.html'
})
export class ImPage implements AfterViewInit{

  url = "http://121.43.101.148:8065/im.html?tenantId=26192&restServer=a1.easemob.com&appKey=xiongniu-123%23chatapp&user=14444444443&to=13333333333&ticket=false&hideKeyboard=true"

  constructor(private navCtrl: NavController,
              public  imServe: IMService,
              private warn: WarnService,
              private userServe: UserAccountService) {

    console.log("im被创建了");

  }
  //

  ngAfterViewInit() {

    //登陆环信
    this.imServe.login(this.userServe.userName,
      this.userServe.password);

    this.imServe.onTextMessage = (msg) => {
      Badge.increase(1);
    };

    this.imServe.onPresence = (msg) => {

      if ( msg.type === 'subscribe' ) {
        this.warn.alertWithCanale(`${msg.from}`+"要添加你为好友", () => {

          this.imServe.conn.subscribed({
            to: msg.from,
            message : "[resp:true]"
          });
          this.imServe.conn.subscribe({//需要反向添加对方好友
            to: msg.from,
            message : "[resp:true]"
          });

        });
      }
    }
    setTimeout(() => {
      Keyboard.disableScroll(false);
    },2000);

  }

  goChatRoom(from: string){
    console.log(from);
    this.navCtrl.push(ChatRoomPage,from);
  }


  imClose(){
    console.log(this.navCtrl.parent);
    let tabs: Tabs =  this.navCtrl.parent;
    let tab1 = tabs.getByIndex(0);
    tab1.tabBadge = "···";
    console.log(this.navCtrl.parent);
    this.imServe.close();
  }

  addFriend(friendName){
    this.imServe.addFriend(friendName,`我是${this.imServe.me}`);
  }

  getFriendList(){
    this.imServe.getFriendList();
  }
  sendMsg(){

    // this.im.·Serve.addFriend('tianlei004','me');
    console.log('发送通知之前');
    LocalNotifications.schedule({
      id:1,
      title:'通知测试',
      text: '1211',
      at: new Date()
    });

    Badge.set(10);

    LocalNotifications.on("click", () => {
      console.log('通知被点击了');
    });

    this.imServe.handleToMsg('serve:我要发信息','tianlei003');
    this.imServe.sendTextMsg('serve:我要发信息','tianlei003',(id, serverMsgId) => {
      console.log('发送成功'+ id +'----'+ serverMsgId);
    });
  }
}
