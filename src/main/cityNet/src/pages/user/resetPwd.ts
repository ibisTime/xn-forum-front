import {
  Component, AfterViewInit

} from '@angular/core';
import {NavController, NavParams, App} from "ionic-angular";
import {IMService} from "../../services/im.service";
import {WarnService} from "../../services/warn.service";
import {UserService} from "../../services/user.service";
import {HttpService} from "../../services/http.service";
import {LoginPage} from "./login";



@Component({
  templateUrl: "resetPwd.html"

})
export class ResetPwdPage implements AfterViewInit {

  constructor(   public navCtrl: NavController,
                 public warnCtrl: WarnService,
                 public user: UserService,
                 public para: NavParams,
                 public http: HttpService,
                 public imServe: IMService,
                 public app: App
                 ) {
  }

  ngAfterViewInit(){

  }

  ngOnInit() {

  }

  resetPwd(oriPwd, newPwd, rePwd) {
    if(!oriPwd){
      this.warnCtrl.toast('原密码不能为空');
      return;
    }
    if(!newPwd){
      this.warnCtrl.toast('新密码不能为空');
      return;
    }
    if(!rePwd){
      this.warnCtrl.toast('确认密码不能为空');
      return;
    }
    if(newPwd != rePwd){
      this.warnCtrl.toast('两次密码输入不一致');
      return;
    }
    let find = {
      "oldLoginPwd" : oriPwd,
      "newLoginPwd":newPwd
    }

    //let load = this.warnCtrl.loading("");
      this.http.post('/user/loginpwd/reset',find).then((res) => {


          this.warnCtrl.toast('修改成功');

          this.imServe.close();
          this.user.loginOut();
          this.navCtrl.popToRoot();

        

        //保存用户信息
        // this.user.saveUserInfo(this.user.user.mobile, newPwd);
        // this.imServe.login(this.user.user.mobile);
        // load.dismiss();
        // this.navCtrl.push(TabsPage,null,{animate: false});

        // setTimeout(() => {
        //   this.navCtrl.pop();
        // },50);
        // this.imServe.login(userName);
        // this.navCtrl.parent.parent.push(TabsPage);

      }).catch((error) => {


      });




  }


  pop(){

    this.navCtrl.popToRoot();

  }


}
