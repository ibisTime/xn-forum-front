/**
 * Created by tianlei on 16/8/26.
 */
import {Injectable , OnInit} from '@angular/core';

declare var WebIM: any;

interface MsgObj {
  id?: string,
  type?: string,
  from: string,
  to?: string,
  data?: string,
  delay?: string,
  ext?: any,
  msgtype?: any,
  emotionArr?: any,
  emotionFlag?: boolean
}

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
  private  apiUrl = 'http:' + '//a1.easemob.com';
  // private  appKey = "easemob-demo#chatdemoui";
  private  appKey = "xiongniu-123#chatapp";
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

  me: string = 'tianlei005';
  //存储全部聊天数据的对象
  listOfChatRoomData: any = {};
  //存储聊天列表数据的对象
  listOfOpposite: Array<ListItem> = [];

  onOpened: () => void; //登陆连接成功回调
  // onClosed: (msg) => void; //连接关闭
  onTextMessage: (msg) => void;
  onTextMessageInner: (msg) => void;

  onPictureMessage: (msg) => void;
  onFileMessage: (msg)=> void;

  imUndefine = (msg) => { throw msg;};
  onRoster: (msg)=>void; //处理好友请求

  conn = new WebIM.connection({
    https: false,
    url: this.url,
    isAutoLogin: true,
    isMultiLoginSessions: false
  });

  constructor() {

    this.conn.listen({
      onOpened:  () => {          //连接成功回调
        //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
        this.conn.setPresence();
        // this.onOpened();
        this.onOpened();
      },
      // //连接关闭回调
      onClosed:  (message) => {
      },
      onRoster:  (message) => {
        console.log("roster");
      },
      onOnline:  () => { console.log('本机网络连接成功'); },                  //本机网络连接成功
      onOffline: () => { console.log('本机网络掉线')},                 //本机网络掉线
      onPresence: (msg) => { console.log('添加好友请求'); console.log("presence");},//添加好友
      // //收到文本消息
      onTextMessage:  (message) => {

        console.log('imserve' + '收到信息');
        console.log(message);
        typeof (this.onTextMessage) == "function" ? this.onTextMessage(message) :"";
        typeof (this.onTextMessageInner) == "function" ? this.onTextMessageInner(message) :"";
      },
      // //连接错误
      onError:  (error) => {
        console.log('im发生错误');
        console.log(error);
      },
      onPictureMessage: (message) => {
        console.log("picture");
        message.type = "picture";
        (typeof (this.onPictureMessage) == "function") && this.onPictureMessage(message);
      }, //收到图片消息
      onFileMessage: (message) => {
        console.log("file");
        message.type = "file";
        (typeof (this.onFileMessage) == "function") && this.onFileMessage(message);
      },
    });
  }

  getDataByFromName( from) : Array<MsgObj>{
    //1.不存在数据
    if ( typeof(this.listOfChatRoomData.from) === "undefined"){
      console.log('没有查找到数据');
      return [];
    }
    //2.存在数据
    console.log('查找到数据');
    return this.listOfChatRoomData.from;
  }

  //1.处理自己发送的信息
  handleToMsg(msg: string,to: string){
    let msgItem: MsgObj = {
      from: `${this.me}`,
      to: `${to}`,
      data: `${msg}`
    };
    this.handleMsgData(msgItem);
    //处理外部列表数据
    this.handleExternalMsgData(to,msg);
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
      //2.外部列表数据
      this.handleExternalMsgData(from,msg.data);
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

  //4.对插入的外部列表数据进行处理
  handleExternalMsgData(linkMan: string,chatContent: string){

    if (this.listOfOpposite.length > 0) {

      let model = this.listOfOpposite.find((value, index, obj) => {
        return value.from === linkMan;
      });

      if (typeof(model) === "undefine") {//没有找到,添加

        let shortMsg = new ListItem(linkMan, chatContent);
        this.listOfOpposite.push(shortMsg);

      } else {//找到数据进行修改
        console.log('找到数据进行修改');
        model.lastMsg = chatContent;
      }

    } else {
      let shortMsg = new ListItem(linkMan, chatContent);
      this.listOfOpposite.push(shortMsg);
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
  sendTextMsg(message,to,successCallBack: (id, serverMsgId) => void, msgtype, ext?) {

      let id = this.conn.getUniqueId();//生成本地消息id
      let msg = new WebIM.message('txt', id);//创建文本消息
      msg.set({
        msg: message,
        to: to,
        msgtype: msgtype,
        ext:ext || "",
        success:  (id, serverMsgId) => {
          successCallBack(id, serverMsgId);
        }
      });
      this.conn.send(msg.body);
  }

  //注册
  register(userName,password,nickName): Promise<any>{
    return new Promise( (resolve,reject) =>{
      var registerOptions = {
        username: userName,
        password: password,
        nickname: nickName,
        appKey: this.appKey,
        success: function () {
          resolve();
        },
        error: function (error) {
          reject(error);
        },
        apiUrl: this.apiUrl
      };
      WebIM.utils.registerUser(registerOptions);

    });
  }

  //登陆
  login(userName,password){
    let loginOptions = {
      apiUrl: this.apiUrl,
      user: userName,
      pwd: password,
      appKey: this.appKey
    };

    this.conn.open(loginOptions);
  }

  close(){
    this.conn.close();
  }

  //满意度调查
  sendSatisfaction( level, content, session, invite ) {
      var me = this;
      var dom = document.getElementById("satisfactionDialog");
      this.sendTextMsg("", "13333333333", function(){
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