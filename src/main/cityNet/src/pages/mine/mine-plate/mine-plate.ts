/**
 * Created by tianlei on 2016/10/19.
 */
import {Component, OnInit} from '@angular/core';
import {CityService} from "../../../services/city.service";
import {HttpService} from "../../../services/http.service";
import {NavParams, NavController} from "ionic-angular";
import {BZPlatDetailPage} from "../../forum/detail/bzPlatDetail";

@Component({

    templateUrl:"mine-plate.html"
})
export class MinePlatePage implements OnInit {

    classification = [];
    items = [];
    constructor(public cityService: CityService,
                public http: HttpService,
                public  navParams: NavParams,
                public navCtrl: NavController) {

        this.items = navParams.data;
    }

    ngOnInit() {


    }

    goPlateDetail($event){

    }

    goPlate(item){
        this.navCtrl.push(BZPlatDetailPage,item);
    }



}
// code: "BK201610241702123322"
// kind: "4"
// location: "2"
// name: "知书会友"
// orderNo: "1"
// personCount: "2"
// pic: "http://121.43.101.148:8901/2016102417/20161029805023585300925.png"
// postCount: "1"
// remark: "2"
// siteCode: "GS2016102316173393111"
// status: "1"
// updateDatetime: "Oct 24, 2016 5:02:12 PM"
// updater: "hzyhAdmin"
// userId: "U2016102315460204043"