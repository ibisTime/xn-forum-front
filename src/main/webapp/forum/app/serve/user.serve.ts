/**
 * Created by tianlei on 16/8/29.
 */
/**
 * Created by tianlei on 16/8/29.
 */
import { NativeStorage } from 'ionic-native';

import {Injectable} from '@angular/core';
import {LoginPage} from "../pages/user/login";
import {App} from "ionic-angular";

export const USER_ID = 'userID';

@Injectable()
export class UserService {


  isLogined:boolean = true;
  //userID 进行保存
  userId:string = "";

  constructor(private app: App) {
  }

  saveUserInfo(userID:string){
    this.userId = userID;
    NativeStorage.setItem(USER_ID,userID);

  }

  loginState(){
    return NativeStorage.getItem(USER_ID);
  }

  loginOut(){
    this.userId = "";
    NativeStorage.remove(USER_ID).then( () => {
      this.app.getRootNav().setRoot(LoginPage);
    });
  }
}
