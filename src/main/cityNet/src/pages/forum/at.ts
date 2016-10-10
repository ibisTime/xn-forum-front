/**
 * Created by tianlei on 2016/10/9.
 */
/**
 * Created by tianlei on 16/9/20.
 */
import {Component, AfterViewInit} from '@angular/core';
import {NavParams, ViewController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";


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

<ion-content style="background-color: white;">

</ion-content>
`
})
export class AtPage implements AfterViewInit{



    constructor( public navPara: NavParams,
                 public warnService: WarnService,
                 public viewCtrl: ViewController) {
    }


    ngAfterViewInit(){

    }

    cancle(){

     this.viewCtrl.dismiss("at的人---111");

    }

}
