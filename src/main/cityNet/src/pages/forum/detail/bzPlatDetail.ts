import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, ModalController} from 'ionic-angular';
import {PlatDetailPage} from "../detail/platDetail";
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";
import {UserService} from "../../../services/user.service";
import {ContentPage} from "../content/content";
import {LoginPage} from "../../user/login";
import {ChatRoomPage} from "../../mine/im/chat-room";
import {MineDetailPage} from "../../mine/detail/detail";
import {CityService} from "../../../services/city.service";

@Component({
  templateUrl: 'bzPlatDetail.html'
})
export class BZPlatDetailPage {

  segment: string = "isCheck";
  isAndroid: boolean= false;
  imgHeight: string;
  pHeight: string;
  imgUrl: string;
  start: number;
  limit: number;
  items = [];
  isEnd = false;
  appendCount = 0;

    nav;
  /*分类*/
  classification = [];

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public warnCtrl : WarnService,
              public uService : UserService,
              public mCtrl: ModalController,
              public http: HttpService,
              public cityService: CityService) {
      this.nav = navCtrl;

      this.start = 1;
      this.limit = 10;
      this.queryPostPage();
      this.getClass();
  }
  showLogin(){
    let modelCtrl = this.mCtrl.create(LoginPage);
    modelCtrl.present();
  }
  
  queryPostPage(event?, refresh?){
      return this.http.get('/post/page',{
            "start": this.start,
            "limit": this.limit
            })
            .then((res) => {
                if(res.success){
                    let list = res.data.list;
                    let i = 0;
                    if(refresh){
                        this.items = [];
                    }
                    if(!list.length){
                        this.isEnd = true;
                    }
                    for(i = 0; i < list.length; i++){
                        list[i].commentList.splice(5);
                        list[i].collectCount = 0;   //点击收藏次数
                        list[i].praiseCount = 0;    //点击点赞次数
                        this.items.push(list[i]);
                    }
                    if(i > 0){
                        this.start++;
                    }
                }
                console.log(this.items);
                
                this.appendCount = 0;
                event && event.complete();
            }).catch(error => {
                this.appendCount = 0;
                event && event.complete();
            });
  }

  doRefresh(event){
        this.start = 1;
        this.isEnd = false;
        this.queryPostPage(event, true);
  }

  doAppendData(event){
        if(!this.appendCount && !this.isEnd){
            this.appendCount = 1;
            this.queryPostPage(event);
        }else{
            event.complete();
        }

  }

    /*帖子详情*/
    openPage($event) {
        let target = $event.event.target;
        if(target.className == "people"){
            //点击@

            $event.event.stopPropagation();
            return;
        }else{
            this.navCtrl.push(ContentPage, $event);
        }
    }

    /*聊天*/
    goChat(userId) {
        this.navCtrl.push(ChatRoomPage, userId);
    }

    goDetail(toId) {
        this.navCtrl.push(MineDetailPage, {toUserId: toId});
    }


  /*分类数据*/
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
