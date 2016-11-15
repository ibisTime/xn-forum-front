/**
 * Created by tianlei on 2016/11/15.
 */
import {Injectable} from '@angular/core';

declare let  Wechat: any;

@Injectable()
export class WXService {

    constructor() {


    }

    share(title){

        Wechat.isInstalled(function (installed) {

            Wechat.share({

                message: {
                    title: title,
                    description: "tz",
                    thumb: "../assets/images/icon.png",
                    media: {
                        type: Wechat.Type.WEBPAGE,   // webpage
                        webpageUrl: "https://github.com/xu-li/cordova-plugin-wechat"    // webpage
                    }
                },
                scene: Wechat.Scene.TIMELINE   // share to Timeline

            }, function () {

                alert("Success");

            }, function (reason) {

                alert("Failed: " + reason);

            });


        }, function (reason) {

            alert("Failed: " + reason);

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