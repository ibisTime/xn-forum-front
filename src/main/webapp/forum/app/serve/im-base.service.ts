/**
 * Created by tianlei on 16/9/6.
 */

import {Injectable} from '@angular/core';

declare var WebIM: any;

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
  ext?: any
}

@Injectable()
export class IMBaseService {

  public url = 'im-api.easemob.com';
  public apiUrl = 'http:' + '//a1.easemob.com';
  public appKey = "easemob-demo#chatdemoui";
  // private  appKey = "xiongniu-123#chatapp";

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

  impFunction(imFunc,kefuFunc,msg){
    (typeof(imFunc) =="function")&&(imFunc(msg));
    (typeof(kefuFunc) =="function")&&(imFunc(msg));
  }
  constructor() {

    console.log("基础连接创建了");
    this.conn.listen({

      /*1.文本消息*/
      onTextMessage: (msg) => {
       this.impFunction(this.imMessage,this.kefuMessage,msg);
      },
      /*2.图片消息*/
      onPictureMessage: (msg) => {
        this.impFunction(this.imMessage,this.kefuMessage,msg);
      },
      /*3.文件消息*/
      onFileMessage: (msg) => {
        this.impFunction(this.imMessage,this.kefuMessage,msg);
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
        console.log("登陆成功");
        (typeof(this.imOpened) =="function")&&(this.imOpened(msg));
        this.conn.setPresence();
      },
      onOnline: () => {
        console.log('本机网络连接成功');
      },                  //本机网络连接成功
      onOffline: () => {
        console.log('本机网络掉线')
      },                 //本机网络掉线

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
