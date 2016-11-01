/**
 * Created by tianlei on 2016/10/21.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams, Platform} from "ionic-angular";

@Component({
    templateUrl: 'mine-property-datail.html'
})
export class MinePropertyDetail implements OnInit {

    product;
    imgHeight;
    constructor(public navParams: NavParams,
                public platform: Platform) {
        this.product = navParams.data.product;
        this.imgHeight = `${this.platform.width()*2/4.0}px`;
    }

    ngOnInit() {

    }
}