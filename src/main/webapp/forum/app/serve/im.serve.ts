/**
 * Created by tianlei on 16/8/26.
 */
import {Injectable , OnInit} from '@angular/core';

declare var WebIM: any;

interface MsgObj {
  id?: string,
  type?: string,
  from: string,
  msgtype?: any,
  emotionArr?: any,
  emotionFlag?: boolean,
  to?: string,
  data?: string,
  delay?: string,
  ext?: any
}
class ListItem{
  from: string = '';
  to: string = '';
  lastMsg: string = '';
  /*存入我国东八区时间*/
  time: string;
  constructor(from,to,lastMsg,time){
    this.from = from;
    this.lastMsg = lastMsg;
    this.time = time;
    this.to = to;
  }
}

@Injectable()
export class IMService {
  private  url =  'im-api.easemob.com';
  private  apiUrl = 'http:' + '//a1.easemob.com';
  private  appKey = "easemob-demo#chatdemoui";
  // private  appKey = "xiongniu-123#chatapp";

  // tianlei005
  me: string = '';

  /*存储全部聊天数据的对象*/
  listOfChatRoomData: any = {};
  /*存储聊天列表数据的对象*/
  listOfOpposite: Array<ListItem> = [];
  /*好友列表*/
  listOfFriend: any[] = [];
  /*要加好友的人*/
  listOfFutureFriend = [];

  onOpened: () => void; //登陆连接成功回调
  // onClosed: (msg) => void; //连接关闭
  onTextMessage: (msg) => void;
  onTextMessageInner: (msg) => void;
  // onPresence: (msg) => void;
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
      onOpened:  (msg) => {          //连接成功回调
        //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息

        console.log("登陆成功");
        /*登陆成功获取好友列表*/
        this.getFriendList();
        //
        this.conn.setPresence();
        (typeof(this.onOpened) == "function") && this.onOpened();

      },
      // //连接关闭回调
      onClosed:  (message) => {
      },
      onRoster:  (message) => {
      },
      onOnline:  () => { console.log('本机网络连接成功'); },                  //本机网络连接成功
      onOffline: () => { console.log('本机网络掉线')},                 //本机网络掉线
      onPresence: (msg) => { this.handleSubscriptionData(msg) },//添加好友
      // //收到文本消息
      onTextMessage:  (msg) => {

        //处理收到的信息
        this.handleFromMsg(msg);
        console.log('imserve' + '收到信息');
        console.log(msg);
        typeof (this.onTextMessage) == "function" ? this.onTextMessage(msg) :"";
        typeof (this.onTextMessageInner) == "function" ? this.onTextMessageInner(msg) :"";

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
      // //连接错误
      onError:  (error) => {
        console.log('im发生错误');
        console.log(error);
      }
    });
  }

  /*0.根据聊天人获取聊天数据*/
  getDataByFromName( from) : Array<MsgObj>{
    //1.不存在数据
    if ( typeof(this.listOfChatRoomData[from]) === "undefined"){
      this.listOfChatRoomData[from] = [];
      console.log('没有查找到数据');
      return this.listOfChatRoomData[from];
    }
    //2.存在数据
    console.log('查找到数据');
    return this.listOfChatRoomData[from];
  }

  /*1.处理自己发送的信息*/
  handleToMsg(msg: string,to: string){

    let msgItem: MsgObj = {
      from: `${this.me}`,
      to: `${to}`,
      data: `${msg}`
    };

    this.handleMsgData(msgItem,true);
    //处理外部列表数据
    this.handleExternalMsgData(msgItem);
  }

  /*2.处理收到的信息*/
  handleFromMsg(msg:MsgObj) {
    //1.全部数据
    console.log(msg.from);
    let from = msg.from;
    /*内部聊天数据*/
    this.handleMsgData(msg,false);
    /*外部列表数据*/
    this.handleExternalMsgData(msg);
  };

  /*3.对插入数据对象的聊天数据进行处理*/
  handleMsgData(msg:MsgObj,isMe: boolean) {

    let from = isMe?  msg.to : msg.from;
    //1.查找已经存在的列表
    //2.列表中无任何数据
    //2.1有数据,不是该条
    //3.有该数据
    if (typeof(this.listOfChatRoomData[from]) === "undefined" || this.listOfChatRoomData[from] === null) {

      console.log('未定义');
      this.listOfChatRoomData[from] = [];
      this.listOfChatRoomData[from].push(msg);

    } else {

      console.log('已经定义');
      this.listOfChatRoomData[from].push(msg);

    }

  }

  /*4.对插入的外部列表数据进行处理*/
  handleExternalMsgData(msg:MsgObj){

    let linkMan = msg.from == this.me ? msg.to : msg.from ;
    let chatContent = msg.data;
    let date = new Date(); //收到时间
    if (typeof(msg.delay) != "undefined"){
       date = new Date(msg.delay);
    }
    let dateStr = date.getHours() +":"+ date.getMinutes();
    let shortMsg = new ListItem(linkMan,msg.to, chatContent,dateStr);


    if (this.listOfOpposite.length > 0) {

      let model: ListItem = this.listOfOpposite.find((value, index, obj) => {
        return value.from === linkMan;
      });

      if (typeof(model) === "undefined") {//没有找到,添加

        console.log('有别人,进行添加');
        this.listOfOpposite.push(shortMsg);

      } else {//找到数据进行修改
        console.log('有自己进行数据修改');
        model.lastMsg = chatContent;
        model.time = dateStr;
      }

    } else {
      console.log('没别人,进行添加');
      this.listOfOpposite.push(shortMsg);
    }
  }

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
      /*加入 待添加好友*/
      this.listOfFutureFriend.push(msg);



    } else if( msg.type === 'subscribed' ) {//别人同意你的好友申请

    } else if( msg.type === 'unsubscribed'){//别人删除了好友关系

    } else {

    }

  }


  //发消息
  sendTextMsg(message,to,successCallBack: (id, serverMsgId) => void ) {

      let id = this.conn.getUniqueId();//生成本地消息id
      let msg = new WebIM.message('txt', id);//创建文本消息
      msg.set({
        msg: message,
        to: to,
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

  /*获取好友列表*/
  getFriendList(){
   console.log("登陆成功后 获取好友列表");
    this.conn.getRoster({
      success : (roster) => {
        let trueFriend = [];
        roster.forEach((obj, index, array) => {
          if(obj.subscription == "both"){
            trueFriend.push(obj);
          }
        });
        /*subscription:both 才为真正的好友*/
        this.listOfFriend = trueFriend;
      }
    })
  }

  /*删除好友*/
  removeFriend(friendName){
    this.conn.removeRoster({
      to: friendName,
      success: function () {//删除成功
        /*删除内存中*/
        let indexAddr;
        this.listOfFriend.find((value,index,obj) => {

          indexAddr = index;
          return value.from == friendName;

        });
        this.imServe.listOfFriend.splice(indexAddr);
        /*取消订阅*/
        this.conn.unsubscribed({
          to: friendName
        });
      },
      error : function () {}//删除失败
    });
  }

  /*登陆*/
  login(userName,password){
    this.me = userName;//保存用户信息
    let loginOptions = {
      apiUrl: this.apiUrl,
      user: userName,
      pwd: password,
      appKey: this.appKey
    };

    this.conn.open(loginOptions);
  }

  clearCurrentData(){
    this.listOfChatRoomData = {};
    //存储聊天列表数据的对象
    this.listOfOpposite = [];
    //好友列表清除
    this.listOfFriend= [];
  }

  close(){
    this.conn.close();
  }

}
