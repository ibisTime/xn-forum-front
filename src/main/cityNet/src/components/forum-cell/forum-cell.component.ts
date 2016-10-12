/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {Platform} from "ionic-angular";

@Component({
    selector: 'forum-cell',
    templateUrl: 'forum-cell.component.html'
})
export class ForumCell implements OnInit {

    @Input() item;
    imgHeight;
    constructor(public platform: Platform) {

        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;

    }

    ngOnInit() {
    }
}