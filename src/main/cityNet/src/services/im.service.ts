/**
 * Created by tianlei on 16/8/26.
 */
import {Injectable} from '@angular/core';
import { MsgObj, IMBaseService} from './im-base.service'
import {Events} from "ionic-angular";
import {HttpService} from "./http.service";

declare var WebIM: any;

const IM_PASSWORD = "123456";
export const FUTURE_FRIEND_COUNT = "friend:futureCount"
export const MSG_TOTAL_COUNT = "msg:totalCount"

export interface ListItem{

  from: string;
  to: string;
  lastMsg: string;
  photo?;
  nickname?;
  /*存入我国东八区时间*/
  time: string;
  showBadge: boolean;
  badgeCount: number;

}


@Injectable()
export class IMService {

  me: string = '';

  /*存入当前聊天对象*/
  currentLinkMan = "";
  /*存储全部聊天数据的对象*/
  listOfChatRoomData: any = {};
  /*存储聊天列表数据的对象*/
  listOfOpposite: Array<any> = [];
  /*好友列表*/
  listOfFriend: any[] = [];
  /*要加好友的人*/
  listOfFutureFriend = [];
  /*链接对象*/
  conn;

  // 存入{联系人头像，昵称，userId}

  linckManInfo = [];

  /*消息总数*/
  msgTotalCount = 0;
  imTextMessageInner;

  constructor(  private imBase: IMBaseService,
                private events: Events,
                public  http: HttpService
                ) {


    this.conn = this.imBase.conn;
    this.imBase.imMessage = msg => {

      //收到消息统一转换为大写
      msg.from = msg.from.toUpperCase();
      msg.to = msg.to.toUpperCase();

      this.handleFromMsg(msg);
      (typeof(this.imTextMessageInner) == "function")&&(this.imTextMessageInner())
    };

    this.imBase.imPresence = msg => this.handleSubscriptionData(msg);
    this.imBase.imOpened = msg => this.imOpened(msg);

  }


  imOpened(msg){
    // this.getFriendList();
  }


  /*0.根据聊天人获取聊天数据*/
  getDataByFromName( from) : Array<MsgObj>{
    //1.不存在数据
    if ( typeof(this.listOfChatRoomData[from]) == "undefined"){
      this.listOfChatRoomData[from] = [];
      return this.listOfChatRoomData[from];
    }
    //2.存在数据
    return this.listOfChatRoomData[from];
  }

  /*1.处理自己发送的信息*/
  handleToMsg(msg: string,to: string,ext){

    // let ext = {
    //   "nickname":this.userService.user.nickname,
    //   "photo": this.userService.user.userExt.photo || ""
    // };
    let msgItem = {
      from: `${this.me}`,
      to: `${to}`,
      data: `${msg}`,
      "ext":ext
    };

    this.handleMsgData(msgItem,true);
    //处理外部列表数据
    this.handleExternalMsgData(msgItem);
  }

  /*2.处理收到的信息*/
  handleFromMsg(msg:MsgObj) {
    //1.文本信息
    //2.图片信息
    //3.文件信息
    /*内部聊天数据*/
    this.handleMsgData(msg,false);
    /*外部列表数据*/
    this.handleExternalMsgData(msg);
  };

  /*3.对插入数据对象的聊天数据进行处理*/
  handleMsgData(msg:MsgObj,isMe: boolean) {

    let from = msg.from == this.me ? msg.to : msg.from ;
    // let from = isMe?  msg.to : msg.from;
    //1.查找已经存在的列表
    //2.列表中无任何数据
    //2.1有数据,不是该条
    //3.有该数据

    if (typeof(this.listOfChatRoomData[from]) == "undefined" || this.listOfChatRoomData[from] === null) {

      this.listOfChatRoomData[from] = [];
      this.listOfChatRoomData[from].push(msg);

    } else {

      this.listOfChatRoomData[from].push(msg);

    }

  }

