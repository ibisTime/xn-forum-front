import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, Content} from 'ionic-angular';
import {ContentPage} from '../content/content';


@Component({
  templateUrl: 'build/pages/forum/detail/detail.html'
})
export class DetailPage {

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
}
