/**
 * Created by tianlei on 16/9/20.
 */
import {Component, AfterViewInit} from '@angular/core';
import {NavParams} from "ionic-angular";


@Component({

  template:`

<ion-header>
  <ion-navbar navbar-color>
    <ion-title>{{title}}</ion-title>
  </ion-navbar>
</ion-header>
<ion-content>
   <script>
   alert("112");
</script>
   <iframe id="testIframe" style="height: 100%; width: 100%;border:0; background-color: white;">
     <p>loading...</p>
   </iframe>

</ion-content>

`
})
export class IFramePage implements AfterViewInit{
  url = "";
  title = "";
  constructor( private navPara: NavParams) {
    // this.url = navPara.data.url;
    this.title = navPara.data.title;
    this.url = navPara.data.url;

  }

  ngAfterViewInit(){
    setTimeout(() => {
      let ele :any =  document.getElementById("testIframe");
      ele.src = this.url;
    },500);



  }

}
