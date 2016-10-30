/**
 * Created by tianlei on 16/8/29.
 */

import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import { Storage } from '@ionic/storage';
import {IMService} from "./im.service";
import {Events, App} from "ionic-angular";
import {WarnService} from "./warn.service";

export interface User{
  kind?,
  level?,
  loginName?,
  loginPwdStrength?,
  mobile?,
  nickname?,
  remark?,
  updateDatetime?,
  updater?,
  userId?,
  status?,
  totalFansNum?,
  totalFollowNum?,
  userExt?,
  companyCode?

}

@Injectable()
export class UserService {

  tokenId: string;
  userId: string;
  /*取值用 .user 取值*/
  _user: User;
  followUsers = [];  //关注的所有人
  totalPostNum = 0; //总发帖数
  registerHelper = false; //解决 注册成功返回到登录页 在退出的问题
  constructor(
              private http: HttpService,
              private storage: Storage,
              public imServe: IMService,
              public events: Events,
              public app: App,
              public warn: WarnService
             ) {

  }

  /**/
  set user(user){
    this._user = user;

      let leveDict = {
          "1":"新手上路",
          "2":"初级会员",
          "3":"中级会员",
          "4":"高级会员",
          "5":"金牌会员",
          "6":"论坛元老"
      }

    user&&(this._user["levelName"] =  leveDict[this._user.level]);
    this.storage.set("user",user);
  }

  get user(){
    return this._user;
  }

  saveUserInfo(tokenId: string,userId: string,user?) {
    this.tokenId = tokenId;
    this.userId = userId;

    /*存储在浏览器中*/
    this.storage.set("tokenId", tokenId);
    this.storage.set("userId", userId);
    (typeof(user) != "undefined")&&(this.storage.set("user",user));
  }


  whetherLogin(){

    /*webStorage only use web*/
    this.storage.get("tokenId").then((res) => {
      if(res != null){
        this.tokenId = res;
      }
    });

    this.storage.get("user").then((res) => {
      if(res != null){
        this.user = res;
      }
    });

    return this.storage.get("userId").then((res) => {
      if(res != null){
        this.userId = res;
      }
      return res;
    });

  }


  loginOut() {
    this.tokenId = null;
    this.userId = null;
    this.user = null;
    this.registerHelper = false;
    this.totalPostNum = 0;
    this.storage.remove("tokenId");
    this.storage.remove("userId");
    this.storage.remove("user");
    this.events.publish("user:loginout");
  }

  UpdateUserInfo(){
   return this.http.get("/user").then(res => {

      this.user = res.data;

    });

  }

  register(params){

   return this.http.post("/user/reg",params).then( res => {

      let userId = res.data.userId;

      /*通过userId注册环信*/
      return  this.imServe.register(userId,"");

    }).then((res) => {

     /*帮用户进行登陆*/
     let loginParams = {
       loginName: params.mobile,
       loginPwd: params.loginPwd,
       terminalType: "1"
     }

     return this.login(loginParams);

   })
  }

  login(params){
   return this.http.post('/user/login',params).then((res) => {

      /*登陆成功后获取用户信息*/
      /*登陆成功 保存信息*/
      let tokenId = res["data"]["tokenId"];
      let userId = res["data"]["userId"];

      this.tokenId = tokenId;
      this.userId = userId;
      /*登陆之后获取用户信息*/
      return this.http.get("/user");
    }).then(res => {

      this.user = res.data;
      this.saveUserInfo(this.tokenId,this.userId,this.user);

      /*发出消息*/
      this.events.publish("user:loginSuccess");

    })

  }

  //查询所有关注的人
  queryFollowUsers(){
    return this.http.get('/rs/follows/list').then((res) => {
                if(res.success){
                    this.followUsers = res.data;
                }
            }).catch(error => {
            });
  }

}
