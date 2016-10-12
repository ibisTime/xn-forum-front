/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {Platform} from "ionic-angular";

@Component({
    selector: 'forum-cell',
    templateUrl: 'forum-cell.component.html'
})
export class ForumCell implements OnInit {

    @Input() item;

    /*详情事件*/
    @Output() articleDetailEmitter = new EventEmitter();


    imgHeight;
    pHeight;
    constructor(public platform: Platform) {

        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.pHeight = `${this.platform.height()}px`;

    }

    ngOnInit() {
    }

    openPage(item){
        this.articleDetailEmitter.emit(item);
    }
    showImg(ev){
        if( ev.target.nodeName.match(/^img$/i) ){
            let img = ev.target;
            let sDiv = document.getElementById("ylImg");
            sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
            document.getElementById("yl-img").setAttribute("src", img.src);
        }
    }
    closeImg(){
        let sDiv = document.getElementById("ylImg");
        sDiv.className = sDiv.className + " hidden";
    }

}

// approveDatetime: "Oct 12, 2016 2:02:10 PM"
// approveNote: "11"
// approver: "U201600000000000000"
// code: "TZ2016101211362572125"
// content: "test test test "
// isDZ: "0"
// isSC: "0"
// nickname: "05823244"
// pic: Array[
//     1
//     ]
// plateCode: "BK2016101118522446147"
// publishDatetime: "Oct 12, 2016 11:36:25 AM"
// publisher: "U2016100913405823244"
// status: "1"
// title: "324324"
// totalCommNum:
//     3
// totalDzNum:
//     0