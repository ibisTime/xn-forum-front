/**
 * Created by tianlei on 16/9/22.
 */
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ViewController, Platform} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";

@Component({
  templateUrl: 'send-article.html'
})
export class SendArticlePage implements OnInit, AfterViewInit {

  // topicItems = [
  //   {'title': '招聘', 'src': 'images/forum/forum-zp.png'},
  //   {'title': '二手', 'src': 'images/forum/forum-es.png'},
  //   {'title': '出租', 'src': 'images/forum/forum-cz.png'},
  //   {'title': '求助', 'src': 'images/forum/forum-qz.png'},
  //   {'title': '便民', 'src': 'images/forum/forum-bm.png'},
  //   {'title': '车友', 'src': 'images/forum/forum-cy.png'},
  //   {'title': '情感', 'src': 'images/forum/forum-qg.png'},
  //   {'title': '吃货', 'src': 'images/forum/forum-ch.png'}
  // ];
  showTopicDashboard = false;
  isEditing = false;
  height;
  images:Array<any> = [];
  uploadImages = [];
  topicItems = [];
  topicCode = "";
  plateName = "选择板块";

  constructor(private viewCtrl: ViewController,
              private platform: Platform,
              private http: HttpService,
              private user: UserService,
              private warn: WarnService,
              private cityS: CityService) {
    this.height = `${(this.platform.width() - 10)/3.0}px`;
  }

  ngOnInit() {

  }

  ngAfterViewInit(){
  }

  handleImg(src,imgId){

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

      let src = cxt.toDataURL();

      let date = new Date();
      date.getMilliseconds();
      let imgItem = {
        "src": src,
        "id": date.getMilliseconds()
      }

      thisCopy.images.push(imgItem);

    }


  }

  cancle(){
    this.viewCtrl.dismiss();
  }

  send(titleIput,contentTextarea){

    if(contentTextarea.value.length <= 0){
      this.warn.alert('帖子内容不能为空');
      return;
    }

    if(titleIput.value.length <= 0){
      titleIput.value = "";
    }

    if(this.topicCode.length <= 0){
      this.warn.alert('请选择板块块');
      return;
    }

    /*1. 上传全部图片，并拼接全部URL*/
    if(this.uploadImages.length > 0){

      let pics = [];
      let len = 0;
      let tag = 0;
      let imgCount = this.uploadImages.length;

     let imgPromise = new Promise((resolve, reject) =>{

        this.uploadImages.forEach((value,index,array) => {
          let msgItem = {
            "photo":value.src
          }

          this.http.post("/user/upload/img",msgItem).then(res => {

            if (typeof(res.data) == "string") {

              pics.push(res.data)
              len++;
              if(len == imgCount){
                /*拼接图片URL字符串*/
                let picStr = "";
                pics.forEach((value,index,array) => {
                  picStr += index == 0? value : ("||" + value);
                });

                resolve(picStr);
              }

            } else {

              reject("图片上传失败");

            }

          }).catch(error => {

            reject("图片上传失败");

          });


        });


      });

      imgPromise.then(picStr => {


        /*2. 发帖*/
        let articleObj = {
          "title": titleIput.value,
          "content": contentTextarea.value,
          "plateCode": this.topicCode,
          "pic": picStr,
          "publisher": this.user.userId
        };

        return this.http.post("/post/publish",articleObj);

      }).then(res => {

        this.warn.toast('发帖成功');
      }).catch(error => {

        this.warn.toast('发帖失败');

      });


    } else {
      /*2. 发帖无图片*/
      let articleObj = {
        "title": titleIput.value,
        "content": contentTextarea.value,
        "plateCode": this.topicCode,
        "publisher": this.user.userId
      };

       this.http.post("/post/publish",articleObj).then(res => {

         this.warn.toast('发帖成功');
         this.viewCtrl.dismiss();

       }).catch(error => {
         this.warn.toast('发帖失败');
       });


    }




  }


  /*选择话题*/
  chooseTopic(){

    if(this.topicItems.length > 0){

      this.showTopicDashboard = !this.showTopicDashboard;
      return;
    }
    /*查询话题*/
    let load = this.warn.loading("加载中");
    let obj = {
      "siteCode": this.cityS.currentCity.code
    };
    this.http.get("/plate/list",obj).then(res => {

      console.log(res);
      this.topicItems = res.data;
      load.dismiss().then(res => {
        this.showTopicDashboard = !this.showTopicDashboard;
      });

    }).catch(error => {

      load.dismiss().then(res => {
        this.warn.toast("获取模块失败");
      });

    });

  }

  hidden(){
    this.showTopicDashboard = !this.showTopicDashboard;
  }

  /*点击话题，选择*/
  clickTopic(siteCode,name){
    this.topicCode = siteCode;
    this.plateName = name;
    this.showTopicDashboard = false;
  }


  choosedImg($event){

    console.log($event);
    let fileReader = new FileReader();
    fileReader.onload = (event: any)=> {

      let d = new Date();
      let imgId =  d.toString();
      this.handleImg(event.target.result,imgId);

      /*处理真是上传的图片*/
      let img = {
        "src": encodeURIComponent(event.target.result),
        "id" : imgId
      }
      this.uploadImages.push(img);

    };
    let file = $event.target.files[0];
    if(file == null) return;
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

    /*处理真是上传列表*/
    let upLoadIndex;
    this.uploadImages.find((value, index, obj) => {
      if (value.id == img.id) {
        upLoadIndex = index;
      }
      return value.id == img.id;
    });
    this.uploadImages.slice(upLoadIndex,1);

  }

  editing($event){
    // console.log($event.target.style);
    let ele = document.getElementById("article-content");

    if($event.target.value.length > 0){
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }

  }


}
