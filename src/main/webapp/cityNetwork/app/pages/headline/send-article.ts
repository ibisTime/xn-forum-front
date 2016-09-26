/**
 * Created by tianlei on 16/9/22.
 */
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ViewController, Platform} from "ionic-angular";
import {Symbol} from "rxjs";

// const wei_xin = true;
@Component({
  templateUrl: 'build/pages/headline/send-article.html'
})
export class SendArticlePage implements OnInit, AfterViewInit {

  topicItems = [
    {'title': '招聘', 'src': 'images/forum/forum-zp.png'},
    {'title': '二手', 'src': 'images/forum/forum-es.png'},
    {'title': '出租', 'src': 'images/forum/forum-cz.png'},
    {'title': '求助', 'src': 'images/forum/forum-qz.png'},
    {'title': '便民', 'src': 'images/forum/forum-bm.png'},
    {'title': '车友', 'src': 'images/forum/forum-cy.png'},
    {'title': '情感', 'src': 'images/forum/forum-qg.png'},
    {'title': '吃货', 'src': 'images/forum/forum-ch.png'}
  ];
  showTopicDashboard = false;
  isEditing = false;
  height;
  images:Array<any> = [];

  constructor(private viewCtrl: ViewController,
              private platform: Platform) {
    this.height = `${(this.platform.width() - 10)/3.0}px`;
  }

  ngOnInit() {

  }
  ngAfterViewInit(){

    setTimeout(() => {
      this.handleImg("images/test.jpg");

    },1000);

  }

  handleImg(src){

    let thisCopy = this;
    let img = <HTMLImageElement>document.createElement('img');
    /*图片加载*/
    img.src = src;

    /*加载成功*/
    img.onload = (ev) => {

      let trueLong = (this.platform.width() - 10 - 3 * 6) / 3.0;

      let imgW = img.naturalWidth;
      let imgH = img.naturalHeight;
      let react = {
        offsetX: 0,
        offsetY: 0,
        width: 0,
        height: 0
      }

      if (imgW >= imgH) {
        react.offsetX = (imgW - imgH) / 2.0;
        react.width = imgH;
        react.height = imgH;
      } else {
        react.offsetY = (imgH - imgW) / 2.0;
        react.width = imgW;
        react.height = imgW;
      }

      img.crossOrigin = "*";
      let cxt = <HTMLCanvasElement>document.createElement("canvas");
      cxt.width = trueLong;
      cxt.height = trueLong;

      // cxt.style.width = `${0.5*trueLong}px`;
      // cxt.style.width  =  `${0.5*trueLong}px`;

      let cxtRenderer = cxt.getContext("2d");

      cxtRenderer.drawImage(img, react.offsetX, react.offsetY,
        react.height, react.width, 0, 0, cxt.width, cxt.height);

      let src = cxt.toDataURL("image/jpeg");

      let date = new Date();
      date.getMilliseconds()
      let imgItem = {
        "src":src,
        "id": date.getMilliseconds()
      }

      thisCopy.images.push(imgItem);

    }


  }

  cancle(){
    this.viewCtrl.dismiss();
  }


  send(){
  }


  /**/
  chooseTopic(){
    this.showTopicDashboard = !this.showTopicDashboard;
  }
  hidden(){
    this.showTopicDashboard = !this.showTopicDashboard;
  }

  /*点击话题，选择*/
  clickTopic(){
    this.showTopicDashboard = false;
  }


  choosedImg($event){

    console.log($event);
    let fileReader = new FileReader();
    fileReader.onload = (event: any)=> {

      this.handleImg(event.target.result);

    };
    fileReader.readAsDataURL($event.target.files[0]);
    // $event.target.files[0] = null;

  }

  imgTrack(index,item){
    return item.id;
  }

  /*删除图片*/
  deleteImg(img){

    let index = this.images.indexOf(img);
    this.images.splice(index,1);
    // this.images = this.images.splice(index,1);

  }

  editing($event){
    // console.log($event.target.style);
    let ele = document.getElementById("article-content");
    console.log(ele.style);

    if($event.target.value.length > 0){
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }
  }


}
