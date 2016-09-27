import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';
import {DetailPage} from "./detail/detail";
import {HttpService} from "../../services/http.service";


@Component({
  templateUrl: 'build/pages/forum/forum.html'
})
export class ForumPage {

  segment: string = "yliao";
  isAndroid: boolean = false;
  imgHeight: string;
  pHeight: string;
  imgUrl: string;
  start: number;
  limit: number;
  items = [];

  @ViewChild(Content) content: Content;

  constructor(private navCtrl: NavController,
              private platform: Platform,
              private http: HttpService) {
      this.isAndroid = platform.is('android');
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
      this.start = 1;
      this.limit = 10;
      this.queryPostPage();
  }
  queryPostPage(){
      this.http.post('/post/page',{
          "start": this.start,
          "limit": this.limit
        })
        .then((res) => {
            if(res.success){
                let list = res.data.list;
                for(let i = 0; i < list.length; i++){
                    list.pic = list.pic.split(/\|\|/);
                }
                this.items.push(list);
            }
            
            //loading.dismiss();
        }).catch(error => {
            //loading.dismiss();
        });
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
  showDetail(e){
       this.navCtrl.push(DetailPage);
  }
}
