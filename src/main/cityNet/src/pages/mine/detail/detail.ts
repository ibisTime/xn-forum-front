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
  isMe = false;
  totalCount = 0;
  // watchTz = false;
  followCount: number = 0;
  followFlag:boolean = false;
  user;

  totalPostNum = "0";

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

              this.getUserInfoButMe();



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
              this.totalPostNum = this.userService.user.totalFansNum;
          }

          this.http.get("/post/total",{"userId":this.toUserId,"status": this.isMe ?"NO_A" : "BD" }).then(res => {

              this.totalPostNum = res.data.totalPostNum;

          }).catch(error => {

          });

      } else {//////////////

          //2.还没有登录
          this.toUserId = params.data.publisher || params.data.userId;

          this.getUserInfoButMe();

          this.http.get("/post/total",{"userId":this.toUserId,"status":"BD"}).then(res => {

              this.totalPostNum = res.data.totalPostNum;

          }).catch(error => {

          });

      }

  }


  getUserInfoButMe(){

      this.http.get("/user/info",{"userId":this.toUserId}).then(res => {

          this.user = res.data;

      }).catch(error => {

      });

  }


  ngAfterViewInit(){

      /*数据配置*/
      this.pageDataService.url = "/post/page";
      this.pageDataService.reqObj = {
          "publisher": this.toUserId,
          "status" : this.isMe ? "NO_A" :"BD"
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
            }).then((res) => {

                //关注陈功粉丝加  1
                this.user.totalFansNum = `${(+this.user.totalFansNum) + 1}`;

                this.followCount = 0;
                this.followFlag = true;

            }).catch(error => {
                this.followCount = 0;
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
                }).then((res) => {

                this.user.totalFansNum = `${(+this.user.totalFansNum) - 1}`;

                    this.followCount = 0;
                    this.followFlag = false;

                }).catch(error => {
                    this.followCount = 0;
                });
      }
  }

  doRefresh(){

     this.pageDataService.refresh();
     this.getUserInfoButMe();
  }

  doAppendData(){
     this.pageDataService.loadMore();

  }


  /*聊天*/
  goChat(){


      if(!this.userService.user){

          this.navCtrl.push(LoginPage);
          return;
      }

      let user = {

          "userId": this.user.userId,
          "nickname": this.user.nickname,
          "photo": this.user.userExt.photo || ""

      };

      this.navCtrl.push(ChatRoomPage, user);

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
