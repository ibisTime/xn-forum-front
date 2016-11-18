/**
 * Created by tianlei on 2016/11/15.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

declare let  Wechat: any;

@Injectable()
export class WXService {

    constructor(public http: HttpService) {


    }

    isInstalled(){

        return new Promise( (resolve, reject) => {

            Wechat.isInstalled(installed => {

                installed? resolve() : reject("uninstall");


            },error => {

                reject("uninstall");

            });

        });

    }

    share(content,imgUrl?){

        return new Promise( (resolve, reject) => {

              Wechat.share({

                  message: {
                      title: content,
                      description: "tz",
                      thumb: imgUrl || "",
                      media: {
                          type: Wechat.Type.WEBPAGE,   // webpage
                          webpageUrl: "http://cswapp.hichengdai.com"   // webpage
                      }
                  },
                  scene: Wechat.Scene.TIMELINE   // share to Timeline

              }, function () {

                  resolve();

              }, function (reason) {

                  reject("shareFailure");

              });

        });

    }


    wxLogin(){

        return new Promise((resolve,reject) => {

            var scope = "snsapi_userinfo",
                state = "_" + (+new Date());

            Wechat.auth(scope, state, response => {
                // you may use response.code to get the access token.

                // //2.通过code获取accseeToken
                let getTokenObj = {
                    code: "",
                    appid: "",
                    secret: "",
                    grant_type : "authorization_code"

                };
                //
                let url = "https://api.weixin.qq.com/sns/oauth2/access_token";

                // // ?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code
                this.http.get(null,getTokenObj,url).then(res => {

                    //拿到accseeToken
                    //通过token 获取用户信息
                    let token = "";
                    let getInfoObj = {
                        scope: "snsapi_userinfo",
                        access_token: token
                    };
                    //获取用户信息
                    return this.http.get(null,getInfoObj,"https://api.weixin.qq.com/sns/userinfo");


                }).then(res => {

                    resolve();

                }).catch(error => {

                    reject();

                });

                alert(JSON.stringify(response));

            }, reason => {

                reject();
                alert("Failed: " + reason);

            });


        });

    }


}