/**
 * Created by tianlei on 16/8/29.
 */

import {NativeStorage} from 'ionic-native';

import {Injectable} from '@angular/core';
// import {LoginPage} from "../pages/user/login";
import {App, Platform, LocalStorage} from "ionic-angular";

export const USER = 'user';

interface UserInfo {
  userName?: string,
  password?: string
}


@Injectable()
export class UserService {

  isLogined: boolean = true;
  //userID 进行保存
  userName: string = "";
  password: string = "";
  userId: string = "";

  constructor(private app: App,
              private platform: Platform) {

  }

  saveUserInfo(userName: string,userId: string) {

    this.userName = userName;
    this.userId = userId;

    /*存储在浏览器中*/
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.set("userName", userName);
    localStorage.set("userId", userId);

    // NativeStorage.setItem(USER, {
    //   userName: `${userName}`,
    //   userId: `${userId}`
    // });

  }

  whetherLogin(): boolean{
    if(this.userName.length > 0){
      return true;
    }

    let value;
    /*webStorage only use web*/
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.get("userName").then((value) => {
      /**/
      this.userName = value;

    });

    // let userName: any = localStorage.get("userName");
    return typeof(value) != "undefined";

  }

  loginState() {

    let value;
    /*webStorage only use web*/
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.get("userId").then((value) => {
      /**/
      this.userId = value;
    });
    return localStorage.get("userName");
    // return false;
    // return NativeStorage.getItem(USER).then( () => {
    //
    // }).catch( () => {
    //
    // });
  }

  loginOut() {

    /**/
    this.userName = "";
    this.userId = "";
    let localStorage =  new LocalStorage(LocalStorage);
    localStorage.remove("userName");
    localStorage.remove("userId");
    /**/

    this.platform.ready().then(() => {

      // this.app.getRootNav().setRoot(LoginPage);
      // NativeStorage.remove(USER).then(() => {
      //
      //   this.app.getRootNav().setRoot(LoginPage);
      //
      // }).catch((error) => {
      //
      // });

    })
  }
}
