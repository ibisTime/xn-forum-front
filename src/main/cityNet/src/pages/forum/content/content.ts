import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, NavParams, Events, ActionSheetController, AlertController, App, ModalController} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {MineDetailPage} from "../../../pages/mine/detail/detail";
import {UserService} from "../../../services/user.service";
import {Release} from "../../../services/release";
import {LoginPage} from "../../user/login";
import {ReplyCommentPage} from "./reply-comment";
import {Keyboard} from "ionic-native"

@Component({
  templateUrl: 'content.html'
})
export class ContentPage {

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
  isLogin = false;
  weichat;

  @ViewChild(Content) content: Content;

  constructor(public navPara: NavParams,
              public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public http: HttpService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              public mCtrl: ModalController,
              public app: App,
              public events: Events) {

        this.code = navPara.data.code;
        this.toUser = navPara.data.publisher;
        this.isMe = this.toUser == uService.userId ? true: false;
        this.weichat = Release.weChat;

        if(navPara.data.openType == "1"){
            this.getPostDetail();
        }else{
            /*列表帖子数据与详情没有区别*/
            this.item = navPara.data;
        }
        if(uService.user){
            this.isLogin = true;
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
      this.read();


      /*回复某条评论成功后刷新*/
        this.events
            .subscribe("user:replyCommentSuccess",(obj) => {
                obj = obj[0];
                this.item.commentList.push({
                    nickname: this.uService.user.nickname,
                    content: obj.msg,
                    code: obj.code,
                    commer: this.uService.user.userId,
                    parentCommer: obj.parentCommer,
                    parentNickname: obj.parentNickname
                });
                this.item.commentList1 = this.item.commentList.slice(0,5);
            });
  }

  //关注
  follow(publisher){

      if(!this.uService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/follow',{
                "toUser": publisher
            })
            .then((res) => {
                this.followCount = 0;
                this.followFlag = true;

            }).catch(error => {
                this.followCount = 0;
            });
      }
  }
  //取消关注
  unfollow(publisher){

      if(!this.uService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

      if(!this.followCount){
            this.followCount = 1;
            this.http.post('/rs/unfollow',{
                "toUser": publisher
                })
                .then((res) => {

                    this.followCount = 0;
                    this.followFlag = false;

                }).catch(error => {
                    this.followCount = 0;
                });
      }
  }
  deleteTz(code){
      if(!this.deleteCount){
          this.deleteCount = 1;
          let confirm = this.alertCtrl.create({
                title: '删除帖子',
                message: '确定删除帖子吗?',
                buttons: [
                    {
                        text: '取消',
                        handler: () => {
                            this.deleteCount = 0;
                        }
                    },
                    {
                        text: '确定',
                        handler: () => {
                            this.http.post('/post/delete',{
                                "code": code,
                                "type": "1"
                            }).then((res) => {
                                    this.deleteCount = 0;
                                    this.events.publish("content:delete", code);
                                    this.navCtrl.pop();
                                }).catch(error => {
                                    this.deleteCount = 0;
                                });
                        }
                    }
                ]
            });
        confirm.present();
      }
  }
  //收藏
  collect(code, flag?){

      if(!this.uService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

      if(this.isLogin){
          if(!this.collectCount){
            this.collectCount = 1;
            this.http.post('/post/praise',{
                "type": "2",
                "postCode": code
            })
                .then((res) => {
                    this.collectCount = 0;
                        //this.item.totalDzNum = (+this.item.totalDzNum + 1) + "";
                        if(!flag){
                            this.item.isSC = "1";
                        }else{
                            this.item.isSC = "0";
                        }

                }).catch(error => {
                    this.collectCount = 0;
                    // if(!flag){
                    //     this.warnCtrl.toast("收藏失败，请稍后重试!");
                    // }else{
                    //     this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                    // }
                });
        }
      }else{
        let currentNav = this.app.getActiveNav();
        currentNav.push(LoginPage);
      }
  }
  //点赞
  praise(code, flag?){

      if(!this.uService.user){
          this.navCtrl.push(LoginPage);
          return;
      }

        if(!this.praiseCount){
            this.praiseCount = 1;
            this.http.post('/post/praise',{
                "type": "1",
                "postCode": code
            })
                .then((res) => {
                    this.praiseCount = 0;

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

                }).catch(error => {
                    this.praiseCount = 0;
                    // if(flag){
                    //     this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                    // }else{
                    //     this.warnCtrl.toast("点赞失败，请稍后重试!");
                    // }
                });
        }


  }
  sendMsg1(msg){

      if(!this.uService.user){

          this.navCtrl.push(LoginPage);
          return;

      };

      // let code = event.charCode || event.keyCode;
      if(msg != null && msg.trim() !== ""){
           let mObj = {
                parentCode: this.item.code,
                content: msg
            }
            this.http.post('/post/comment', mObj)
                .then((res) => {
                    let rCode = res.data.code;
                    if(/\;filter:true$/.test(rCode)){
                        this.warnCtrl.toast("评论中含有敏感词汇!");
                    }else{
                        this.inputValue = "";
                        this.item.commentList.push({
                            nickname: this.uService.user.nickname,
                            content: msg,
                            code: rCode,
                            commer: this.uService.user.userId
                        });
                        this.item.commentList1 = this.item.commentList.slice(0,5);
                        this.item.totalCommNum = +this.item.totalCommNum + 1;
                    }
                    

                }).catch(error => {

                });
      }

  }


  getPostDetail(){
      this.http.get('/post/get',{
          "postCode": this.code
        })
        .then((res) => {
                var data = res.data;
                data.content = data.content.replace(/(@[^\s]*)\s/ig, "<a class='people'>$1</a>");
                this.item = data;

        }).catch(error => {

        });

  }
  goUserDetail(event){
      if(event.target.className == "people"){
            event.stopPropagation();
            this.navCtrl.push(MineDetailPage,{"nickname":event.target.innerText});
            return;
      }
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          this.events.publish("displayImg",img.src);
      }
  }

  doFocus1(e){
      setTimeout(()=>{
          window.scrollTo(0, 1000);
      }, 1);
  }
  //更多
  presentActionSheet() {

      if (!this.uService.user) {
          this.navCtrl.push(LoginPage);
          return;
      }

      let scFlag = this.item.isSC == "1" ? true : false;
    let buttons = [
        {
          text: scFlag && '取消收藏' || '收藏',
          handler: () => {
              this.collect(this.item.code, scFlag);
          }
        },{
          text: '取消',
          role: 'cancel'
        }
    ];
    if(!this.weichat){
        buttons.unshift({
          text: '分享',
          handler: () => {
            
          }
        });
    }
    if(this.isLogin && !this.isMe){
        buttons.unshift({
            text: '举报',
            handler: () => {
                this.report("1");
            }
        });
    }
    let actionSheet = this.actionSheetCtrl.create({
      title: '操作',
      buttons: buttons
    });
    actionSheet.present();
  }

  //打赏
  gratuity() {
    if (!this.uService.user) {
        this.navCtrl.push(LoginPage);
        return;
    }
    
    let prompt = this.alertCtrl.create({
      title: '打赏',
      message: "",
      inputs: [
        {
          name: 'amount',
          type: "number",
          placeholder: '打赏数量'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
              this.platform.ready().then(res => {
                  Keyboard.close();
              });
          }
        },
        {
          text: '确认',
          handler: (data) => {
                if(data.amount && /^\d+(\.\d+)?$/i.test(data.amount)){
                    this.http.post('/post/gratuity',{
                        "postCode": this.code,
                        "amount": +data.amount * 1000
                    })
                    .then((res) => {

                       this.warnCtrl.toast("打赏成功!");


                    }).catch(error => {

                    });
                }else{
                    this.warnCtrl.toast("打赏失败!");
                }
                this.platform.ready().then(res => {
                   Keyboard.close();
                });
          }
        }
      ]
    });
    prompt.present();
  }
  //举报
  report(type) {
      let prompt = this.alertCtrl.create({
      title: '举报',
      message: "",
      inputs: [
        {
          name: 'reportNote',
          placeholder: '举报理由'
        }
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
              this.platform.ready().then(res => {
                  Keyboard.close();
              });
          }
        },
        {
          text: '确认',
          handler: (data) => {
               if(!(typeof(data.reportNote) != "undefined" && data.reportNote.length >0 )){
                   this.warnCtrl.toast("请填写举报理由");
                   return;
               }

                this.http.post('/post/report',{
                    "code": this.code,
                    "reportNote": data.reportNote,
                    "type": type
                })
                .then((res) => {
                        
                        this.warnCtrl.toast("举报成功!");

                }).catch(error => {

                });

              this.platform.ready().then(res => {
                  Keyboard.close();
              });
          }
        }
      ]
    });
    prompt.present();
  }
  //举报评论
    reportPL(commer, code) {
        let prompt = this.alertCtrl.create({
            title: '举报',
            message: "",
            inputs: [
                {
                    name: 'reportNote',
                    placeholder: '举报理由'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    handler: data => {

                        this.platform.ready().then(res => {
                            Keyboard.close();
                        });

                    }

                },
                {
                    text: '确认',
                    handler: (data) => {
                        if(!(typeof(data.reportNote) != "undefined" && data.reportNote.length >0 )){
                            this.warnCtrl.toast("请填写举报理由");
                            return;
                        }
                        this.http.post('/post/report',{
                            "code": code,
                            "reportNote": data.reportNote,
                            "type": "2"
                        })
                        .then((res) => {
                            this.warnCtrl.toast("举报成功!");
                        }).catch(error => {

                        });

                        this.platform.ready().then(res => {
                            Keyboard.close();
                        });

                    }
                }
            ]
        });
        prompt.present();
    }
    //删除评论
    deleteComment(commer, code){
        this.http.post('/post/delete',{
            "code": code,
            "type": "2"
        }).then((res) => {
            for(let i = 0; i < this.item.commentList.length; i++){
                if(this.item.commentList[i].code == code){
                    this.item.commentList.splice(i, 1);
                    this.item.totalCommNum = +this.item.totalCommNum - 1;
                    break;
                }
            }
            this.warnCtrl.toast('删除评论成功！');
        }).catch(error => {});
    }

  //阅读帖子
  read(){
       this.http.post('/post/read',{
            "postCode": this.code
        }).then((res)=>{
            this.item.totalReadTimes = +this.item.totalReadTimes + 1;
        }).catch(error => {});
  }
  /*点击去用户详情页*/
    goDetail(event, article){
        event.stopPropagation();
        this.navCtrl.push(MineDetailPage, {publisher: article});
    }
    tapComment(ev, commer, code, nickname){
        ev.stopPropagation();
        if(!this.isLogin){
            return;
        };
        let buttons = [];
        buttons.push({
                text: '取消',
                role: 'cancel'
        });
        if(this.uService.userId == commer){
            buttons.unshift({
                text: '删除',
                handler: () => {
                    this.deleteComment(commer, code);
                }
            });
        }else{
            buttons.unshift({
                text: '举报',
                handler: () => {
                    this.reportPL(commer, code);
                }
            });
            buttons.unshift({
                text: "回复",
                handler: ()=>{
                    let modelCtrl = this.mCtrl.create(ReplyCommentPage, {
                        code: code,
                        commer: commer,
                        nickname: nickname
                    });
                    modelCtrl.present();
                }
            });
        }
        let actionSheet = this.actionSheetCtrl.create({
        title: '操作',
        buttons: buttons
        });
        actionSheet.present();
    }
}
