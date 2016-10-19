import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {IMService} from "../../../services/im.service";
import {ChatRoomPage} from "../im/chat-room";
import {AddFriendPage} from "./addFriend";
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {isUndefined} from "ionic-angular/es2015/util/util";
import {UserService} from "../../../services/user.service";

@Component({
  templateUrl: 'friend.html'
})
export class FriendPage implements AfterViewInit {

  users;
  userCopy;
  constructor(public navCtrl: NavController,
              public imServe: IMService,
              public http: HttpService,
              public userService: UserService,
              public warn:WarnService) {
  }


  ngAfterViewInit() {

    setTimeout(()=> {

      let tab = this.navCtrl.parent.getSelected();
      tab.tabBadge = null;
      // tab.tabBadgeStyle = "danger";
      // tab.tabBadge = this.imServe.listOfFutureFriend.length;
      // tab.tabBadge = " ";
    }, 50);

      let obj = {
          "start":"1",
          "limit":"1000"
      }
      let load = this.warn.loading();
      this.http.get('/rs/follows/page',obj).then(res => {

          load.dismiss();
          this.userCopy = res.data.list;

          this.users = this.userCopy;

      }).catch(error => {
          load.dismiss();
      });

  }



  goChat(item) {

    let peo = {
      "userId" : item.userId,
      "nickname" : item.nickname,
      "photo": item.photo
    };
    /**/
    this.navCtrl.push(ChatRoomPage,peo);
  }


  searchAction($event) {

   let value = $event.target.value;


    if(isUndefined(value) || value.length <= 0){
      this.users = this.userCopy;

    } else {
        this.users = [];
        let reg = new RegExp(value);
      this.userCopy.forEach((value,index,array) => {

          if(reg.test(value.nickname)){
              this.users.push(value);
          }

      });


    }

    //
    // console.log($event);
    // let obj = {
    //   "nickname" : value
    // };
    //
    // this.http.get("/user/list",obj).then(res => {
    //
    //
    //   this.users = res.data;
    //   if(this.users.length > 0 && this.users[0].userId == this.userService.userId){
    //     this.users = [];
    //   }
    //
    // }).catch(error => {
    //
    //
    // });
  }



  lookFriendAsk() {

    let tab = this.navCtrl.parent.getSelected();
    tab.tabBadge = null;
    this.navCtrl.push(AddFriendPage);

  }

  // addFriend() {
  //   this.navCtrl.push(AddFriendPage, "search");
  // }
  //
  // deleteFriend(friend) {
  //
  //   this.imServe.deleteFriend(friend).then(() => {
  //     this.warnServe.toast("删除成功");
  //   }).catch((error) => {
  //     this.warnServe.toast("删除失败");
  //   });
  // }

}
