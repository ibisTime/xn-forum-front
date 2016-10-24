/**
 * Created by tianlei on 2016/10/24.
 */
import {Component, OnInit} from '@angular/core';

@Component({

    template: `
<ion-header class="im-header">
  <ion-navbar color="navbar-color">
    <ion-title>
      消息详情
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content >
 <div [innerHTML]="detail" style="background-color: white; min-height: 100px;"></div>
</ion-content >
    `

})
export class SysMsgDetailPage implements OnInit {

    detail;
    constructor() {
    }

    ngOnInit() {
    }
}