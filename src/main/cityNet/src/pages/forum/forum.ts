import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController} from 'ionic-angular';
import {DetailPage} from "./detail/detail";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {ContentPage} from "./content/content";
import {LoginPage} from "../user/login";
import {ChatRoomPage} from "../mine/im/chat-room";MineDetailPage
import {MineDetailPage} from "../mine/detail/detail";

@Component({
  templateUrl: 'forum.html'
})
export class ForumPage {

  segment: string = "yliao";
  isAndroid: boolean= false;
  imgHeight: string;
  pHeight: string;
  imgUrl: string;
  start: number;
  limit: number;
  items = [];
  appendCount = 0;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public mCtrl: ModalController,
              public http: HttpService) {
      this.isAndroid = platform.is('android');
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
      this.start = 1;
      this.limit = 10;
      this.queryPostPage();
  }
  showLogin(){
    let modelCtrl = this.mCtrl.create(LoginPage);
    modelCtrl.present();
  }
  
  queryPostPage(event?, refresh?){
      return this.http.get('/post/page',{
          "start": this.start,
          "limit": this.limit
        })
        .then((res) => {
            if(res.success){
                let list = res.data.list;
                let i = 0;
                if(refresh){
                    this.items = [];
                }
                for(i = 0; i < list.length; i++){
                    if(list[i].pic){
                        list[i].pic = list[i].pic.split(/\|\|/);
                    }
                    //list[i].publishDatetime = this.jsDateDiff( new Date(list[i].publishDatetime).getTime()/1000 );
                    list[i].collectCount = 0;   //点击收藏次数
                    list[i].praiseCount = 0;    //点击点赞次数
                    this.items.push(list[i]);
                }
                if(i > 0){
                    this.start++;
                }
            }
            event && event.complete();
        }).catch(error => {
            event && event.complete();
        });
  }
  //收藏
  collect(code, index, flag?){
      if(!this.items[index].collectCount){
          this.items[index].collectCount = 1;
          this.http.post('/post/praise',{
                "type": "2",
                "postCode": code
            }).then((res) => {
                    this.items[index].collectCount = 0;
                    if(res.success){
                        if(!flag){
                            this.items[index].isSC = "1";
                        }else{
                            this.items[index].isSC = "0";
                        }
                    }else if(res.timeout){
                        this.warnCtrl.toast("登录超时，请重新登录!");
                    }else{
                        if(!flag){
                            this.warnCtrl.toast("收藏失败，请稍后重试!");
                        }else{
                            this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                        }
                    }
                }).catch(error => {
                    this.items[index].collectCount = 0;
                    if(!flag){
                        this.warnCtrl.toast("收藏失败，请稍后重试!");
                    }else{
                        this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                    }
                });
      }else{
          this.warnCtrl.toast("请勿重复点击!");
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
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg");
      sDiv.className = sDiv.className + " hidden";
  }
  showDetail(code){
       this.navCtrl.push(DetailPage);
  }
  //打开帖子详情页
  openPage(code, user){
      this.navCtrl.push(ContentPage,{code: code, user: user});
  }
  /*聊天*/
  goChat(userId){
    this.navCtrl.push(ChatRoomPage,userId);
  }
  goDetail(toId){
    this.navCtrl.push(MineDetailPage, {toUserId: toId});
  }
}