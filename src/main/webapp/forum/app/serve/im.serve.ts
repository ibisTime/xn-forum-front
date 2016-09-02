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
  lastMsg: string = '';
  constructor(from,lastMsg){
    this.from = from;
    this.lastMsg = lastMsg;
  }
}

@Injectable()
export class IMService {
  private  url =  'im-api.easemob.com';
  private  apiUrl = 'http:' + '//a1.easemob.com';
  private  appKey = "easemob-demo#chatdemoui";
  // private  appKey = "xiongniu-123#chatapp";

  me: string = '';

  //存储全部聊天数据的对象
  listOfChatRoomData: any = {};
  //存储聊天列表数据的对象
  listOfOpposite: Array<ListItem> = [];
  //好友列表
  listOfFriend: any[] = [];

  onOpened: () => void; //登陆连接成功回调
  // onClosed: (msg) => void; //连接关闭
  onTextMessage: (msg) => void;
  onTextMessageInner: (msg) => void;
  onPresence: (msg) => void;
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
        this.conn.setPresence();
        // this.onOpened();
        this.onOpened();
        //登陆成功获取好友列表
        this.getFriendList();
      },
      // //连接关闭回调
      onClosed:  (message) => {
      },
      onRoster:  (message) => {
      },
      onOnline:  () => { console.log('本机网络连接成功'); },                  //本机网络连接成功
      onOffline: () => { console.log('本机网络掉线')},                 //本机网络掉线
      onPresence: (msg) => {
        console.log('有人要添加好友了请求');
        console.log(msg);
        (typeof (this.onPresence) == "function") && this.onPresence(msg);

      },//添加好友
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

  //1.处理自己发送的信息
  handleToMsg(msg: string,to: string){
    let msgItem: MsgObj = {
      from: `${this.me}`,
      to: `${to}`,
      data: `${msg}`
    };
    this.handleMsgData(msgItem,true);
    //处理外部列表数据
    this.handleExternalMsgData(to,msg);
  }

  //2.处理收到的信息
  handleFromMsg(msg:MsgObj) {
    //1.全部数据
    console.log(msg.from);
    let from = msg.from;
    this.handleMsgData(msg,false);
    //2.外部列表数据
    this.handleExternalMsgData(from,msg.data);
  };

  //3.对插入数组的聊天数据进行处理
  handleMsgData(msg:MsgObj,isMe: boolean) {
    let from = isMe ? msg.to : msg.from;
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

  //4.对插入的外部列表数据进行处理
  handleExternalMsgData(linkMan: string,chatContent: string){

    if (this.listOfOpposite.length > 0) {

      let model: ListItem = this.listOfOpposite.find((value, index, obj) => {
        return value.from === linkMan;
      });

      if (typeof(model) === "undefined") {//没有找到,添加

        console.log('有别人,进行添加');
        let shortMsg = new ListItem(linkMan, chatContent);
        this.listOfOpposite.push(shortMsg);

      } else {//找到数据进行修改
        console.log('有自己进行数据修改');
        // console.log(model.lastMsg);
        model.lastMsg = chatContent;
      }

    } else {
      console.log('没别人,进行添加');
      let shortMsg = new ListItem(linkMan, chatContent);
      this.listOfOpposite.push(shortMsg);
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

  //加好友
  addFriend(to: string, msg: string){
    this.conn.subscribe({
      to: to,
      message: msg
    });
  }

  //获取好友列表
  getFriendList(){
   console.log("登陆成功后 获取好友列表");
    this.conn.getRoster({
      success : (roster) => {
        console.log(roster);
        this.listOfFriend = roster;
        // console.log(typeof(roster));
        // (typeof(roster) == "Object") && (this.listOfFriend = roster);
      }
    })
  }

  //登陆
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
