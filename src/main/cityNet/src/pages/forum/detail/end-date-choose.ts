/**
 * Created by tianlei on 2016/10/25.
 */
import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {BZPlatDetailPage} from "./bzPlatDetail";
import {WarnService} from "../../../services/warn.service";
import {min} from "rxjs/operator/min";
import {DateFormatter} from "@angular/common/src/facade/intl";
import {HttpService} from "../../../services/http.service";

@Component({

    template: `
    <ion-header class="forum-head">
      <ion-navbar color="navbar-color">
       <ion-title>有效期选择</ion-title>
      </ion-navbar>
    </ion-header>

    <ion-content style="text-align: center;">
      
       <div style="min-height: 30px;"></div>
        
        <ion-list>
        <div class="chang-nickname-hint">精华帖、置顶帖是有时间限制的</div>
        <ion-item>
        <ion-label>结束日期</ion-label>
        <ion-datetime displayFormat="YYYY-MM-DD"
                      [(ngModel)]="endDate"
                      cancelText="取消"
                      doneText="确定"
                      [min]="min"
                      [max]="max"
                      >

        </ion-datetime>
    </ion-item>
      
      </ion-list>
      <button ion-button (click)="confirm()" color="navbar-color" style="margin: 0 auto; width: 80%;">确定</button>

    </ion-content >   
   `
})
export class EndDateChoose implements OnInit {

    endDate = "";
    min;
    max;
    constructor(public navCtrl: NavController,
                public warnCtrl: WarnService,
                public http: HttpService,
                public navParams: NavParams) {

        // date.getMonth()
        let date = new Date();
        let month = date.getMonth() >= 10 ? `${date.getMonth()}` : "0" + `${date.getMonth()}`;
        this.min = `${date.getFullYear()}`;
        this.max = `${date.getFullYear() + 1}`;
        // this.max = `${date.getFullYear() + 1}`+"-"+ month + "-" + `${date.getDate()}`;

    }


    ngOnInit() {

    }


    confirm(){

        if(this.endDate.length > 0){

            let array = this.endDate.split("-");
            let year = +array[0];
            let month = +array[1];
            let day = +array[2];
            let date =new Date(year,month,day);
            let sec = date.getTime()/1000;
            if(this.navParams.data.type == "top"){
                this.top(sec);
            } else {
                this.essence(sec);
            }

        } else {
           this.warnCtrl.toast("请选择终止日期");
        }

    }

    essence(endDate){


        let load = this.warnCtrl.loading();
        this.http.get("/post/setTop",{"code":this.navParams.data.item.code,location:"B",endDatetime:endDate}).then(res => {

            load.dismiss();
            this.warnCtrl.toast("精华帖设置成功");
            this.navParams.data.item["location"] = "B";
            this.navCtrl.pop();
        }).catch(error => {

            this.warnCtrl.toast("精华帖设置失败");
            load.dismiss();
        });

    }


    //  A置顶 B 精华 C 头条
    top(endDate){


          let load = this.warnCtrl.loading();
          this.http.get("/post/setTop",{"code":this.navParams.data.item.code,location:"A",endDatetime:endDate}).then(res => {

              load.dismiss();
              this.warnCtrl.toast("置顶成功");
              this.navParams.data.item["location"] = "A";
              this.navCtrl.pop();

          }).catch(error => {
              this.warnCtrl.toast("置顶失败");
              load.dismiss();
          });

    }
}