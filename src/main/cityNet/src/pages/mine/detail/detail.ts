import {Component} from '@angular/core';
import {NavController, Platform, App, NavParams} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "./editDetail";
import {ContentPage} from "../../forum/content/content";
import {ChatRoomPage} from "../../mine/im/chat-room";


@Component({
  templateUrl: 'detail.html'
})
export class MineDetailPage {
  src:string = 'images/marty-avatar.png';
  imgHeight: string;
  pHeight: string;
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


  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public params: NavParams,
              public http: HttpService,
              public app :App) {
    this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
    this.pHeight = `${this.platform.height()}px`;
    this.toUserId = params.data.toUserId || userService.userId;
    this.watchTz = params.data.tz || false;
    
    this.isMe = this.toUserId == userService.userId ? true: false;
    this.start = 1;
    this.limit = 10;
    this.getUserInfo();
    this.queryPostPage();
    if(!this.isMe){
          userService.queryFollowUsers().then(()=>{
            let fUs = this.userService.followUsers;
            for(let f of fUs){
                if(this.toUserId == f.userId){
                    this.followFlag = true;
                    break;
                }
            }
          });
    }
  }

  loginOut(){
    this.userService.loginOut();
    this.imService.clearCurrentData();
    this.imService.close();
    this.app.getRootNav().setRoot(LoginPage);

  }
  getUserInfo(){
    this.http.get('/user').then((res) => {
      if(this.watchTz){
          document.getElementById("totalTZ").scrollIntoView();
      }
      let userExt = res.data.userExt;
      this.src = userExt && userExt.src || "images/marty-avatar.png";
      document.getElementById("nickName").innerText = res.data.nickname || res.data.mobile;
      document.getElementById("introduce").innerText = userExt.introduce || "还没有个人介绍哦";
    }).catch((error) => {
      if(this.watchTz){
          document.getElementById("totalTZ").scrollIntoView();
      }
      this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  queryPostPage(event?, refresh?){
      return this.http.get('/post/page',{
          "start": this.start,
          "limit": this.limit,
          "userId": this.toUserId
        })
        .then((res) => {
            if(res.success){
                this.totalCount = res.data.totalCount;
                let list = res.data.list;
                let i = 0;
                if(refresh){
                    this.items = [];
                }
                for(i = 0; i < list.length; i++){
                    if(list[i].pic != null){
                        list[i].pic = list[i].pic.split(/\|\|/);
                    }
                    //list[i].publishDatetime = this.jsDateDiff( new Date(list[i].publishDatetime).getTime()/1000 );
                    list[i].collectCount = 0;   //点击收藏次数
                    list[i].praiseCount = 0;    //点击点赞次数
                    this.items.push(list[i]);
                }
                event && event.complete();
                if(i > 0){
                    this.start++;
                }
            }
        }).catch(error => {
            event && event.complete();
        });
  }
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
                }else if(res.timeout){
                    this.warnCtrl.toast("登录超时，请重新登录!");
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
                    }else if(res.timeout){
                        this.warnCtrl.toast("登录超时，请重新登录!");
                    }else{
                        this.warnCtrl.toast("取消关注失败，请稍后重试!");
                    }
                }).catch(error => {
                    this.followCount = 0;
                    this.warnCtrl.toast("取消关注失败，请稍后重试!");
                });
      }
  }
  //点赞
  praise(code, index, flag?){
      if(!this.items[index].praiseCount){
            this.items[index].praiseCount = 1;
            this.http.post('/post/praise',{
                "type": "1",
                "postCode": code
                })
                .then((res) => {
                    this.items[index].praiseCount = 0;
                    if(res.success){
                        if(!flag){
                            this.items[index].totalDzNum = +this.items[index].totalDzNum + 1;
                            this.items[index].isDZ = "1";
                        }else{
                            this.items[index].totalDzNum = +this.items[index].totalDzNum - 1;
                            this.items[index].isDZ = "0";
                        }
                    }else if(res.timeout){
                        this.warnCtrl.toast("登录超时，请重新登录!");
                    }else{
                        if(flag){
                            this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                        }else{
                            this.warnCtrl.toast("点赞失败，请稍后重试!");
                        }
                    }
                }).catch(error => {
                    this.items[index].praiseCount = 0;
                    if(flag){
                        this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                    }else{
                        this.warnCtrl.toast("点赞失败，请稍后重试!");
                    }
                });
      }else{
          this.warnCtrl.toast("请勿重复点击!");
      }
  }
  doRefresh(event){
        this.start = 1;
        this.queryPostPage(event, true);
  }
  doAppendData(event){
        if(!this.appendCount){
            this.appendCount = 1;
            this.queryPostPage(event).then(()=>{
                this.appendCount = 0;
            });
        }

  }
  goChat(){
    this.navCtrl.push(ChatRoomPage, this.toUserId);
  }
  goDetail(toId){
    this.navCtrl.push(MineDetailPage, {toUserId: toId});
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg4");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img4").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg4");
      sDiv.className = sDiv.className + " hidden";
  }
  //打开帖子详情页
  openPage(code){
      this.navCtrl.push(ContentPage,{code: code});
  }
  doEdit(){
      this.navCtrl.push(EditDetailPage);
  }
}
