/**
 * Created by tianlei on 16/8/26.
 */
import {Injectable , OnInit} from '@angular/core';
import {IMBaseService,MsgObj} from "./im-base.service";
import {HttpService} from "./http.service";

declare var WebIM: any;


class ListItem{
  from: string;
  lastMsg: string;
  constructor(from,lastMsg){
    this.from = from;
    this.lastMsg = lastMsg;
  }
}

@Injectable()
export class KefuService {


  private baseurl = 'http://kefu.easemob.com';
  private tenantId = "26192";
  private to;
  private appkey;
  private chatGroupId = "0";
  public totalMsg = 0;
  private chatGroupSeqId = 0;
  
  private map = {
    '[):]': 'ee_1.png',
    '[:D]': 'ee_2.png',
    '[;)]': 'ee_3.png',
    '[:-o]': 'ee_4.png',
    '[:p]': 'ee_5.png',
    '[(H)]': 'ee_6.png',
    '[:@]': 'ee_7.png',
    '[:s]': 'ee_8.png',
    '[:$]': 'ee_9.png',
    '[:(]': 'ee_10.png',
    '[:\'(]': 'ee_11.png',
    '[:|]': 'ee_12.png',
    '[(a)]': 'ee_13.png',
    '[8o|]': 'ee_14.png',
    '[8-|]': 'ee_15.png',
    '[+o(]': 'ee_16.png',
    '[<o)]': 'ee_17.png',
    '[|-)]': 'ee_18.png',
    '[*-)]': 'ee_19.png',
    '[:-#]': 'ee_20.png',
    '[:-*]': 'ee_21.png',
    '[^o)]': 'ee_22.png',
    '[8-)]': 'ee_23.png',
    '[(|)]': 'ee_24.png',
    '[(u)]': 'ee_25.png',
    '[(S)]': 'ee_26.png',
    '[(*)]': 'ee_27.png',
    '[(#)]': 'ee_28.png',
    '[(R)]': 'ee_29.png',
    '[({)]': 'ee_30.png',
    '[(})]': 'ee_31.png',
    '[(k)]': 'ee_32.png',
    '[(F)]': 'ee_33.png',
    '[(W)]': 'ee_34.png',
    '[(D)]': 'ee_35.png'
  };

  private  url =  'im-api.easemob.com';

  me: string = '18868824532';
  //存储全部聊天数据的对象
  listOfChatRoomData: any = {};

  // onTextMessage: (msg) => void;
  // onPictureMessage: (msg) => void;
  // onFileMessage: (msg)=> void;
  scroll_bottom;

  conn;

  constructor(private imBase: IMBaseService,
              private ajax: HttpService) {

    this.conn = imBase.conn;
    this.to = imBase.to;
    this.tenantId = imBase.tenantId;
    this.appkey = imBase.appKey;
    imBase.kefuMessage = (msg, type) => {
      this.totalMsg++;
      msg.type = type;
      this.handleFromMsg(msg);
    }
    this.listOfChatRoomData.from = [];
  }
  getChatGroupId() {
    return this.ajax.get(null, null, this.baseurl + '/v1/webimplugin/visitors/' + this.me +
     '/ChatGroupId?techChannelInfo=' + encodeURIComponent(this.appkey) + '%23' + this.to + '&tenantId=' + this.tenantId)
     .then((msg)=>{
       this.chatGroupId = msg;
      });
  }
  getHistory(refresh?) {
    if(this.chatGroupId === "0"){
      this.getChatGroupId().then(()=>{
        this.getMyHistory(refresh);
      });
    }else{
      this.getMyHistory(refresh);
    }
  }
  getMyHistory(refresh?) {
    this.ajax.get(null, null,
      'http://kefu.easemob.com/v1/webimplugin/visitors/msgHistory?fromSeqId='+(this.chatGroupSeqId || 0)+'&size=10&chatGroupId='+this.chatGroupId+'&tenantId='+this.tenantId)
      .then((msg)=>{
        this.handleHistoryData(msg, refresh);
      })
  }
  getDataByFromName() : Array<MsgObj>{
    return this.listOfChatRoomData.from;
  }

  //1.处理自己发送的信息
  handleToMsg(msg: string){
    let msgItem: MsgObj = {
      from: `${this.me}`,
      to: `${this.to}`,
      data: `${msg}`
    };
    this.handleMsgData(msgItem);
  }

  //2.处理收到的信息
  handleFromMsg(msg:MsgObj) {
    //1.全部数据
    if(msg.type == "picture"){
      this.handlePictureData(msg);
    }else if(msg.type == "file"){
      this.handleFileData(msg);
    }else{
      this.handleMsgData(msg);
    }
    this.scroll_bottom();
  };

