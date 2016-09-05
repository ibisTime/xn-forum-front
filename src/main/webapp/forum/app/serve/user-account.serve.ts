/**
 * Created by tianlei on 16/8/29.
 */

import {NativeStorage} from 'ionic-native';

import {Injectable} from '@angular/core';
import {LoginPage} from "../pages/user/login";
import {App, Platform, LocalStorage} from "ionic-angular";

export const USER = 'user';

interface UserInfo {
  userName?: string,
  password?: string
}


@Injectable()
export class UserAccountService {

  isLogined: boolean = true;
  //userID 进行保存
  userName: string = "";
  password: string = "";

  constructor(private app: App,
              private platform: Platform) {
    // this.userName = "tianlei005";
    // this.password = "123456";

  }

  saveUserInfo(userName: string, password: string) {

    this.userName = userName;
    this.password = password;

    /*存储在浏览器中*/
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.set("userName", userName);
    localStorage.set("password", password);

    NativeStorage.setItem(USER, {
      userName: `${userName}`,
      password: `${password}`
    });

  }

  loginState() {

    let value;
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.get("password").then((value) => {
      this.password = value;
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

    this.userName = "";
    this.password = "";
    //
    let localStorage =  new LocalStorage(LocalStorage);
    localStorage.remove("userName");
    localStorage.remove("password");

    this.platform.ready().then(() => {

      this.app.getRootNav().setRoot(LoginPage);
      NativeStorage.remove(USER).then(() => {

        this.app.getRootNav().setRoot(LoginPage);

      }).catch((error) => {

      });

    })
  }
}
