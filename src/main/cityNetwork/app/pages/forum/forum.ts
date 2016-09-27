import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';
import {DetailPage} from "./detail/detail";
import {HttpService} from "../../services/http.service";
import {WarnService} from "../../services/warn.service";
import {ContentPage} from "./content/content";


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
              private warnCtrl : WarnService,
              private http: HttpService) {
      this.isAndroid = platform.is('android');
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
      this.start = 1;
      this.limit = 10;
      this.queryPostPage();
  }
  jsDateDiff(publishTime){       
        var d_minutes,d_hours,d_days;       
        var timeNow = new Date().getTime()/1000;       
        var d;       
        d = timeNow - publishTime;       
        d_days = d/86400;       
        d_hours = d/3600;       
        d_minutes = d/60;       
        if(d_days>0 && d_days<4){       
            return d_days+"天前";       
        }else if(d_days<=0 && d_hours>0){       
            return d_hours+"小时前";       
        }else if(d_hours<=0 && d_minutes>0){       
            return d_minutes+"分钟前";       
        }else{       
            var s = new Date(publishTime*1000);       
            // s.getFullYear()+"年";
            return (s.getMonth()+1)+"月"+s.getDate()+"日";       
        }       
  }  
  queryPostPage(event?, refresh?){
      this.http.get('/post/page',{
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
                for(i = 0; i < list.length; i++){
                    list[i].pic = list[i].pic.split(/\|\|/);
                    list[i].publishDatetime = this.jsDateDiff( new Date(list[i].publishDatetime).getTime() );
                    this.items.push(list[i]);
                }
                event && event.complete();
                if(i > 0){
                    this.start++;
                }
            }
        }).catch(error => {
            event && event.complete();
        });
  }
  praise(code, index){
      let loading = this.warnCtrl.loading('点赞中');
      this.http.post('/post/praise',{
          "type": "1",
          "postCode": code
        })
        .then((res) => {
            loading.dismiss();
            if(res.success){
                this.items[index].totalDzNum = +this.items[index].totalDzNum + 1;
            }else{
                this.warnCtrl.toast("点赞失败，请稍后重试!");
            }
        }).catch(error => {
            loading.dismiss();
        });
  }
  doRefresh(event){
        this.start = 1;
        this.queryPostPage(event, true);
  }
  doAppendData(event){
        this.queryPostPage(event);
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
  showDetail(code){
       this.navCtrl.push(DetailPage);
  }
  //打开帖子详情页
  openPage(code){
      this.navCtrl.push(ContentPage,{code: code});
  }
}
