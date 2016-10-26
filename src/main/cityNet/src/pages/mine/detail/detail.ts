import {Component, ViewChild, AfterViewInit} from '@angular/core';
import {NavController, Platform, InfiniteScroll, NavParams,Refresher} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "./editDetail";
import {ChatRoomPage} from "../../mine/im/chat-room";
import {PageDataService} from "../../headline/page-data.services";
import {LoginPage} from "../../user/login";


@Component({
  templateUrl: 'detail.html',
  providers: [PageDataService]
})
export class MineDetailPage implements AfterViewInit{

  src:string = 'assets/images/marty-avatar.png';

  items = [];
  // start: number;
  // limit: number;
  // appendCount = 0;

  toUserId = "";
  isMe = true;
  totalCount = 0;
  // watchTz = false;
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
              public pageDataService: PageDataService,
              public warn: WarnService) {

      /*@是根据    用户名称进行    查找*/
      //  a.从帖子界面进入    b.从搜索页面进入
      if(userService.user){///////////////
          //1.已经登陆
          this.toUserId = params.data.publisher || params.data.userId ;
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

      } else {//////////////

          //2.还没有登录
          this.toUserId = params.data.publisher || params.data.userId;
          this.http.get("/user",{"userId":this.toUserId}).then(res => {

              this.user = res.data;

          }).catch(error => {

          });

      }







  }

  ngAfterViewInit(){

      /*数据配置*/
      this.pageDataService.url = "/post/page";
      this.pageDataService.reqObj = {
          "publisher": this.toUserId,
          "status" : "BD"
      };
      this.pageDataService.refreshComp = this.refreshComp;
      this.pageDataService.loadMoreComp = this.loadMoreComp;

      /*获取帖子数据 自动刷新*/
      // this.refreshComp._beginRefresh();
      this.doRefresh();

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


  follow(){

      if(!this.userService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

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

      if(!this.userService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

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

  doRefresh(){

     this.pageDataService.refresh();
  }

  doAppendData(){
     this.pageDataService.loadMore();

  }


  /*聊天*/
  goChat(){

      if(this.userService.user){
          this.navCtrl.push(ChatRoomPage, this.user);
      } else {
          this.navCtrl.push(LoginPage);
      }

  }


  // goDetail(toId){
  //
  //   this.navCtrl.push(MineDetailPage, {toUserId: toId});
  // }

  // //打开帖子详情页
  // openPage($event){
  //     this.navCtrl.push(ContentPage,$event);
  // }

  /*自己，进行信息编辑*/
  doEdit(){
      this.navCtrl.push(EditDetailPage);
  }

}
