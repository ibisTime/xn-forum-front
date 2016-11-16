/**
 * Created by tianlei on 2016/11/15.
 */
import {Injectable} from '@angular/core';

declare let  Wechat: any;

@Injectable()
export class WXService {

    constructor() {


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

        var scope = "snsapi_userinfo",
            state = "_" + (+new Date());
        Wechat.auth(scope, state, function (response) {
            // you may use response.code to get the access token.
            alert(JSON.stringify(response));
        }, function (reason) {
            alert("Failed: " + reason);
        });



    }
}