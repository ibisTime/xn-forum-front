import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/forum/content/content.html'
})
export class ContentPage {

  segment: string = "all";
  isAndroid: boolean = false;
  imgHeight: string;
  pHeight: string;

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
