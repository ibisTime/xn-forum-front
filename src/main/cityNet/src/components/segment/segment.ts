/**
 * Created by tianlei on 2016/10/15.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'segment',
    template:`
         <button #left [class.current-btn] = "show" class="left" (click)="leftClick()">用户</button>
      <button #right [ngClass]="{'current-btn': !show}" class="right" (click)="rightClick()">帖子</button>
    
     `,
    styles:[`
  .current-btn{
  background-color:  white;
  color: rgb(206,63,66);
  }
  .left,.right{
    padding: 0;
    margin: 0;
    border-radius: 0;
    height: 20px;
    border: 1px solid white;
    background-color: rgb(206,63,66);
    max-height: 35px;
    min-height: 35px;
    font-size: 16px;
    color: white;
    width: 45%;
    box-sizing: border-box;
  }

  .left{
    margin-right: -3px;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
  }
  .right{
    margin-left: -3px;
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
  }`
]

})
export class Segment {

    @Input() leftTitle;
    constructor() {

    }
    leftClick(){

    }
    rightClick(){

    }

}