/**
 * Created by tianlei on 16/8/29.
 */

import {Injectable} from '@angular/core';
import {App, Platform} from "ionic-angular";
import {HttpService} from "./http.service";
import { Storage } from '@ionic/storage';

export interface User{
  kind?,
  level?,
  loginName?,
  loginPwdStrength?,
  mobile?,
  nickname?,
  remark?,
  status?,
  updateDatetime?,
  updater?,
  userExt?,
  userId?
}

@Injectable()
export class UserService {

  isLogined: boolean = true;
  //userID 进行保存
  tokenId: string = "";
  userId: string = "";
  user:User;
  followUsers = [];  //关注的所有人
  constructor(private app: App,
              private platform: Platform,
              private http: HttpService,
              private storage: Storage) {

  }

  saveUserInfo(tokenId: string,userId: string) {

    this.tokenId = tokenId;
    this.userId = userId;

    /*存储在浏览器中*/
    this.storage.set("tokenId", tokenId);
    this.storage.set("userId", userId);

  }

  whetherLogin(){

    /*webStorage only use web*/
    this.storage.get("tokenId").then((res) => {
      if(res != null){
        this.tokenId = res;
      }
    });

    return this.storage.get("userId").then((res) => {
      if(res != null){
        this.userId = res;
      }
      return res;
    });

  }

  // loginState() {
  //
  //   /*webStorage only use web*/
  //   this.storage.get("userId").then((value) => {
  //     /**/
  //     this.userId = value;
  //   });
  //   return this.storage.get("userName");
  //
  // }

  loginOut() {

    /**/
    this.tokenId = "";
    this.userId = "";
    this.storage.remove("tokenId");
    this.storage.remove("userId");
    /**/
  }

  //查询所有关注的人
  queryFollowUsers(){
    return this.http.get('/rs/follows/list',{
              "userId": this.userId
            })
            .then((res) => {
                if(res.success){
                    this.followUsers = res.data;
                }
            }).catch(error => {
            });
  }
}
