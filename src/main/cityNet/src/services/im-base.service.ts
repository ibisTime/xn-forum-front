/**
 * Created by tianlei on 16/9/6.
 */

import {Injectable} from '@angular/core';

declare let WebIM: any;

export interface MsgObj {
  id?: string,
  type?: string,
  from: string,
  msgtype?: any,
  emotionArr?: any,
  emotionFlag?: boolean,
  to?: string,
  data?: string,
  delay?: string,
  ext?: any,
  date?: any,
  cityData?: any,
}

@Injectable()
export class IMBaseService {

  public url = 'im-api.easemob.com';
  public apiUrl = 'http://a1.easemob.com';
  public  appKey = "wlqsltz#chatapp";
  public to = "tianlei";
  public tenantId = "26192";

  // http://a1.easemob.com/xiongniu-123/chatapp/users
  // http://a1.easemob.com/easemob-demo/chatdemoui/users

  conn = new WebIM.connection({
    https: false,
    url: this.url,
    isAutoLogin: true,
    isMultiLoginSessions: false
  });

  /*消息*/
  imMessage;
  kefuMessage;

  // imTextMessage;
  // kefuTextMessage;
  //
  // imPictureMessage;
  // kefuPictureMessage;
  //
  // imFileMessage;
  // kefuFileMessage;

  imRoster;
  /*连接成功*/
  imOpened;
  /*好友*/
  imPresence;

  impFunction(imFunc,kefuFunc,msg, type?){

    
    
    if(msg.from == this.to){
      (typeof(kefuFunc) =="function")&&(kefuFunc(msg, type));
    }else{
      (typeof(imFunc) =="function")&&(imFunc(msg));
    }
  }
  constructor() {

    this.conn.listen({

      /*1.文本消息*/
      onTextMessage: (msg) => {
       this.impFunction(this.imMessage,this.kefuMessage,msg, "txt");
      },
      /*2.图片消息*/
      onPictureMessage: (msg) => {
        this.impFunction(this.imMessage,this.kefuMessage,msg, "picture");
      },
      /*3.文件消息*/
      onFileMessage: (msg) => {
        this.impFunction(this.imMessage,this.kefuMessage,msg, "file");
      },
      /*好友 1.接受你的好友申请  2.申请加你为好友*/
      onPresence: (msg) => {
        (typeof(this.imPresence) =="function")&&(this.imPresence(msg));
      },
      /*好友 1.自己发送申请请求会受到信息 2.别人接受你为好友 3.你删除好友*/
      onRoster: (msg) => {
        (typeof(this.imRoster) =="function")&&(this.imRoster(msg));
      },
      onOpened: (msg) => {
        console.log("登录成功");
        console.log(msg);
        (typeof(this.imOpened) =="function")&&(this.imOpened(msg));
        this.conn.setPresence();
      },
      onOnline: () => {
        console.log('本机网络连接成功');
      },
      onOffline: () => {
        console.log('本机网络掉线')
      },

      /*连接关闭*/
      onClosed: (message) => {
      },
      /*发生错误*/
      onError: (error) => {
        console.log('im发生错误');
        console.log(error);
      }
    });
  }

}
