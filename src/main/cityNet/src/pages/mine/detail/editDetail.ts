import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {UserService} from "../../../services/user.service";


@Component({
  templateUrl: 'editDetail.html'
})
export class EditDetailPage implements AfterViewInit {
  src:string = 'assets/images/marty-avatar.png';
  param = {
      "gender": "",
      "birthday": "",
      "region": "",
      "introduce": ""
  };
  orignalParam = {
      "gender": "",
      "birthday": "",
      "region": "",
      "introduce": ""
  }

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
      // if( !this.isEqual(this.orignalParam, this.param) ){
      //     this.changeExt();
      // }
      // if( this.orignalNickname !== this.nickname ){
      //     this.changeNickname();
      // }
  }

  isEqual(obj1: Object, obj2: Object){
      for(let i in obj1){
          if(obj1[i] != obj2[i]){
              return false;
          }
      }
  }

  getUserInfo(){
    let data = this.uService.user;
    let userExt = data.userExt;
    this.nickname = data.nickname || data.mobile;
    this.orignalNickname = this.nickname;
    if(userExt.photo){
        this.src = userExt.photo;
    }
    this.orignalParam.gender = this.param.gender = userExt.gender || "";
    this.orignalParam.region = this.param.region = userExt.region || "";
    this.orignalParam.birthday = this.param.birthday = userExt.birthday || "";
    this.orignalParam.introduce = this.param.introduce = userExt.introduce || "";
  }

  changeNickname(){

    if(/[^\u4E00-\u9FA5a-zA-Z0-9_+-=]/ig.test(this.nickname)){
          this.warnCtrl.toast("昵称中包含非法字符");
    }

    let load = this.warnCtrl.loading("修改中");
    this.http.post('/user/nickname', {"nickname": this.nickname}).then((res)=>{
        if(!res.success){
            this.warnCtrl.toast('用户昵称修改失败，请稍后重试!');
        }else{
            this.orignalNickname = this.nickname;
            this.uService.user.nickname = this.nickname;
        }
        load.dismiss();
    }).catch((err)=>{
        this.warnCtrl.toast('用户昵称修改失败，请稍后重试!');
        load.dismiss();
    });
  }

  uploadImg(e){
        let file = e.target.files[0];
        let reader = new FileReader();

          let load = this.warnCtrl.loading("修改中");
          reader.onload = (event: any) => {

              this.src = event.target.result;

              this.http.post('/user/avatar', {"photo":encodeURIComponent(event.target.result)})
                  .then((res)=>{
                      if(res.success){
                          this.uService.user.userExt.photo = this.src;
                          this.warnCtrl.toast('头像修改成功!');
                      }else{
                          this.warnCtrl.toast('头像修改失败!');
                      }
                      load.dismiss();
                  }).catch((err)=>{
                  this.warnCtrl.toast('err!');
                  load.dismiss();
              });


          }
          reader.readAsDataURL(file);//获取base64编码
  }


  changeExt(){
console.log(this.param);
      if(typeof(this.param.birthday) == "undefined"){
          this.warnCtrl.toast('请填写生日');
          return;
      }
      if(typeof(this.param.region) == "undefined"){
          this.warnCtrl.toast('请填所在地');
          return;
      }
      if(typeof(this.param.gender) == "undefined"){
          this.warnCtrl.toast('请选择性别');
          return;
      }
      if(typeof(this.param.introduce) == "undefined"){
          this.warnCtrl.toast('请填写个人简介');
          return;
      }

      if(/[^\u4E00-\u9FA5a-zA-Z0-9]/ig.test(this.param.region)){
          this.warnCtrl.toast('地区名称只能使用汉字、数字、字母的组合');
          return;
      }

      if(/[^\u4E00-\u9FA5a-zA-Z0-9_+-=]/ig.test(this.param.introduce)){
          this.warnCtrl.toast('个人简介中包含非法字符');
          return;
      }

      let load = this.warnCtrl.loading("修改中");
    this.http.post('/user/profile', this.param).then((res)=>{
        if(!res.success){
            this.warnCtrl.toast('用户资料修改失败，请稍后重试!');
        }else{
            this.uService.user.userExt.gender = this.param.gender;
            this.uService.user.userExt.birthday = this.param.birthday;
            this.uService.user.userExt.region = this.param.region;
            this.uService.user.userExt.introduce = this.param.introduce;
        }
        load.dismiss();
        this.navCtrl.pop();
    }).catch((err)=>{
        this.warnCtrl.toast('用户资料修改失败，请稍后重试!');
        load.dismiss();
    });
  }

}