  /*4.对插入的外部列表数据进行处理*/
  handleExternalMsgData(msg){


    let linkMan = msg.from == this.me ? msg.to : msg.from ;

    // let date = new Date(); //收到时间
    // if (typeof(msg.delay) != "undefined"){
    //   date = new Date(msg.delay);
    //
    // }
    // // date = new Date('2015-09-08T14:12:23.509Z');
    // let dateStr = this.dateStr(date);

    /*注意判断显示badage*/
    // let shortMsg = new ListItem(linkMan,msg.to, chatContent,dateStr,(msg.from != this.me)&&(msg.from != this.currentLinkMan));

    let isShowBadge = (msg.from != this.me)&&(msg.from != this.currentLinkMan);

    if (isShowBadge){
      this.msgTotalCount += 1;
      this.events.publish(MSG_TOTAL_COUNT,this.msgTotalCount);
    }

    //from 统一改为对方userId
    let shortMsg;

    if(msg.from == this.me){//我发送的

      shortMsg = {
        // from: linkMan,
        userId:linkMan,
        nickname:msg.ext.nicknameOther,
        photo:msg.ext.photoOther,
        to: msg.to,
        // lastMsg: chatContent,
        // time: dateStr,
        showBadge: isShowBadge,
        badgeCount: 1
      }

    } else {//我接受的
      shortMsg = {
        // from: linkMan,
        userId:linkMan,
        nickname:msg.ext.nickname,
        photo:msg.ext.photo,
        to: msg.to,
        // lastMsg: chatContent,
        // time: dateStr,
        showBadge: isShowBadge,
        badgeCount: 1
      };

    }


    if (this.listOfOpposite.length > 0) {

      let models = this.listOfOpposite.filter((value, index, obj) => {
        return value.userId == linkMan;
      });

      let model = models[0];


      if (typeof(model) == "undefined") {//没有找到,添加

        this.listOfOpposite.push(shortMsg);

      } else {//找到数据进行修改

        // model.lastMsg = chatContent;
        // model.time = dateStr;
        model.showBadge = shortMsg.showBadge;
        model.badgeCount = model.badgeCount + 1;

      }

    } else {
      this.listOfOpposite.push(shortMsg);
    }
  }


  /*发文本消息*/
  sendTextMsg(message,to,extMsg,successCallBack: (id, serverMsgId) => void ) {

    let id = this.conn.getUniqueId();
    let msg = new WebIM.message('txt', id);//创建文本消息
    msg.set({
      msg: message,
      to: to,
      ext:extMsg,
      success:  (id, serverMsgId) => {
        successCallBack(id, serverMsgId);
      }
    });
    this.conn.send(msg.body);
  }

  /*登陆*/
  login(userId){
    this.me = userId;//保存用户信息
    let loginOptions = {
      apiUrl: this.imBase.apiUrl,
      user: userId,
      pwd: IM_PASSWORD,
      appKey: this.imBase.appKey
    };

    this.conn.open(loginOptions);
  }

  clearCurrentData(){
    this.listOfChatRoomData = {};
    //存储聊天列表数据的对象
    this.listOfOpposite = [];
    //好友列表清除
    // this.listOfFriend= [];
  }

  close(){
    this.conn.close();
    this.clearCurrentData();
  }


  /*注册*/
  register(userName,nickName): Promise<any>{
    return new Promise( (resolve,reject) =>{
      var registerOptions = {
        username: userName,
        password: IM_PASSWORD,
        nickname: nickName,
        appKey: this.imBase.appKey,
        success: function () {
          resolve();
        },
        error: function (error) {
          reject(error);
        },
        apiUrl: this.imBase.apiUrl
      };
      WebIM.utils.registerUser(registerOptions);

    });
  }






  /*接受一个朋友的请求*/
  accept(friendName: string){

    this.conn.subscribed({
      to: friendName,
      message: "[resp:true]"
    });
    this.conn.subscribe({//需要反向添加对方好友
      to: friendName,
      message: "[resp:true]"
    });
  }

