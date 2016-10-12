/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'test-view',
    template:`
    <button (click)="send()">test-view</button>
    `
})
export class TestView implements OnInit {
    constructor() {
    }


     @Output() emitEvent = new EventEmitter<any>();

    ngOnInit() {
    }
    send(){
        this.emitEvent.emit('aaaa');
    }
}