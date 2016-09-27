import {Component, AfterViewInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";


@Component({
  templateUrl: 'build/pages/mine/detail/editDetail.html'
})
export class EditDetailPage implements AfterViewInit {
  src:string = 'images/marty-avatar.png';
  url:string;
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
  nickname:string;
  orignalNickname:string;
  flag: boolean = false;
  constructor(private navCtrl: NavController,
              private warnCtrl: WarnService,
              private http: HttpService) {
    this.url = http.addr + "/upload/editAvatar";
  }
  ngAfterViewInit() {
      this.getUserInfo();
  }
  ionViewWillLeave(){
      if( !this.isEqual(this.orignalParam, this.param) ){
          this.changeExt();
      }
      if( this.orignalNickname !== this.nickname ){
          this.changeNickname();
      }
  }
  isEqual(obj1: Object, obj2: Object){
      for(let i in obj1){
          if(obj1[i] != obj2[i]){
              return false;
          }
      }
  }
  getUserInfo(){
    this.http.get('/user').then((res) => {
        if(res.success){
            this.flag = true;
            let data = res.data;
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
            //   document.getElementById("nickname").innerText = res.data.nickname || res.data.mobile;
        }else{
            this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
        }

    }).catch((error) => {
        this.warnCtrl.toast('用户信息获取失败，请稍后重试!');
    });
  }
  changeNickname(){
      if(this.flag){
            this.http.post('/user/nickname', {"nickname": this.nickname}).then((res)=>{
                if(!res.success){
                    this.warnCtrl.toast('用户昵称修改失败，请稍后重试!');
                }else{
                    this.orignalNickname = this.nickname;
                }
            }).catch((err)=>{
                this.warnCtrl.toast('用户昵称修改失败，请稍后重试!');
            });
      }
  }
  uploadImg(e){
        let file = e.target.files[0];
        let reader = new FileReader();

        (function(me){
            reader.onload = function (ee) {
                me.http.post('/user/avatar', {"photo": this.result}).then((res)=>{
                    if(res.success){
                        me.warnCtrl.toast('头像修改成功!');
                    }else{
                        me.warnCtrl.toast('头像修改失败!');
                    }
                }).catch((err)=>{
                    me.warnCtrl.toast('err!');
                });
                me.src = this.result;
            }
            reader.readAsDataURL(file);//获取base64编码
        })(this);

  }
  changeExt(){
      if(this.flag){
            this.http.post('/user/profile', this.param).then((res)=>{
                if(!res.success){
                    this.warnCtrl.toast('用户资料修改失败，请稍后重试!');
                }
            }).catch((err)=>{
                this.warnCtrl.toast('用户资料修改失败，请稍后重试!');
            });
      }
  }

}
