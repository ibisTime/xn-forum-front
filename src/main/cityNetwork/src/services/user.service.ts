/**
 * Created by tianlei on 16/8/29.
 */

import {Injectable} from '@angular/core';
import {App, Platform} from "ionic-angular";
import {HttpService} from "./http.service";
import { Storage } from '@ionic/storage';


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
              private http: HttpService,
              private storage: Storage) {

  }

  saveUserInfo(userName: string,userId: string) {

    this.userName = userName;
    this.userId = userId;

    /*存储在浏览器中*/
    this.storage.set("userName", userName);
    this.storage.set("userId", userId);

  }

  whetherLogin(){

    /*webStorage only use web*/
    return this.storage.get("userId").then((res) => {
      if(res != null){
        this.userId = res;
      }
      return res;
    });


  }

  loginState() {

    /*webStorage only use web*/
    this.storage.get("userId").then((value) => {
      /**/
      this.userId = value;
    });
    return this.storage.get("userName");

  }

  loginOut() {

    /**/
    this.userName = "";
    this.userId = "";
    this.storage.remove("userName");
    this.storage.remove("userId");
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
