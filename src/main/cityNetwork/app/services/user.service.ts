/**
 * Created by tianlei on 16/8/29.
 */

import {Injectable} from '@angular/core';
// import {LoginPage} from "../pages/user/login";
import {App, Platform, LocalStorage} from "ionic-angular";
import {HttpService} from "./http.service";
// import {LoginPage} from "../pages/user/login";

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
  followUsers = [];  //关注的所有人
  constructor(private app: App,
              private platform: Platform,
              private http: HttpService) {

  }

  saveUserInfo(userName: string,userId: string) {

    this.userName = userName;
    this.userId = userId;

    /*存储在浏览器中*/
    let localStorage = new LocalStorage(LocalStorage);
    localStorage.set("userName", userName);
    localStorage.set("userId", userId);

  }

  whetherLogin(){

    let value;

    /*webStorage only use web*/
    let localStorage = new LocalStorage(LocalStorage);

    return localStorage.get("userId").then((res) => {
      if(res != null){
        this.userId = res;
      }
      return res;
    });


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
