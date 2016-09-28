/**
 * Created by tianlei on 16/8/29.
 */

import {Injectable} from '@angular/core';
// import {LoginPage} from "../pages/user/login";
import {App, Platform, LocalStorage} from "ionic-angular";
import {weChat} from "../pages/release";

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

    if(weChat){

      /*存储在浏览器中*/
      let localStorage = new LocalStorage(LocalStorage);
      localStorage.set("userName", userName);
      localStorage.set("userId", userId);

    } else {
      /*app*/

    }

  }

  whetherLogin(){
    // if((this.userName != null)&& (this.userName.length > 0)){
    //   return true;
    // }

    let value;

    /*webStorage only use web*/
    let localStorage = new LocalStorage(LocalStorage);

    return localStorage.get("userName");


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
