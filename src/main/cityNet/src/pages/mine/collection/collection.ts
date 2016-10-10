import {Component} from '@angular/core';
import {NavController, Platform, App, NavParams} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {ContentPage} from "../../forum/content/content";
import {ChatRoomPage} from "../../mine/im/chat-room";
import {MineDetailPage} from "../../mine/detail/detail";


@Component({
  templateUrl: 'collection.html'
})
export class CollectionPage {
  src:string = 'images/marty-avatar.png';
  imgHeight: string;
  pHeight: string;
  items = [];
  start: number;
  limit: number;
  appendCount = 0;
  totalCount = 0;


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
    
    this.start = 1;
    this.limit = 10;
    this.queryPostPage();
  }
  queryPostPage(event?, refresh?){
      (function(me){
        me.http.get('/post/collection/page',{
          "start": me.start,
          "limit": me.limit
        })
        .then((res) => {
            if(res.success){
                me.totalCount = res.data.totalCount;
                let list = res.data.list;
                let i = 0;
                if(refresh){
                    me.items = [];
                }
                for(i = 0; i < list.length; i++){
                    if(list[i].pic != null){
                        list[i].pic = list[i].pic.split(/\|\|/);
                    }
                    list[i].collectCount = 0;   //点击收藏次数
                    list[i].praiseCount = 0;    //点击点赞次数
                    me.items.push(list[i]);
                }
                if(i > 0){
                    me.start++;
                }
            }
            event && event.complete();
        }).catch(error => {
            event && event.complete();
        });
      })(this);
    //   this.http.get('/post/collection/page',{
    //       "start": this.start,
    //       "limit": this.limit
    //     })
    //     .then((res) => {
    //         if(res.success){
    //             this.totalCount = res.data.totalCount;
    //             let list = res.data.list;
    //             let i = 0;
    //             if(refresh){
    //                 this.items = [];
    //             }
    //             for(i = 0; i < list.length; i++){
    //                 if(list[i].pic != null){
    //                     list[i].pic = list[i].pic.split(/\|\|/);
    //                 }
    //                 list[i].collectCount = 0;   //点击收藏次数
    //                 list[i].praiseCount = 0;    //点击点赞次数
    //                 this.items.push(list[i]);
    //             }
    //             if(i > 0){
    //                 this.start++;
    //             }
    //         }
    //         event && event.complete();
    //     }).catch(error => {
    //         event && event.complete();
    //     });
  }
  //取消收藏
  collect(code, index){
      if(!this.items[index].collectCount){
          this.items[index].collectCount = 1;
          this.http.post('/post/praise',{
                "type": "2",
                "postCode": code
            }).then((res) => {
                    this.items[index].collectCount = 0;
                    if(res.success){
                        this.items[index].isSC = "0";
                        this.items.splice(index, 1);
                    }else if(res.timeout){
                        this.warnCtrl.toast("登录超时，请重新登录!");
                    }else{
                        this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                    }
                }).catch(error => {
                    this.items[index].collectCount = 0;
                    this.warnCtrl.toast("取消收藏失败，请稍后重试!");
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
  goDetail(toId){
    this.navCtrl.push(MineDetailPage, {toUserId: toId});
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg5");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img5").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg5");
      sDiv.className = sDiv.className + " hidden";
  }
  //打开帖子详情页
  openPage(code){
      this.navCtrl.push(ContentPage,{code: code});
  }
}
