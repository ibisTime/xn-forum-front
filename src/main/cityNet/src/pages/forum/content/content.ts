import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, NavParams} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";


@Component({
  templateUrl: 'content.html'
})
export class ContentPage {

  isAndroid: boolean = false;
  imgHeight: string;
  pHeight: string;
  code: string;
  // item = {totalDzNum: "", code: "", commentList:[], publisher: "",isSC:"",isDZ:"", postTalkList:[]};
  /*解决错误*/
  item;
  followFlag:boolean = false;
  segment:string = "pjia";
  followCount: number = 0;
  collectCount = 0;   //点击收藏次数
  praiseCount = 0;    //点击点赞次数
  deleteCount = 0;    //点击删除次数
  toUser = "";
  isMe = false;
  inputValue;

  @ViewChild(Content) content: Content;

  constructor(public navPara: NavParams,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public http: HttpService) {

        this.isAndroid = platform.is('android');
        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.pHeight = `${this.platform.height()}px`;
        this.code = navPara.data.code;
        this.toUser = navPara.data.publisher || "";
        this.isMe = this.toUser == uService.userId ? true: false;
        this.getPostDetail();
        uService.queryFollowUsers().then(()=>{
            let fUs = this.uService.followUsers;
            for(let f of fUs){
                if(this.toUser == f.userId){
                    this.followFlag = true;
                    break;
                }
            }
        });
  }
  //关注
  follow(publisher){
      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/follow',{
                "toUser": publisher
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
  unfollow(publisher){
      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/unfollow',{
                "toUser": publisher
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
  deleteTz(code){
      if(!this.deleteCount){
          this.deleteCount = 1;
          this.http.post('/post/delete',{
            "code": code
          })
            .then((res) => {
                this.deleteCount = 0;
                if(res.success){
                    this.navCtrl.pop();
                }else if(res.timeout){
                    this.warnCtrl.toast("登录超时，请重新登录!");
                }else{
                    this.warnCtrl.toast("删除帖子失败，请稍后重试!");
                }
            }).catch(error => {
                this.deleteCount = 0;
                this.warnCtrl.toast("删除帖子失败，请稍后重试!");
            });
      }
  }
  //收藏
  collect(code, flag?){
      if(!this.collectCount){
          this.collectCount = 1;
          this.http.post('/post/praise',{
            "type": "2",
            "postCode": code
          })
            .then((res) => {
                this.collectCount = 0;
                if(res.success){
                    //this.item.totalDzNum = (+this.item.totalDzNum + 1) + "";
                    if(!flag){
                        this.item.isSC = "1";
                    }else{
                        this.item.isSC = "0";
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
                this.collectCount = 0;
                if(!flag){
                    this.warnCtrl.toast("收藏失败，请稍后重试!");
                }else{
                    this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                }
            });
      }

  }
  //点赞
  praise(code, flag?){
      if(!this.praiseCount){
          this.praiseCount = 1;
          this.http.post('/post/praise',{
            "type": "1",
            "postCode": code
          })
            .then((res) => {
                this.praiseCount = 0;
                if(res.success){

                    if(!flag){
                        this.item.totalLikeNum = (+this.item.totalLikeNum + 1) + "";
                        this.item.isDZ = "1";
                        this.item.likeList.push({
                            talker:this.uService.userId,
                            nickname: this.uService.user.nickname,
                            postCode: code
                        });
                    }else{
                        this.item.totalLikeNum = (+this.item.totalLikeNum - 1) + "";
                        this.item.isDZ = "0";
                        for(let i = 0; i < this.item.likeList.length; i++){
                            if(this.item.likeList[i].talker == this.uService.userId){
                                this.item.likeList.splice(i, 1);
                            }
                        }
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
                this.praiseCount = 0;
                if(flag){
                    this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                }else{
                    this.warnCtrl.toast("点赞失败，请稍后重试!");
                }
            });
      }

  }
  sendMsg1(msg){
      let mObj = {
          parentCode: this.item.code,
          content: msg
      }
      this.http.post('/post/comment', mObj)
        .then((res) => {
            if(res.success){
                this.item.commentList.push({
                    nickname: this.uService.user.nickname,
                    content: msg
                });
            }else{
                this.warnCtrl.toast("评论失败，请稍后重试!");
            }
        }).catch(error => {
            this.warnCtrl.toast("评论失败，请稍后重试!");
        });
  }
  getPostDetail(){
      this.http.get('/post/get',{
          "postCode": this.code
        })
        .then((res) => {
            if(res.success){
                var data = res.data;
                if(data.pic != null){
                    data.pic = data.pic.split(/\|\|/);
                }
                this.item = data;
            }else{
                this.warnCtrl.toast("帖子详情获取失败，请稍后重试!");
            }
        }).catch(error => {
        });
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg2");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img2").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg2");
      sDiv.className = sDiv.className + " hidden";
  }
  doFocus1(e){
      setTimeout(()=>{
          window.scrollTo(0, 1000);
      }, 1);
  }
}
