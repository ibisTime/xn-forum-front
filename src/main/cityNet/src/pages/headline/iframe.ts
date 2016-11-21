/**
 * Created by tianlei on 16/9/20.
 */
import {Component, AfterViewInit} from '@angular/core';
import {NavParams, NavController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";


@Component({

  template:`

<ion-header>
  <ion-navbar color="navbar-color">
    <ion-title>{{title}}</ion-title>
  </ion-navbar>
</ion-header>
<ion-content class="overx-visible">
   <iframe id="testIframe" style="height: 100%; width: 100%;border:0; background-color: white;">
     <p>loading...</p>
   </iframe>

</ion-content>
`
})
export class IFramePage implements AfterViewInit{
  url = "";
  title = "";


  constructor( public navPara: NavParams,
               public warnService: WarnService,
               public  navCtrl: NavController) {
    // this.url = navPara.data.url;
    this.title = navPara.data.title;
    this.url = navPara.data.url;

    //微信登陆成功
    window.addEventListener('message',e => {

      this.navCtrl.popToRoot();

    },false);

  }


  ngAfterViewInit(){

    setTimeout(() => {
      let load = this.warnService.loading('');
      let ele :any =  document.getElementById("testIframe");

      ele.onload = () => {
        load.dismiss();
      };

      ele.src = this.url;
    },500);

  }

}
