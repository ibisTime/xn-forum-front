/**
 * Created by tianlei on 2016/11/11.
 */
import {Injectable} from '@angular/core';
import {Release} from './release'
import {Platform} from "ionic-angular";

declare  let plugins: any;

@Injectable()
export class PushService {

    constructor( public platform :Platform) {


    }

    init(){

        if(Release.weChat) return;

        plugins.jPushPlugin.init();

        plugins.jPushPlugin.getRegistrationID((data) => {

          Release.log(data);

        });


        document.addEventListener("jpush.openNotification", (event: any) => {

            var alertContent;
            if(!this.platform.is('ios')) {

                alertContent = event.alert;

            } else {

                alertContent = event.aps.alert;

            }

            alert("open Notificaiton:" + alertContent);

        }, false);

    }
}

