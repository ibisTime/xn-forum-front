/**
 * Created by tianlei on 2016/10/11.
 */
import {Component, OnInit, Input,Output, EventEmitter} from '@angular/core';
import {Platform, NavController, ActionSheetController, Events, App} from "ionic-angular";
import {WarnService} from "../../services/warn.service";
import {HttpService} from "../../services/http.service";
import {MineDetailPage} from "../../pages/mine/detail/detail";
import {UserService} from "../../services/user.service";
import {ContentPage} from "../../pages/forum/content/content";
import {LoginPage} from "../../pages/user/login";

@Component({
    selector: 'forum-cell',
    templateUrl: 'forum-cell.component.html'
})
export class ForumCell implements OnInit {

    
    _item;
    /*详情事件*/
    // @Output() articleDetailEmitter = new EventEmitter();
    @Input() navCtrl: NavController;

    imgHeight;
    pHeight;
    @Input() isHideCom = true;
    @Input() isHideSC = false;
    @Input() isHideComBtn = false;
    constructor(public platform: Platform,
                public warnCtrl: WarnService,
                public uService : UserService,
                public actionSheetCtrl: ActionSheetController,
                public http: HttpService,
                public events: Events,
                public app: App) {

        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
        this.pHeight = `${this.platform.height()}px`;

    }

    ngOnInit() {
    }

    @Input()
    set item(item){
        if(item.content.length > 100){
            item.content = item.content.substr(0, 100) + "...<a class='all-cont'>全文</a>";
        }
        item.content = item.content.replace(/(@[^\s]*)\s/ig, "<a class='people'>$1</a>");
        this._item = item;
    }

    /*点击头像去详情页*/
    goDetail(event, article){
        event.stopPropagation();
        this.navCtrl.push(MineDetailPage, {publisher: article});
    }

    /*没登录 让登陆*/
    wetherGoLogin(){
        if(!this.uService.user){
           let nav = this.app.getActiveNav();
            nav.push(LoginPage);
            return false;
        };
        return true;
    }

    /*收藏*/
    collect(ev, code, flag?){
        ev.stopPropagation();
        if(!this.wetherGoLogin()){
          return;
        };

        if(!this._item.collectCount){
            this._item.collectCount = 1;
            this.http.post('/post/praise',{
                "type": "2",
                "postCode": code
            }).then((res) => {
                this._item.collectCount = 0;
                if(res.success){
                    if(!flag){
                        this._item.isSC = "1";
                    }else{
                        this._item.isSC = "0";
                    }
                }else{
                    if(!flag){
                        this.warnCtrl.toast("收藏失败，请稍后重试!");
                    }else{
                        this.warnCtrl.toast("取消收藏失败，请稍后重试!");
                    }
                }
            }).catch(error => {
                this._item.collectCount = 0;
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
    praise(ev, code, flag?){
        ev.stopPropagation();
        if(!this.wetherGoLogin()){
            return;
        };
        if(!this._item.praiseCount){
            this._item.praiseCount = 1;
            this.http.post('/post/praise',{
                "type": "1",
                "postCode": code
            })
                .then((res) => {
                    this._item.praiseCount = 0;
                    if(res.success){
                        if(!flag){
                            this._item.totalLikeNum = +this._item.totalLikeNum + 1;
                            this._item.isDZ = "1";
                            if(!this.isHideCom){
                                this._item.likeList.push({
                                    talker:this.uService.userId,
                                    nickname: this.uService.user.nickname,
                                    postCode: code
                                });
                            }
                        }else{
                            if(!this.isHideCom){
                                for(let i = 0; i < this._item.likeList.length; i++){
                                    if(this._item.likeList[i].talker == this.uService.userId){
                                        this._item.likeList.splice(i, 1);
                                    }
                                }
                            }
                            this._item.totalLikeNum = +this._item.totalLikeNum - 1;
                            this._item.isDZ = "0";
                        }
                    }else{
                        if(flag){
                            this.warnCtrl.toast("取消点赞失败，请稍后重试!");
                        }else{
                            this.warnCtrl.toast("点赞失败，请稍后重试!");
                        }
                    }
                }).catch(error => {
                this._item.praiseCount = 0;
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


    openPage($event, item) {
        let target = $event.target;
        if (target.className == "people") {
            let load = this.warnCtrl.loading();
            let obj = {"nickname": target.innerText.substr(1, target.innerText.length - 1)};
            this.http.get("/user/list", obj).then(res => {
                load.dismiss();
                let user = res.data[0];
                this.navCtrl.push(MineDetailPage, {"userId": user.userId});
            }).catch(error => {
                console.log(error);
                load.dismiss();
                this.warnCtrl.toast('未查找到该用户');
            });
            $event.stopPropagation();

        } else {

            this.navCtrl.push(ContentPage, this._item);

        }
    }


    showImg(ev){
        if( ev.target.nodeName.match(/^img$/i)){


            let img = ev.target;
            // let sDiv = document.getElementById("ylImg");
            // sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
            // document.getElementById("yl-img").setAttribute("src", img.src);

            //把图片发送出去
            this.events.publish("displayImg",img.src);
        }
        ev.stopPropagation();
    }
    //
    // closeImg(){
    //     let sDiv = document.getElementById("ylImg");
    //     sDiv.className = sDiv.className + "hidden";
    // }

    tapComment(ev, commer, code){
        ev.stopPropagation();
        if(!this.wetherGoLogin()){
            return;
        };

        let buttons = [
            {
                text: '举报',
                handler: () => {
                    this.report(commer, code);
                }
            },{
                text: '取消',
                role: 'cancel'
            }
        ];
        if(this.uService.userId == commer){
            buttons.unshift({
                text: '删除',
                handler: () => {
                    this.deleteComment(commer, code);
                }
            });
        }
        let actionSheet = this.actionSheetCtrl.create({
        title: '操作',
        buttons: buttons
        });
        actionSheet.present();
    }
    report(commer, code){

    }
    deleteComment(commer, code){

    }

}

// Object
// code: "TZ2016101423003422779"
// collectCount:0
// commentList: Array[4]
// content: "321312"
// isDZ: "0"
// isSC: "0"
// likeList: Array[0]
// nickname: "我是？？？"
// picArr: Array[1]
// plateCode: "BK2016101413580681223"
// praiseCount:0
// publishDatetime: "Oct 14, 2016 11:00:34 PM"
// publisher: "U2016101412435083050"
// status: "0"
// title: "323"
// totalCommNum:4
// totalLikeNum:0
// totalReadTimes:0