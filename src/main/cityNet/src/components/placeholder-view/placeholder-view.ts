/**
 * Created by tianlei on 2016/10/14.
 */
import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector:"placeholder-view",
    template:`<div *ngIf="show" 
    style="font-size: 18px; min-height: 40px; padding: 50px 10px; text-align: center;"
    >
    {{text}}
</div>`


})
export class PlaceholderView implements OnInit {

    @Input() show = false;
    @Input() text = "暂无相关内容"
    constructor() {

    }

    ngOnInit() {
    }
}