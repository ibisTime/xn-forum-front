/**
 * Created by tianlei on 16/9/22.
 */
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {ViewController, Platform, ModalController, NavParams} from "ionic-angular";
import {HttpService} from "../../services/http.service";
import {UserService} from "../../services/user.service";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";
import {AtPage} from "./at";

@Component({
  templateUrl: 'send-article.html'
})
export class SendArticlePage implements AfterViewInit,OnDestroy {

  showTopicDashboard = false;
  isEditing = false;
  height;

  images:Array<any> = [];
  uploadImages = []; // 对象 id 和 src

  topicItems = [];
  topicCode: String = "";
  plateName = "选择板块";
  timeNum;

  title = "";
  content = "";
  @ViewChild('contentTextarea') textArea: ElementRef;


  constructor(public viewCtrl: ViewController,
              public platform: Platform,
              public http: HttpService,
              public user: UserService,
              public warn: WarnService,
              public cityS: CityService,
              public model: ModalController,
              public navParams: NavParams) {

    this.height = `${(this.platform.width() - 10)/4.0}px`;

    //从草稿箱中读取
    if(navParams.data){
      this.title = navParams.data.title;
      this.content = navParams.data.content;

      if(typeof(navParams.data.pic) != "undefined"){
        navParams.data.pic.forEach((value,index,array) =>{
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
      cxt.width = trueLong;
      cxt.height = trueLong;


      let cxtRenderer = cxt.getContext("2d");

      cxtRenderer.drawImage(img, react.offsetX, react.offsetY,
        react.height, react.width, 0, 0, cxt.width, cxt.height);

      let src = cxt.toDataURL();

      let imgItem = {
        "src": src,
        "id": imgId
      }
      thisCopy.images.push(imgItem);

    }

  }


  cancle(titleIput,contentTextarea){
    if(this.title.length > 0 || this.content.length > 0 ||
        this.uploadImages.length > 0){

      this.warn.alert2('是否保存为草稿',()=>{

        this.sendOrSave(titleIput,contentTextarea,"save");

      },()=> {

        this.viewCtrl.dismiss();

      })

    }

  }


  send(titleIput,contentTextarea) {
    this.sendOrSave(titleIput,contentTextarea,"send");

  }

  sendOrSave(titleIput,contentTextarea,type){

    let url = "/post/publish";
    let successStr = "发帖成功";
    let failureStr = "发帖失败";

    if(type == "save"){
      url = "/post/craft/add";
      successStr="保存为草稿成功";
      failureStr="保存为草稿失败";
    }


    let load = this.warn.loading("");

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
          "title": titleIput.value,
          "content": contentTextarea.value,
          "plateCode": this.topicCode,
          "pic": picStr,
          "publisher": this.user.userId
        };

        return this.http.post(url,articleObj);

      }).then(res => {
        load.dismiss().then(()=> {

          this.viewCtrl.dismiss();

        });
        this.warn.toast(successStr);
      }).catch(error => {
        load.dismiss();
        this.warn.toast(failureStr);

      });


    } else {
      /*2. 发帖无图片*/
      let articleObj = {
        "title": titleIput.value,
        "content": contentTextarea.value,
        "plateCode": this.topicCode
      };

       this.http.post(url,articleObj).then(res => {

         this.warn.toast(successStr);
         load.dismiss().then(res => {
           this.viewCtrl.dismiss();
         })


       }).catch(error => {
         load.dismiss();
         this.warn.toast(failureStr);
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

    /*处理真正的上传列表*/
    let upLoadIndex;
    this.uploadImages.find((value, index, obj) => {
      if (value.id == img.id) {
        upLoadIndex = index;
      }
      return value.id == img.id;
    });

    (typeof(upLoadIndex) != "undefined")&&(this.uploadImages.slice(upLoadIndex,1));

  }

  editing($event){
    // console.log($event.target.style);
    // let ele = document.getElementById("article-content");

    console.log($event.target.value);

    let text = this.textArea.nativeElement.value;
    let len = text.length;

    if (text.substr(len - 1, 1) == "@") {
      let model = this.model.create(AtPage);
      model.onDidDismiss((res) => {
        let ar = this.textArea;
        ar.nativeElement.value = ar.nativeElement.value + res + " ";
        console.log(res, ar);
      });
      model.present();
    }

    if($event.target.value.length > 0){
      this.isEditing = true;
    } else {
      this.isEditing = false;
    }

  }




}
