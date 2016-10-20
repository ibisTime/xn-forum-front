/**
 * Created by tianlei on 2016/10/9.
 */
/**
 * Created by tianlei on 16/9/20.
 */
import {Component, AfterViewInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";


@Component({

    template: `

<ion-header>
  <ion-navbar color="background-color" no-shadow>
    <ion-buttons>
      <button (click)="cancle()" style="color: black; font-size: 16px; background-color: rgba(0,0,0,0)">
        取消
      </button>
    </ion-buttons>

    <ion-title>
      选择提醒的人
    </ion-title>
  </ion-navbar>
</ion-header>

<ion-content class="at" style="background-color: white;">
  <placeholder-view (show)="userService.followUsers.length <= 0">
  
  </placeholder-view>
  <div class="at-cell"  *ngFor="let item of userService.followUsers" (click)="choose(item)">
    {{item.nickname}}
  </div>
</ion-content>
`
})
export class AtPage implements AfterViewInit{



    constructor( public navPara: NavParams,
                 public warnService: WarnService,
                 public viewCtrl: ViewController,
                 public userService: UserService) {
    }


    ngAfterViewInit(){

        this.userService.queryFollowUsers();

    }

    cancle(){

     this.viewCtrl.dismiss();

    }

    choose(item){
        this.viewCtrl.dismiss(item.nickname);
    }

}
