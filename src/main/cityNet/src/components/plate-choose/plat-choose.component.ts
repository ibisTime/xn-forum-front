/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter,ViewChild, ElementRef} from '@angular/core';
import {Platform, Events} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";

@Component({
    selector: 'plat-choose-view',
    templateUrl: 'plat-choose.component.html'
})
export class PlatChooseView implements OnInit {

     _classification;
    firstClassItem = [];
    lastSelect;
    imgHeight;
    rightHeight;
    currentCode;
    @ViewChild('firstClass') firstClassEle: ElementRef;

    @Output() goPlateEmitter = new EventEmitter<any>();

    constructor(public platform: Platform,
                public http: HttpService,
                public warn: WarnService,
                public events: Events) {

        this.rightHeight = `${platform.height() - 49 - 44}px`;
        this.events.subscribe('user:cityChange',() => {

            this.getPlateByKind(this.currentCode);

        });

        this.events.subscribe('forum:refresh',() => {

            this.getPlateByKind(this.currentCode);


        });



    }


    @Input() siteCode;
    @Input() currentPlats = [];

    @Input() set classification(classification){

        console.log("选择了");
        if(this.lastSelect){
         console.log("选择了");
            //
            this.lastSelect.style.backgroundColor = 'rgb(240,240,240)';
            this.lastSelect = document.getElementById("firstClass_li");
            // this.lastSelect.style.backgroundColor = "white";
        }

        this.firstClassItem = [];
        this._classification = [];

        if(classification.length <= 0){

            this.firstClassItem = [];

        } else {
            this.firstClassItem.push(classification[0]);

            this.currentCode = this.firstClassItem[0].code;
            this.getPlateByKind(this.firstClassItem[0].code);

            let len = classification.length;
            this._classification = classification.slice(1, len);
        }

    }

    ngOnInit() {


    }

    selectClass($event,item){
        if(typeof(this.lastSelect)=="undefined"){
            this.lastSelect = this.firstClassEle.nativeElement;
        }
        //
       this.lastSelect.style.backgroundColor = "rgb(240,240,240)";
        $event.target.style.backgroundColor = "white";
        this.lastSelect = $event.target;

       this.getPlateByKind(item.code);

    }

    getPlateByKind(code){

        let load = this.warn.loading('加载中');
        let obj = {
            "siteCode":this.siteCode || "",
            "kind":code || ""
        }
        this.http.get('/plate/list',obj).then(res => {
             // = res.data;

            this.currentCode = code;
            this.currentPlats = res.data;
            // sort((a,b) => {
            //     return (+a.orderNo) - (+b.orderNo);
            // })
            load.dismiss();
        }).catch(error => {
            load.dismiss().then(() => {
            });
        });
    }

    goPlate(plat){

        this.goPlateEmitter.emit(plat);

    }



}

/*板块信息*/
// code: "BK2016101210295107361"
// kind: "19"
// location: "2"
// name: "宠物"
// orderNo: "1"
// personCount: "0"
// pic: "http://121.43.101.148:8901/2016101210/20161028610295172475228.png"
// postCount: "0"
// siteCode: "GS2016101110040872244"
// status: "1"
// updateDatetime: "Oct 12, 2016 10:29:51 AM"
// updater: "U2016093020201250058"
// userId: "U2016101302294421919"

/*分类*/
// Code: "FL2016111711121313666"
// companyCode: "GS2016103120465611137"
// name: "亲子"
// orderNo:
//     1
// parentCode: "0"
// pic: "http://121.43.101.148:8901/2016111711/20161132211122577526341.png"
// type: "1"


