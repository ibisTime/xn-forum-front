/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter,ViewChild, ElementRef} from '@angular/core';
import {Platform} from "ionic-angular";
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
    @ViewChild('firstClass') firstClassEle: ElementRef;

    @Output() goPlateEmitter = new EventEmitter<any>();

    constructor(public platform: Platform,
                public http: HttpService,
                public warn: WarnService) {

    }

    @Input() siteCode;
    @Input() currentPlats = [];

    @Input() set classification(classification){
        this.firstClassItem.push(classification[0]);
        this.getPlateByKind(this.firstClassItem[0].dkey);
        this._classification = classification.slice(1,classification.length - 1);
    }

    ngOnInit() {


    }
    selectClass($event,item){
        if(typeof(this.lastSelect)=="undefined"){
            this.lastSelect = this.firstClassEle.nativeElement;
        }
       this.lastSelect.style.backgroundColor = '#f5f5f5';
        $event.target.style.backgroundColor = "white";
        this.lastSelect = $event.target;

       this.getPlateByKind(item.dkey);

    }

    getPlateByKind(dkey){
       let load = this.warn.loading('加载中');
        let obj = {
            "siteCode":this.siteCode,
            "kind":dkey
        }
        this.http.get('/plate/list',obj).then(res => {
             // = res.data;

            this.currentPlats = res.data.sort((a,b) => {
                return (+a.orderNo) - (+b.orderNo);
            })
            load.dismiss();
        }).catch(error => {
            load.dismiss().then(() => {
                this.warn.toast('获取失败');
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
// dkey: "21"
// dvalue: "其他"
// id: 59
// parentKey: "plate_kind"
// remark: ""
// toSystem: "8"
// type: "1"
// updateDatetime: "Oct 11, 2016 4:26:40 PM"
// updater: "admin"

