/**
 * Created by tianlei on 16/9/22.
 */
import {Component, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ViewController, Platform, ModalController, NavParams, Events} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {AtPage} from "./at";
import {Keyboard} from "ionic-native"
import {document} from "@angular/platform-browser/src/facade/browser";

declare let EXIF:any;

@Component({
  templateUrl: 'send-article.html'
})
export class SendArticlePage implements AfterViewInit,OnDestroy {

  showTopicDashboard = false;
  isEditing = false;
  height;

  /*解决删除@时也会触发@事件*/
  lastLength = 0;

  images:Array<any> = [];
  uploadImages = []; // 对象 id 和 src

  topicItems = [];
  topicCode: string = "";
  plateName = "选择板块";
  timeNum;

  //草稿箱进入的帖子编码
  draftCode;

  title = "";
  content = "";
  @ViewChild('contentTextarea') textArea: ElementRef;


  constructor(public viewCtrl: ViewController,
              public platform: Platform,
              public http: HttpService,
              public userS: UserService,
              public warn: WarnService,
              public cityS: CityService,
              public model: ModalController,
              public navParams: NavParams,
              public events: Events) {

    this.height = `${(this.platform.width() - 10)/4.0}px`;

    //从草稿箱中读取
    if(navParams.data){

      this.title = navParams.data.title;
      this.content = navParams.data.content;
      this.draftCode = navParams.data.code;
      this.topicCode = navParams.data.plateCode;

      let obj = {
        // "siteCode": this.cityS.currentCity.code
        "siteCode": this.userS.user.companyCode

      };
      this.http.get("/plate/list",obj).then(res => {

        this.topicItems = res.data;
        this.topicItems.forEach((value,index,array) => {
          if(value.code == this.topicCode){
            this.plateName = value.name;
          }

        });

      }).catch(error => {

      });

      if(typeof(navParams.data.picArr) != "undefined"){
        navParams.data.picArr.forEach((value,index,array) =>{
          let date = new Date();

          let img = {
            "src": value,
            "id" : date.toString()
          }
          this.images.push(img);
          this.uploadImages.push(img);

        });

      }

    }
  }

