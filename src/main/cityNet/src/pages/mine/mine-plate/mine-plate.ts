/**
 * Created by tianlei on 2016/10/19.
 */
import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../services/city.service";
import {HttpService} from "../../../services/http.service";

@Component({

    template:`
    <ion-header>
      <ion-navbar color="navbar-color">
        <ion-title>我的板块</ion-title>
     </ion-navbar>
    </ion-header>

    <ion-content style="background-color: white;">
      <plat-choose-view
                    (goPlateEmitter)="goPlateDetail($event)"
                    [classification]="classification"
                    [siteCode]="cityService.currentCity.code"
            >
      </plat-choose-view>
    </ion-content>
     `
})
export class MinePlatePage implements OnInit {

    classification = [];
    constructor(public cityService: CityService,
                public http: HttpService) {
    }

    ngOnInit() {

        this.getClass();

    }

    goPlateDetail($event){

    }

    getClass() {

        if(this.classification.length > 0){
            return;
        }

        let obj = {
            "parentKey": "plate_kind"
        }
        this.http.get("/general/dict/list", obj).then(res => {

            let data = res["data"];
            if(data instanceof Array){
                this.classification = res["data"];

            }

        }).catch(res => {

        });
    }

}