/**
 * Created by tianlei on 16/9/21.
 */
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer} from '@angular/core';
import {NavController} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";

@Component({

  templateUrl: 'search-user-article.html',
  styles:[`
  .current-btn{
  background-color:  white;
  color: rgb(206,63,66);
  }
  `]
})
export class SearchUserAndArticlePage implements OnInit, AfterViewInit {
  @ViewChild('left') left: ElementRef;

  result;
  show = true;
  articles = [];
  constructor(public  navCtrl: NavController,
              public  http: HttpService,
              public  warn: WarnService
         ) {

  }

  ngOnInit() {
  }

  back(){
    this.navCtrl.pop();
  }

  leftClick(){
    this.show = true;
  }

  rightClick(){
    this.show = false;

  }

  ngAfterViewInit(){

  }

  search(keyword){
    if(keyword.length > 0){
      this.searchArticle(keyword);
    }

  }

  searchArticle(keyword){

    let load = this.warn.loading("正在努力搜索中...");
    let obj = {
      "start":1,
      "limit": 1000,
      "keyword":  keyword
    };

    this.http.get("/post/page",obj).then(res => {

      this.result =  res.data.list.length <= 0;
      let list = res.data.list;
      if(list.length > 0){

          for (let i = 0; i < list.length; i++) {
            if (list[i].pic != null) {
              list[i].pic = list[i].pic.split(/\|\|/);
            }
          }
        this.articles = list;
        }

        load.dismiss();

    }).catch(error => {
       load.dismiss();

    })

  }

}
