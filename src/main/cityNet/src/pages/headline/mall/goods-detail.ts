/**
 * Created by tianlei on 2016/10/14.
 */
import {Component, OnInit} from '@angular/core';
import {Platform, NavParams, NavController} from "ionic-angular";
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {LoginPage} from "../../user/login";
import {CityService} from "../../../services/city.service";

@Component({
    templateUrl: 'goods-detail.html'
})
export class GoodsDetailPage implements OnInit {
    imgHeight;
    item;
    constructor(public platform:Platform,
                public navParams: NavParams,
                public http: HttpService,
                public warn: WarnService,
                public nav: NavController,
                public userService: UserService,
                public cityService: CityService

    ) {

        this.item = navParams.data;
        this.imgHeight = `${this.platform.width()*2/4.0}px`;

    }

    ngOnInit() {
    }

    buy(){

        if(!this.userService.user){
          this.nav.push(LoginPage);
            return;
        };

        if(this.userService.user.companyCode != this.cityService.currentCity.code){
            this.warn.alert("您不是该商城所属地区用户，不能进行商品兑换");
            return;
        }


        let load = this.warn.loading();
        let obj = {
          "productCode":this.item.code,
          "quantity":"1"
        };

        this.http.post("/commodity/buyProduct",obj).then(res => {
            load.dismiss().then(res => {
               this.nav.pop();
            });
            this.warn.toast("兑换成功");
        }).catch(error => {

            load.dismiss();

        })

    }
}