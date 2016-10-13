/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {Platform, NavController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";
import {HttpService} from "../../services/http.service";
import {MineDetailPage} from "../../pages/mine/detail/detail";

@Component({
    selector: 'forum-cell',
    templateUrl: 'forum-cell.component.html'
})
export class ForumCell implements OnInit {

    @Input() item;
    /*详情事件*/
    @Output() articleDetailEmitter = new EventEmitter();
    @Input() navCtrl: NavController;

    imgHeight;
    pHeight;
    constructor(public platform: Platform,
                public warnCtrl: WarnService,
                public http: HttpService) {

        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.pHeight = `${this.platform.height()}px`;

    }

    ngOnInit() {
    }

    /*点击头像去详情页*/
    goDetail(toId){
        this.navCtrl.push(MineDetailPage, {toUserId: toId});
    }

    /*收藏*/
    collect(code, index, flag?){
        if(!this.item.collectCount){
            this.item.collectCount = 1;
            this.http.post('/post/praise',{
                "type": "2",
                "postCode": code
            }).then((res) => {
                this.item.collectCount = 0;
                if(res.success){
                    if(!flag){
                        this.item.isSC = "1";
                    }else{
                        this.item.isSC = "0";
                    }
                }else{
                    if(!flag){
                        this.warnCtrl.toast("收藏失败，请稍后重试!");
                    }else{
                        this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                    }
                }
            }).catch(error => {
                this.item.collectCount = 0;
                if(!flag){
                    this.warnCtrl.toast("收藏失败，请稍后重试!");
                }else{
                    this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                }
            });
        }else{
            this.warnCtrl.toast("请勿重复点击!");
        }
    }

    /*点赞*/
    praise(code, index, flag?){
        if(!this.item.praiseCount){
            this.item.praiseCount = 1;
            this.http.post('/post/praise',{
                "type": "1",
                "postCode": code
            })
                .then((res) => {
                    this.item.praiseCount = 0;
                    if(res.success){
                        if(!flag){
                            this.item.totalDzNum = +this.item.totalDzNum + 1;
                            this.item.isDZ = "1";
                        }else{
                            this.item.totalDzNum = +this.item.totalDzNum - 1;
                            this.item.isDZ = "0";
                        }
                    }else if(res.timeout){
                        this.warnCtrl.toast("登录超时，请重新登录!");
                    }else{
                        if(flag){
                            this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                        }else{
                            this.warnCtrl.toast("点赞失败，请稍后重试!");
                        }
                    }
                }).catch(error => {
                this.item.praiseCount = 0;
                if(flag){
                    this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                }else{
                    this.warnCtrl.toast("点赞失败，请稍后重试!");
                }
            });
        }else{
            this.warnCtrl.toast("请勿重复点击!");
        }
    }


    /*去详情页*/
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