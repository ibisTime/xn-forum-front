/**
 * Created by tianlei on 16/9/9.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
   templateUrl: "build/components/chat-view/chat.component.html",
    selector: 'chat-view'
})
export class ChatViewComponent implements OnInit {
    constructor() { }

  private _me;
  private _listOfChatData;

    @Input() set listOfChatData(listOfChatData){
      this._listOfChatData = listOfChatData;
    };

    @Input() set me(me){
      this._me = me;
    }



    ngOnInit() { }


}
