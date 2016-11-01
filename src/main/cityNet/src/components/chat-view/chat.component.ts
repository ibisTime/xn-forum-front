/**
 * Created by tianlei on 16/9/9.
 */
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
   templateUrl: "chat.component.html",
    selector: 'chat-view'
})
export class ChatViewComponent implements OnInit {
    constructor() { }

  public _me;
  public _listOfChatData;
  _mineImg

    @Input() set listOfChatData(listOfChatData){
      this._listOfChatData = listOfChatData;
    };

    @Input() set me(me){
      this._me = me;
    }


    @Input() set  mineImg(imgsrc){

        this._mineImg = imgsrc;
    }

    @Input() otherImg;

  // doCaidan(item.id,item.name)
  //   doCaidan(item.id,item.name)
  // doPingjia(msgItem.ext.weichat.ctrlArgs.inviteId,msgItem.ext.weichat.ctrlArgs.serviceSessionId)

   @Output() doPingjia: EventEmitter<any> = new EventEmitter();
   @Output() doCaidan: EventEmitter<any> = new EventEmitter();
   @Output() goIframe: EventEmitter<any> = new EventEmitter();



  doCaidanCopy(id,name){
    let item = {
      "id" : id,
      "name" : name
    }
    this.doCaidan.emit(item);

  }

  doPingjiaCopy(inviteId,serviceSessionId){
    let item = {
      "inviteId" : inviteId,
      "serviceSessionId" : serviceSessionId
    }

    this.doPingjia.emit(item);

  }
  /*所有跳转事件个功能点击事件*/
  goIframeCopy(url,title){
    this.goIframe.emit({"url":url,"title":title});
 }

  ngOnInit() { }

}
