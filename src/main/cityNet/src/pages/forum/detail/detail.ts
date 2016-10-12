import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';
import {ContentPage} from '../content/content';
import {HttpService} from "../../../services/http.service";
import {PlatService} from "./plat.services";


@Component({
  templateUrl: 'detail.html',
    providers: [PlatService]
})
export class DetailPage {

  segment: string = "all";
  imgHeight: string;
  pHeight: string;
  platCode = ""

    @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public http: HttpService,
              public platService: PlatService
              ) {
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
  }
  showImg(ev){
      if( ev.target.nodeName.match(/^img$/i) ){
          let img = ev.target;
          let sDiv = document.getElementById("ylImg1");
          sDiv.className = sDiv.className.replace(/\s*hidden\s*/, "");
          document.getElementById("yl-img1").setAttribute("src", img.src);
      }
  }
  closeImg(){
      let sDiv = document.getElementById("ylImg1");
      sDiv.className = sDiv.className + " hidden";
  }

  openContent(){
      this.navCtrl.push(ContentPage);
  }

    loadModeTopArticle(){

    }

  article(){
      let obj = {
          isHeadline: "",//头条
          isTop: "",//置顶
          plateCode: this.platCode,//板块代码
          isEssence: ""//精华
      }
      this.http.get("/post/page")
  }
}
