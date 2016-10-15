/**
 * Created by tianlei on 2016/10/15.
 */
import {Component, Input, Output, EventEmitter} from '@angular/core';
//
@Component({
    selector: 'segment-view',
    template:`
   <div>
         <button  
                  class="current-btn default left" 
                  (click)="leftClick()"
                  [ngClass]="{'current-btn': show}"
                  >
            {{leftTitle}}
         </button>
         <button
                  class="default right"
                  [ngClass]="{'current-btn': !show}"
                  (click)="rightClick()">
                  {{rightTitle}}
         </button>
    </div>
     `,
    styles:[
        `
 
  .default{
    padding: 0;
    margin: 0;
    border-radius: 0;
    border: 1px solid white;
    background-color: rgb(206,63,66);
    max-height: 35px;
    min-height: 35px;
    color: white;
    font-size: 16px;
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
  }
   .current-btn{
    background-color:  white;
    color: rgb(206,63,66);
  }

`
]

})
export class SegmentView {

    show = true;
    lastShow = true;
    @Input() leftTitle;
    @Input() rightTitle;
    @Output() emitter = new EventEmitter();

    constructor() {
    }

    leftClick(){

        this.show = true;
        if(this.lastShow != this.show){
            this.emitter.emit("left");
            this.lastShow = true;
        }

    }

    rightClick(){
        this.show = false;
        if(this.lastShow != this.show){
            this.emitter.emit("right");
            this.lastShow = false;
        }
    }

}