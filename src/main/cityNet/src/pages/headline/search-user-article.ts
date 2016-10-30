/**
 * Created by tianlei on 16/9/21.
 */
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {MineDetailPage} from "../mine/detail/detail";
import {UserService} from "../../services/user.service";

@Component({

  templateUrl: 'search-user-article.html',
  styles:[`
  .current-btn{
  background-color:  white;
  color: rgb(206,63,66);
  }
  `]
})
export class SearchUserAndArticlePage implements AfterViewInit {
  // @ViewChild('left') left: ElementRef;

  show = true;
  articles = [];
  users = [];

  type = "left";
  resultUser = false;
  resultArticle = false;

  constructor(public  navCtrl: NavController,
              public  http: HttpService,
              public  warn: WarnService,
              public  userService: UserService
         ) {

  }


  back(){
    this.navCtrl.pop();
  }


  changType($event){
    if($event=="left"){
      this.type = "left";
    } else  {
      this.type = "right";
    }
  }


  ngAfterViewInit(){

  }

  goUserDetail(item){
    // let user = {
    //   "userName": item.userName,
    //   "userId": item.uesrId,
    //   "photo":item.userExt.photo || ""
    // };
    this.navCtrl.push(MineDetailPage,item);
  }

  search(keyword){
    if(keyword.length > 0){
      if(this.type == "left"){

        this.searchUser(keyword);

      } else {
        this.searchArticle(keyword);
      }

    }

  }


  searchUser(keyword){

    let load = this.warn.loading("正在努力搜索中...");
    let obj = {
       "nickname" : keyword
    };
    this.http.get("/user/list",obj).then(res => {

      load.dismiss();
      this.users = res.data;
      this.resultUser = res.data.length <= 0;

      if(this.users.length > 0 && this.users[0].userId == this.userService.userId){
        this.users = [];
      }

    }).catch(error => {

      load.dismiss();

    });


  }


  searchArticle(keyword){

    let load = this.warn.loading("正在努力搜索中...");
    let obj = {
      "start":1,
      "limit": 1000,
      "status" : "BD",
      "keyword":  keyword
    };

    this.http.get("/post/page",obj).then(res => {

      this.articles = res.data.list;
      this.resultArticle = res.data.list.length <= 0;
        load.dismiss();

    }).catch(error => {

       load.dismiss();

    })

  }

}
