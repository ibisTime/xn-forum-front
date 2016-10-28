/**
 * Created by tianlei on 2016/10/24.
 */
import {Component, OnInit} from '@angular/core';
import {NavParams} from "ionic-angular";

@Component({

    template: `
<ion-header class="im-header">
  <ion-navbar color="navbar-color">
    <ion-title>
      消息详情
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content style="background-color: white;">
 <div [innerHTML]="detail.content" style="padding: 0px 10px;"></div>
</ion-content >
    `
})

export class SysMsgDetailPage implements OnInit {

    detail;
    constructor( public navParams: NavParams) {
        this.detail = navParams.data;
    }

    ngOnInit() {
    }
}