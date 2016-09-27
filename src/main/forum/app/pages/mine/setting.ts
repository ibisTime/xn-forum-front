/**
 * Created by tianlei on 16/9/11.
 */
import { Component, OnInit } from '@angular/core';
import {NavController} from "ionic-angular";
import {ForgetPwdPage} from "../user/forgetPwd";
import {UserService} from "../../serve/user.serve";
import {IMService} from "../../serve/im.service";

@Component({
    template:`
<ion-header>
  <ion-navbar>
    <ion-title>设置</ion-title>
  </ion-navbar>
</ion-header>

<ion-content  class="mine">
  <ion-list>

    <button ion-item (click)="changePassword()" style="background-color: white;">修改密码</button>
  </ion-list>
  <div class="login-out">
  <button  (click)="loginOut($event)">退出登陆</button>
  </div>
</ion-content>
     `,
  styles:[`
  .login-out{
    margin-top: 20%;
    text-align: center;

  }
  
    .login-out button {
      width: 90%;
    }
   `
  ]

})
export class SettingPage implements OnInit {
    constructor(private  userServe: UserService,
                private imServe: IMService,
                private navCtrl: NavController) { }

  ngOnInit() { }
  changePassword(){
    this.navCtrl.push(ForgetPwdPage,"修改密码");
  }


  loginOut($event){

    this.userServe.loginOut();
    this.imServe.clearCurrentData();
    this.imServe.close();

  }

}
