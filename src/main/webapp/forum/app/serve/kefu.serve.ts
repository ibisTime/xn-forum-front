/**
 * Created by tianlei on 16/8/26.
 */
import {Injectable , OnInit} from '@angular/core';
import {IMBaseService,MsgObj} from "./im-base.service";

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


  private appName = "chatapp";
  private orgName = "xiongniu-123";
  private tenantId = "26192";
  private to;
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

  onTextMessage: (msg) => void;
  onPictureMessage: (msg) => void;
  onFileMessage: (msg)=> void;


  conn;

  constructor(private imBase: IMBaseService) {

    this.conn = imBase.conn;
    this.to = imBase.to;
    imBase.kefuMessage = (msg) => {
      this.handleFromMsg(msg);
    }
    this.listOfChatRoomData.from = [];
  }
  getChatGroupId() {

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
    console.log(msg.from);
    let from = msg.from;
    if(msg.type == "picture"){
      this.handlePictureData(msg);
    }else if(msg.type == "file"){
      this.handleFileData(msg);
    }else{
      this.handleMsgData(msg);
    }

  };

  //3.对插入数组的聊天数据进行处理
  handleMsgData(msg:MsgObj) {
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
    if (typeof(this.listOfChatRoomData.from) == "undefined" || this.listOfChatRoomData.from === null) {
      console.log('未定义');
      this.listOfChatRoomData.from = [];
      this.listOfChatRoomData.from.push(msg);
    } else {
      console.log('已经定义');
      this.listOfChatRoomData.from.push(msg);
    }
  }

  handleFileData (msg:MsgObj){
    if (typeof(this.listOfChatRoomData.from) == "undefined" || this.listOfChatRoomData.from === null) {
      console.log('未定义');
      this.listOfChatRoomData.from = [];
      this.listOfChatRoomData.from.push(msg);
    } else {
      console.log('已经定义');
      this.listOfChatRoomData.from.push(msg);
    }
  }

  handlePictureData (msg:MsgObj){
    if (typeof(this.listOfChatRoomData.from) == "undefined" || this.listOfChatRoomData.from === null) {
      console.log('未定义');
      this.listOfChatRoomData.from = [];
      this.listOfChatRoomData.from.push(msg);
    } else {
      console.log('已经定义');
      this.listOfChatRoomData.from.push(msg);
    }
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
