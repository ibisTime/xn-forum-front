import {Component, AfterViewInit} from '@angular/core';
import { NavController, App, Tabs } from 'ionic-angular';
import {ChatRoomPage } from './chatRoom';

import { LocalNotifications, Badge} from 'ionic-native';

import {IMService} from "../../serve/im.serve";

@Component({
  templateUrl: 'build/pages/im/im.html'
})
export class ImPage implements AfterViewInit{

  //
  constructor(private navCtrl: NavController,
              public  imServe: IMService) {
  }
  //
  url = "http://121.43.101.148:8065/im.html?tenantId=26192&restServer=a1.easemob.com&appKey=xiongniu-123%23chatapp&user=14444444443&to=13333333333&ticket=false&hideKeyboard=true"
  ngAfterViewInit() {
    //2.登陆
    this.imServe.onTextMessage = (msg) => {

      this.imServe.handleFromMsg(msg);
      Badge.increase(1);

    };
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