  /*添加加好友*/
  addFriend(to: string, msg: string){
    this.conn.subscribe({
      to: to,
      message: msg
    });
  }

  // /*获取好友列表*/
  // getFriendList(){
  //   console.log("登陆成功后 获取好友列表");
  //   this.conn.getRoster({
  //     success : (roster) => {
  //       let trueFriend = [];
  //       roster.forEach((obj, index, array) => {
  //         if(obj.subscription == "both"){
  //           trueFriend.push(obj);
  //         }
  //       });
  //       /*subscription:both 才为真正的好友*/
  //       this.listOfFriend = trueFriend;
  //     }
  //   })
  // }
  //
  // /*删除好友*/
  // deleteFriend(friendName){
  //   return new Promise((resolve,rejet) => {
  //
  //     this.conn.removeRoster({
  //       to: friendName,
  //       success:  () => {//删除成功
  //         /*删除成功回调*/
  //         resolve();
  //
  //         /*删除内存中*/
  //         let indexAddr;
  //
  //         this.listOfFriend.find((value,index,obj) => {
  //           indexAddr = index;
  //           return value.name == friendName;
  //         });
  //
  //         this.listOfFriend.splice(indexAddr);
  //         /*取消订阅*/
  //         this.conn.unsubscribed({
  //           to: friendName
  //         });
  //       },
  //       error : function () {
  //         rejet("failure");
  //       }//删除失败
  //     });
  //
  //   });
  //
  // }

  /*5.处理好友请求*/
  handleSubscriptionData(msg){
    // let ob = {
    //   chatroom: false,
    //   code: null,
    //   from: "tianlei111",
    //   fromJid: "easemob-demo#chatdemoui_tianlei111@easemob.com",
    //   status: "tianlei111：test",
    //   to: "tianlei005",
    //   toJid: "easemob-demo#chatdemoui_tianlei005@easemob.com",
    //   type: "subscribe"
    // };

    if (msg.type == "subscribe"){//别人要添加你为好友

      if(msg.status == "[resp:true]"){
        this.accept(msg.from);
        return;
      }

      /*加入 待添加好友*/
      this.listOfFutureFriend.push(msg);
      /*发送有好友的通知*/
      this.events.publish(FUTURE_FRIEND_COUNT,this.listOfFutureFriend.length);

    } else if( msg.type === 'subscribed' ) {//别人同意你的好友申请

      let friend = {name: msg.from}
      this.listOfFriend.push(friend);

    } else if( msg.type === 'unsubscribed'){//别人删除了好友关系

    } else {

    }

  }





  dateStr(date1:Date){

    let date2 = new Date();
    let year = date1.getFullYear() == date2.getFullYear();
    let mon = date1.getMonth() == date2.getMonth();
    let day = date1.getDate() == date2.getDate();//每月的几号

    if(year && mon && day){
      return  this.formatStr(date1.getHours())+ ':' + this.formatStr(date1.getMinutes());
    }

    let oneDay = 24*60*60*1000;
    let difMilli =  date2.getMilliseconds() - date1.getMilliseconds();
    if(year && (date2.getDay() - date1.getDay()) && difMilli<7*oneDay ){ //同一周

      let w = {
        "1" : "星期一",
        "2" : "星期二",
        "3" : "星期三",
        "4" : "星期四",
        "5" : "星期五",
        "6" : "星期六",
        "7" : "星期日"
      }
      return w[date1.getDay()];
    }

    if(year){ //今年

      return this.formatStr(date1.getMonth())+ ":" + this.formatStr(date1.getDate());

    }

    return date1.getFullYear() + '-' + this.formatStr(date1.getMonth()) + '-' +   this.formatStr(date1.getDate());
  }

  formatStr(str){

    if(`${str}`.length == 1){
      return '0' + str;
    }
    return str;
  }

}

/**
 * Created by tianlei on 16/9/6.
 */

// status
//   :
//   "[resp:true]"
