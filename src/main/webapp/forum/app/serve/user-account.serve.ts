/**
 * Created by tianlei on 16/8/29.
 */

import { NativeStorage } from 'ionic-native';

import {Injectable} from '@angular/core';
import {LoginPage} from "../pages/user/login";
import {App, Platform} from "ionic-angular";

export const USER = 'user';

interface UserInfo{
  userName?:string,
  password?:string
}


@Injectable()
export class UserAccountService {

  isLogined: boolean = true;
  //userID 进行保存
  userName: string = "";
  password: string = "";

  constructor(private app: App,
              private platform: Platform) {

  }

  saveUserInfo(userName: string, password: string){

    this.userName = userName;
    this.password = password;
    NativeStorage.setItem(USER, {
      userName: `${userName}`,
      password: `${password}`
    });

  }

  loginState(){
    return false;
    // return NativeStorage.getItem(USER).then( () => {
    //
    // }).catch( () => {
    //
    // });
  }

  loginOut() {
    this.userName = "";
    this.password = "";
    this.platform.ready().then(() => {

      this.app.getRootNav().setRoot(LoginPage);
      NativeStorage.remove(USER).then(() => {

        this.app.getRootNav().setRoot(LoginPage);

      }).catch((error) => {

      });

    })
  }
}
