/**
 * Created by tianlei on 2016/10/21.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";

@Component({
    templateUrl: 'mine-property-datail.html'
})
export class MinePropertyDetail implements OnInit {

    item;
    constructor(public navParams: NavParams) {
        this.item = navParams.data;
    }

    ngOnInit() {

    }
}