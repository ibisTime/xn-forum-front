import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content, NavParams} from 'ionic-angular';
import {HttpService} from "../../../services/http.service";
import {WarnService} from "../../../services/warn.service";


@Component({
  templateUrl: 'build/pages/forum/content/content.html'
})
export class ContentPage {

  segment: string = "all";
  isAndroid: boolean = false;
  imgHeight: string;
  pHeight: string;
  code: string;
  item = {totalDzNum: ""};

  @ViewChild(Content) content: Content;

  constructor(private navPara: NavParams,
              private navCtrl: NavController,
              private platform: Platform,
              private warnCtrl : WarnService,
              private http: HttpService) {
      this.isAndroid = platform.is('android');
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
      this.code = navPara.data.code;
      this.getPostDetail();
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
  follow(){

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
                this.item.totalDzNum = (+this.item.totalDzNum + 1) + "";
            }else{
                this.warnCtrl.toast("点赞失败，请稍后重试!");
            }
        }).catch(error => {
            loading.dismiss();
        });
  }
  sendMsg(){}
  getPostDetail(){
      this.http.get('/post/get',{
          "postCode": this.code
        })
        .then((res) => {
            if(res.success){
                var data = res.data;
                data.pic = data.pic.split(/\|\|/);
                data.publishDatetime = this.jsDateDiff( new Date(data.publishDatetime).getTime() );
                this.item = data;
            }
        }).catch(error => {
        });
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg2");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img2").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg2");
      sDiv.className = sDiv.className + " hidden";
  }
  doFocus(e){
      setTimeout(()=>{
          window.scrollTo(0, 1000);
      }, 1);
  }
}
