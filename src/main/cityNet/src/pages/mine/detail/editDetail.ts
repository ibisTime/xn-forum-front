import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {UserService} from "../../../services/user.service";

declare let EXIF: any;
@Component({
  templateUrl: 'editDetail.html'
})
export class EditDetailPage implements AfterViewInit {
  src:string = 'assets/images/marty-avatar.png';
  param = {
      "gender": "",
      "birthday": "",
      "introduce": "",
      "email":""
  };
  result;
  nickname:string;
  orignalNickname:string;
  flag: boolean = false;
  constructor(public navCtrl: NavController,
              public warnCtrl: WarnService,
              public uService: UserService,
              public http: HttpService) {
  }
  ngAfterViewInit() {
      this.getUserInfo();
  }
  ionViewWillLeave(){
  }

  getUserInfo(){
    let data = this.uService.user;
    let userExt = data.userExt;
    this.nickname = data.nickname;
    this.orignalNickname = this.nickname;
    if(userExt.photo){
        this.src = userExt.photo;
    }
    this.param.gender = userExt.gender || "";
    this.param.birthday = userExt.birthday || "";
    this.param.introduce = userExt.introduce || "";
    this.param.email = userExt.email || "";
    if(this.param.introduce != ""){
        let areaItem = document.getElementById("areaItem");
        areaItem.className += " input-has-value";
    }
  }

  changeNickname(){
    if(/[^\u4E00-\u9FA5a-zA-Z0-9_+-=]/ig.test(this.nickname)){
          this.warnCtrl.toast("昵称中包含非法字符");
          return;
    }

    let load = this.warnCtrl.loading("修改中");
    this.http.post('/user/nickname', {"nickname": this.nickname}).then((res)=>{

            this.orignalNickname = this.nickname;
            this.uService.user.nickname = this.nickname;

        load.dismiss();
    }).catch((err)=>{
        load.dismiss();
    });
  }

  uploadImg(e){

       if(e.target.files.length <= 0){
         return;
       };

        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onload = (event: any) => {
            this.zipImg(event.target.result);
        }
        reader.readAsDataURL(file);//获取base64编码
  }

  areaFocus(ev){
      let areaItem = document.getElementById("areaItem");
      areaItem.className = areaItem.className.replace(/\s*input-has-value\s*/g,"");
      areaItem.className += " input-has-value";
  }

  areaBlur(ev){
      let areaItem = document.getElementById("areaItem");
      if(this.param.introduce == ""){
          areaItem.className = areaItem.className.replace(/\s*input-has-value\s*/g,"");
      }
  }

  zipImg(src1){
      let img = <HTMLImageElement>document.createElement('img');
      /*图片加载*/
      img.src = src1;
      /*加载成功*/

      img.onload = (ev:any) => {

          let direction;
          //方法为同步方法 会阻塞线程
          EXIF.getData(img, function () {

              EXIF.getAllTags(img);
              direction = EXIF.getTag(img, 'Orientation');

          });

        /* */
        // let cxt = <HTMLCanvasElement>document.createElement("canvas");
        // let imgW = ev.target.naturalWidth;
        // let imgH = ev.target.naturalHeight;
        // cxt.width = imgW;
        // cxt.height = imgH;
        // let cxtRenderer = cxt.getContext("2d");
        // // ,imgW,imgH,0,0,imgW,imgH
        // cxtRenderer.fillStyle = "#fff";
        // cxtRenderer.fillRect(0, 0, cxt.width, cxt.height);
        // cxtRenderer.drawImage(ev.target,0,0);

          let degree = 0, drawWidth, drawHeight, width, height;

          drawWidth = img.naturalWidth;
          drawHeight = img.naturalHeight;

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
          context.drawImage(img, 0, 0, drawWidth, drawHeight);
          /* */

        let url = canvas.toDataURL('image/jpeg',0.3);
        this.src = url;
        let load = this.warnCtrl.loading("修改中");

        this.http.post('/user/avatar', {"photo": encodeURIComponent(url)})
            .then((res)=>{
                this.uService.user.userExt.photo = this.src;
                this.warnCtrl.toast('头像修改成功!');
                load.dismiss();
            }).catch((err)=>{
                load.dismiss();
            });
        }
    }


  changeExt(){
      console.log(this.param);
      
      if(typeof(this.param.birthday) == "undefined" || this.param.birthday.length <= 0){
          this.warnCtrl.toast('请填写生日');
          return;
      }
      if(typeof(this.param.gender) == "undefined" || this.param.gender.length  <= 0){
          this.warnCtrl.toast('请选择性别');
          return;
      }
      if(typeof(this.param.introduce) == "undefined" || this.param.introduce.trim() === ""){
          this.warnCtrl.toast('请填写个人简介');
          return;
      }

      let  b1 = typeof(this.param.email) != "undefined";
      let  b2 =   /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/g.test(this.param.email);

      if(!(b1&&b2)){
          this.warnCtrl.toast('请填写正确的邮箱');
          return;
      }

      if(/[^\u4E00-\u9FA5a-zA-Z0-9_+-=\（\）\(\)\《\》\——\；\，\。\“\”\<\>\！\!\~\@\*\&\^\%\#\\\|\[\]\{\}\：\'\、\……]/g.test(this.param.introduce)){
          this.warnCtrl.toast('个人简介中包含非法字符');
          return;
      }
      this.param.introduce = this.param.introduce.trim();
      let load = this.warnCtrl.loading("修改中");
      this.http.post('/user/profile', this.param).then((res)=>{
            this.uService.user.userExt.gender = this.param.gender;
            this.uService.user.userExt.birthday = this.param.birthday;
            this.uService.user.userExt.introduce = this.param.introduce;
            this.uService.user.userExt.email = this.param.email;
        load.dismiss();

        this.navCtrl.pop();
      }).catch((err)=>{
            load.dismiss();
      });
  }

}
