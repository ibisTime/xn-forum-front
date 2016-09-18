import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/forum/forum.html'
})
export class ForumPage {

  segment: string = "yliao";
  isAndroid: boolean = false;
  imgHeight: string;
  pHeight: string;
  imgUrl: string;

  @ViewChild(Content) content: Content;

  constructor(private navCtrl: NavController,
              private platform: Platform) {
      this.isAndroid = platform.is('android');
      this.imgHeight = `${(this.platform.width()-16-50-16-16)/3 - 1}px`;
      this.pHeight = `${this.platform.height()}px`;
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