  ngOnDestroy(){
    window.clearInterval(this.timeNum);
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
      // cxt.width = trueLong;
      // cxt.height = trueLong;
      cxt.width = 150;
      cxt.height = 150;


      let cxtRenderer = cxt.getContext("2d");

      cxtRenderer.drawImage(img, react.offsetX, react.offsetY,
          react.width,react.height, 0, 0, cxt.width, cxt.height);

      let src = cxt.toDataURL();

      let imgItem = {
        "src": src,
        "id": imgId
      }
      thisCopy.images.push(imgItem);

    }

  }


  cancle(titleIput,contentTextarea){

    if(
        (typeof(this.content) != "undefined" && this.content.length > 0)
        ||
        this.uploadImages.length > 0
    ){

      this.warn.alert2('是否保存为草稿',()=>{

        this.sendOrSave(titleIput,contentTextarea,"save");

      },()=> {

        this.viewCtrl.dismiss(false);

      })

    } else{
      this.viewCtrl.dismiss(false);
    }

      Keyboard.close();

  }


  send(titleIput,contentTextarea) {
    this.sendOrSave(titleIput,contentTextarea,"send");

  }

  sendOrSave(titleIput,contentTextarea,type){

    let url = "/post/publish";
    let isPublish = "1";
    if(typeof(this.draftCode) != "undefined"){
      url = "/post/draft/publish";
    }

    let successStr = "发帖成功";
    let failureStr = "发帖失败";

    if(type == "save"){
      if(typeof(this.draftCode) != "undefined"){
        url = "/post/draft/publish"; //草稿在变为草稿

      } else {
        url = "/post/publish";  //首次保存为草稿
      }
      isPublish = "0";
      successStr="保存为草稿成功";
      failureStr="保存为草稿失败";
    }


    if(contentTextarea.value.length <= 0){
      this.warn.alert('帖子内容不能为空');
      return;
    }


    if(!((typeof(this.topicCode) != "undefined") && this.topicCode.length > 0)){
      this.warn.alert('请选择板块');
      return;
    }

    let load = this.warn.loading("");

    /*1. 上传全部图片，并拼接全部URL*/
    if(this.uploadImages.length > 0){

      /*遍历图片数组 找出已上传 和 base64图片*/
      let pics = [];
      let base64Pics = [];
      this.uploadImages.forEach((value,index,array) => {
        if(/base64/.test(value.src)){

          base64Pics.push(value.src);

         }

      });



      let len = 0;
      let imgCount = base64Pics.length;

     /*图片上传*/
     let imgPromise = new Promise((resolve, reject) =>{

       if(imgCount <= 0){
         let picStr = "";
         pics.forEach((value,index,array) => {
           picStr += index == 0? value : ("||" + value);
         });

         resolve(picStr);

       } else { //有base64图片

         base64Pics.forEach((value,index,array) => {
           let msgItem = {
             "photo":value
           }

           this.http.post("/user/upload/img",msgItem).then(res => {

             if (typeof(res.data) == "string") {

               pics.push(res.data)
               len++;

               /*相等的话所有图片上传完成*/
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

       }

      });


      imgPromise.then(picStr => {


        /*2. 发帖*/
        let articleObj = {
          "content": contentTextarea.value,
          "plateCode": this.topicCode,
          "pic": picStr,
          "isPublish": isPublish
        };
        if((typeof (titleIput.value) != "undefined") &&(titleIput.value.length > 0)){
          articleObj["title"] = titleIput.value;
        }

        //草稿
        if(typeof(this.draftCode) != "undefined"){
          articleObj["code"] = this.draftCode;
        }

        return this.http.post(url,articleObj);

      }).then(res => {
        load.dismiss().then(()=> {

          this.viewCtrl.dismiss(true);

        });
        this.warn.toast(successStr);

      }).catch(error => {
        load.dismiss();
        // this.warn.toast(failureStr);

      });


    } else {
      /*2. 发帖无图片*/
      let articleObj = {
        "content": contentTextarea.value,
        "plateCode": this.topicCode,
        "isPublish": isPublish
      };
      if((typeof (titleIput.value) != "undefined") &&(titleIput.value.length > 0)){
        articleObj["title"] = titleIput.value;
      }

      //草稿
      if(typeof(this.draftCode) != "undefined"){
        articleObj["code"] = this.draftCode;
      }

       this.http.post(url,articleObj).then(res => {

         this.warn.toast(successStr);
         load.dismiss().then(res => {
           this.viewCtrl.dismiss(true);
         })

         this.events.publish("user:postSuccess");


       }).catch(error => {
         load.dismiss();
         // this.warn.toast(failureStr);
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
    let load = this.warn.loading("板块获取中...");

    /*改成只能在当前用户所属区域发帖*/
    let obj = {
      // "siteCode": this.cityS.currentCity.code
      "siteCode": this.userS.user.companyCode

    };

    this.http.get("/plate/list",obj).then(res => {

      this.topicItems = res.data;
      load.dismiss().then(res => {
        this.showTopicDashboard = !this.showTopicDashboard;
      });

    }).catch(error => {

      load.dismiss().then(res => {
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

      console.log(event);

      let d = new Date();
      let imgId = d.toString();
      this.handleImg(event.target.result,imgId);

      /*处理真是上传的图片*/
      // let img = {
      //   "src": encodeURIComponent(event.target.result),
      //   "id" : imgId
      // }
      /*压缩图片 并存储 zai upLoadImg*/
      // this.zipImg(event.target.result,imgId)

      /*压缩并且矫正图片*/
      this.zipAndCorrectImg(event.target.result,res => {

        let imgItem = {
          "src": encodeURIComponent(res),
          "id": imgId
        }
        /*添加进数组 后续上传*/
        this.uploadImages.push(imgItem);

      });

    };
    let file = $event.target.files[0];
    if(file == null) return;



    fileReader.readAsDataURL($event.target.files[0]);
    // $event.target.files[0] = null;
  }


  zipImg(src,imgId){



      let img = <HTMLImageElement>document.createElement('img');
      /*图片加载*/
      img.src = src;

      /*加载成功*/
      img.onload = (ev:any) => {

        let cxt = <HTMLCanvasElement>document.createElement("canvas");


        let imgW = ev.target.naturalWidth;
        let imgH = ev.target.naturalHeight;

        cxt.width = imgW;
        cxt.height = imgH;
        let cxtRenderer = cxt.getContext("2d");

        // ,imgW,imgH,0,0,imgW,imgH
        cxtRenderer.fillStyle = "#fff";
        cxtRenderer.fillRect(0, 0, cxt.width, cxt.height);
        cxtRenderer.drawImage(ev.target,0,0);

        /*压操作*/
        let src = cxt.toDataURL('image/jpeg',0.5);

        let imgItem = {
          "src": encodeURIComponent(src),
          "id": imgId
        }
        this.uploadImages.push(imgItem);
      }
    }


  /*删除图片*/
  deleteImg(img){

    let index = this.images.indexOf(img);
    this.images.splice(index,1);
    // this.images = this.images.splice(index,1);

    /*处理真正的上传列表*/
    let upLoadIndex;
    this.uploadImages.find((value, index, obj) => {

      if (value.id == img.id) {
        upLoadIndex = index;
      }
      return value.id == img.id;

    });

    //删除真正上传列表
    (typeof(upLoadIndex) != "undefined")&&(this.uploadImages.splice(upLoadIndex,1));

    let  newImages = this.uploadImages;

  }

  editing($event){


    let text = this.textArea.nativeElement.value;
    let len = text.length;

    if ((len >= this.lastLength)&&(text.substr(len - 1, 1) == "@")) {
      let model = this.model.create(AtPage);
      model.onDidDismiss((res) => {

        let ar = this.textArea;
        if((typeof(res) != "undefined")&&(res != null)){


          ar.nativeElement.value = ar.nativeElement.value + res + " ";
          console.log(res, ar);
        } else {

          ar.nativeElement.value = ar.nativeElement.value.substr(0,len - 1);
        }

      });
      model.present();
    }
    this.lastLength = len;

    if($event.target.value.length > 0){
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }


  }


  // @param {string} img 图片的base64
  // @param {int} dir exif获取的方向信息
  // @param {function} next 回调方法，返回校正方向后的base64
  zipAndCorrectImg(imgSrc, next) {

    //获取方向
    let converImg = document.createElement('img');

    converImg.onload = res => {

      let direction;

      //方法为同步方法 会阻塞线程
      EXIF.getData(converImg,function(){

        console.log(converImg.exifData);
        console.log("获取到了方向");
        EXIF.getAllTags(converImg);
        direction = EXIF.getTag(converImg,'Orientation');

      });


          /**/
      let degree = 0, drawWidth, drawHeight, width, height;

      drawWidth = converImg.naturalWidth;
      drawHeight = converImg.naturalHeight;

      //以下改变一下图片大小
      var maxSide = Math.max(drawWidth, drawHeight);
      if (maxSide > 1024) {

        var minSide = Math.min(drawWidth, drawHeight);
        minSide = minSide / maxSide * 1024;
        maxSide = 1024;

        if (drawWidth > drawHeight) {
          drawWidth = maxSide;
          drawHeight = minSide;
        } else {
          drawWidth = minSide;
          drawHeight = maxSide;
        }

      }

      var canvas = document.createElement('canvas');

      canvas.width = width = drawWidth;
      canvas.height = height = drawHeight;

      var context = canvas.getContext('2d');
      //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式

      switch (direction) {
          //iphone横屏拍摄，此时home键在左侧
        case 3:
          degree = 180;
          drawWidth = -width;
          drawHeight = -height;
          break;
          //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
        case 6:
          canvas.width = height;
          canvas.height = width;
          degree = 90;
          drawWidth = width;
          drawHeight = -height;
          break;
          //iphone竖屏拍摄，此时home键在上方
        case 8:
          canvas.width = height;
          canvas.height = width;
          degree = 270;
          drawWidth = -width;
          drawHeight = height;
          break;
      }

      //使用canvas旋转校正
      context.rotate(degree * Math.PI / 180);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, drawWidth, drawHeight);
      context.drawImage(converImg, 0, 0, drawWidth, drawHeight);
      //返回校正图片
      next(canvas.toDataURL("image/jpeg",0.5));

    };


    /*赋值 读取 图片*/
    converImg.src = imgSrc;

  }





}
