import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController, Platform, InfiniteScroll, NavParams,Refresher} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {IMService} from "../../../services/im.service";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "./editDetail";
import {ContentPage} from "../../forum/content/content";
import {ChatRoomPage} from "../../mine/im/chat-room";
import {PageDataService} from "../../headline/page-data.services";


@Component({
  templateUrl: 'detail.html',
  providers: [PageDataService]
})
export class MineDetailPage implements AfterViewInit{

  src:string = 'assets/images/marty-avatar.png';

  items = [];
  start: number;
  limit: number;
  appendCount = 0;

  toUserId = "";
  isMe = true;
  totalCount = 0;
  watchTz = false;
  followCount: number = 0;
  followFlag:boolean = false;
  user;

  @ViewChild(InfiniteScroll)  loadMoreComp:  InfiniteScroll;
  @ViewChild(Refresher)  refreshComp:  Refresher;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public warnCtrl: WarnService,
              public params: NavParams,
              public http: HttpService,
              public pageDataService: PageDataService) {

      /*@是根据    用户名称进行    查找*/
      this.toUserId = params.data.publisher || params.data.userId || userService.userId;
      this.watchTz = params.data.tz || false;

      this.isMe = this.toUserId == userService.userId ? true : false;



      if (!this.isMe) {
          this.http.get("/user",{"userId":this.toUserId}).then(res => {

            this.user = res.data;

          }).catch(error => {

          });

          userService.queryFollowUsers().then(()=> {
              let fUs = this.userService.followUsers;
              for (let f of fUs) {

                  if (this.toUserId == f.userId) {
                      this.followFlag = true;
                      break;
                  }
              }
          });

      } else {
          this.user = this.userService.user;

      }

  }

  ngAfterViewInit(){

      /*数据配置*/
      this.pageDataService.url = "/post/page";
      this.pageDataService.reqObj = {
          "publisher": this.toUserId,
          "status" : "1"
      };
      this.pageDataService.refreshComp = this.refreshComp;
      this.pageDataService.loadMoreComp = this.loadMoreComp;

      /*获取帖子数据 自动刷新*/
      this.refreshComp._beginRefresh();

  }

  getUserInfo(){
    this.http.get('/user').then((res) => {
      let userExt = res.data.userExt;
      // this.src = userExt && userExt.src || "images/marty-avatar.png";
      document.getElementById("nickName").innerText = res.data.nickname || res.data.mobile;
      document.getElementById("introduce").innerText = userExt.introduce || "还没有个人介绍哦";
    }).catch((error) => {
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }

  // queryPostPage(event?, refresh?){
  //     return this.http.get('/post/page',{
  //         "start": this.start,
  //         "limit": this.limit,
  //         "userId": this.toUserId
  //       })
  //       .then((res) => {
  //           if(res.success){
  //               this.totalCount = res.data.totalCount;
  //               let list = res.data.list;
  //               let i = 0;
  //               if(refresh){
  //                   this.items = [];
  //               }
  //               for(i = 0; i < list.length; i++){
  //                   if(list[i].pic != null){
  //                       list[i].pic = list[i].pic.split(/\|\|/);
  //                   }
  //                   //list[i].publishDatetime = this.jsDateDiff( new Date(list[i].publishDatetime).getTime()/1000 );
  //                   list[i].collectCount = 0;   //点击收藏次数
  //                   list[i].praiseCount = 0;    //点击点赞次数
  //                   this.items.push(list[i]);
  //               }
  //               if(i > 0){
  //                   this.start++;
  //               }
  //           }
  //           event && event.complete();
  //           if(this.watchTz){
  //               document.getElementById("totalTZ").scrollIntoView();
  //           }
  //       }).catch(error => {
  //           if(this.watchTz){
  //               document.getElementById("totalTZ").scrollIntoView();
  //           }
  //           event && event.complete();
  //       });
  // }
   //关注

  follow(){
      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/follow',{
                "toUser": this.toUserId
            })
            .then((res) => {
                this.followCount = 0;
                if(res.success){
                    this.followFlag = true;
                }else{
                    this.warnCtrl.toast("关注失败，请稍后重试!");
                }
            }).catch(error => {
                this.followCount = 0;
                this.warnCtrl.toast("关注失败，请稍后重试!");
            });
      }
  }

  //取消关注
  unfollow(){
      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/unfollow',{
                "toUser": this.toUserId
                })
                .then((res) => {
                    this.followCount = 0;
                    if(res.success){
                        this.followFlag = false;
                    }else{
                        this.warnCtrl.toast("取消关注失败，请稍后重试!");
                    }
                }).catch(error => {
                    this.followCount = 0;
                    this.warnCtrl.toast("取消关注失败，请稍后重试!");
                });
      }
  }

  doRefresh(event){

     this.pageDataService.refresh();
  }

  doAppendData(event){
     this.pageDataService.loadMore();

  }


  /*聊天*/
  goChat(){

    this.navCtrl.push(ChatRoomPage, this.user);
  }


  goDetail(toId){
    this.navCtrl.push(MineDetailPage, {toUserId: toId});
  }

  //打开帖子详情页
  openPage($event){
      this.navCtrl.push(ContentPage,$event);
  }

  /*自己，进行信息编辑*/
  doEdit(){
      this.navCtrl.push(EditDetailPage);
  }

}