  //3.对插入数组的聊天数据进行处理
  handleMsgData(msg:MsgObj, isHistory?) {
    let flag = false;
    if ( msg.ext && msg.ext.weichat && msg.ext.weichat.ctrlType
      && msg.ext.weichat.ctrlType == 'inviteEnquiry' && msg.from !== this.me) {
      //满意度评价
      msg.type = 'satisfactionEvaluation';
    }else if(msg.from !== this.me){
      var emotionArr = [];
      for ( let face in this.map ) {
        if ( this.map.hasOwnProperty(face) ) {
          while ( msg.data.indexOf(face) > -1 ) {
            flag = true;
            msg.data = msg.data.replace(face, "!#!");
            emotionArr.push("images/faces/"+this.map[face]);
          }
        }
      }
      if(flag){
        msg.emotionFlag = true;
        var emotionData = msg.data.split(/!#!/), eData = [];
        for(var i=0; i < emotionData.length; i++){
          eData.push([emotionData[i], emotionArr[i]]);
        }
        msg.emotionArr = eData;
      }
    }
    if(!isHistory){
      this.listOfChatRoomData.from.push(msg);
    }else{
      this.listOfChatRoomData.from.unshift(msg);
    }
    this.scroll_bottom();
  }

  handleFileData (msg:MsgObj, isHistory?){
    if (!isHistory) {
      this.listOfChatRoomData.from.push(msg);
    } else {
      this.listOfChatRoomData.from.unshift(msg);
    }
    this.scroll_bottom();
  }

  handlePictureData (msg:MsgObj, isHistory?){
    if (!isHistory) {
      this.listOfChatRoomData.from.push(msg);
    } else {
      this.listOfChatRoomData.from.unshift(msg);
    }
    this.scroll_bottom();
  }
  private format ( date, fmt ) {
    var o = {
      'M+': date.getMonth() + 1,	//月份
      'd+': date.getDate(),		//日
      'h+': date.getHours(),		//小时
      'm+': date.getMinutes(),	//分
      's+': date.getSeconds()		//秒
    };

    if ( /(y+)/.test(fmt) ) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for ( var k in o ) {
      if ( new RegExp('(' + k + ')').test(fmt) ) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? o[k] : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;   
  };

  handleHistoryData(chatHistory, refresh){
      var me = this;

      if ( chatHistory.length > 0 ) {
          for(let i = 0; i < chatHistory.length; i++){
              let chat = chatHistory[i],
                  msgBody =chat.body,
                  msg,
                  isSelf = msgBody.from === this.me;

              if ( msgBody && msgBody.bodies.length > 0 ) {
                  msg = msgBody.bodies[0];
                  //如果是自己发出的消息
                  if ( isSelf ) {
                      if(msg.type == "txt"){
                          msg.from = this.me;
                          msg.data = msg.msg;
                          msg.date = this.format(new Date(msgBody.timestamp), 'M月d日 hh:mm');
                          this.handleMsgData(msg, true);
                      }
                  //客服或机器人发出的消息
                  } else {
                      msg.from = this.to;
                      if(msg.type == "img"){
                          msg.type = "picture";
                          msg.url = /^http/.test(msg.url) ? msg.url : this.baseurl + msg.url;
                          this.handlePictureData(msg, true);
                      }else if(msg.type == "file"){
                          msg.url = /^http/.test(msg.url) ? msg.url : this.baseurl + msg.url;
                          this.handleFileData(msg, true);
                      }else{
                          if(msgBody.ext){
                              msg.ext = msgBody.ext;
                          }
                          msg.data = msg.msg;
                          this.handleMsgData(msg, true);
                      }
                  }
              }
          }
          this.chatGroupSeqId = +chatHistory[chatHistory.length - 1].chatGroupSeqId - 1;
      }
      refresh && refresh.complete();
  }
  //发消息
  sendTextMsg(message,successCallBack: (id, serverMsgId) => void, msgtype, ext?) {

      let id = this.conn.getUniqueId();//生成本地消息id
      let msg = new WebIM.message('txt', id);//创建文本消息
      msg.set({
        msg: message,
        to: this.to,
        msgtype: msgtype,
        ext:ext || "",
        success:  (id, serverMsgId) => {
          successCallBack(id, serverMsgId);
        }
      });
      this.conn.send(msg.body);
  }

  //满意度调查
  sendSatisfaction( level, content, session, invite ) {
      var me = this;
      var dom = document.getElementById("satisfactionDialog");
      this.sendTextMsg("", function(){
        console.log("sendSatisOk");
      }, "",{
              weichat: {
                  ctrlType: 'enquiry'
                  , ctrlArgs: {
                      inviteId: invite || ''
                      , serviceSessionId: session || ''
                      , detail: content
                      , summary: level
                  }
              }
          });
  }
}
