/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter,ViewChild, ElementRef} from '@angular/core';
import {Platform} from "ionic-angular";
import {HttpService} from "../../services/http.service";

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
                public http: HttpService) {

    }

    @Input() siteCode;
    @Input() currentPlats = [];

    @Input() set classification(classification: Array){
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
        let obj = {
            "siteCode":this.siteCode,
            "kind":dkey
        }
        this.http.get('/plate/list',obj).then(res => {
            this.currentPlats = res.data;

        }).catch(error => {

        });
    }

    goPlate(){

        this.goPlateEmitter.emit('11');
    }


}



// dkey: "21"
// dvalue: "其他"
// id: 59
// parentKey: "plate_kind"
// remark: ""
// toSystem: "8"
// type: "1"
// updateDatetime: "Oct 11, 2016 4:26:40 PM"
// updater: "admin"