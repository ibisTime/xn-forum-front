/**
 * Created by tianlei on 2016/11/20.
 */
import {Injectable} from '@angular/core';
import {Platform} from "ionic-angular";

declare let window: any;
@Injectable()
export class JPushService {

    constructor( public  platform: Platform) {


        document.addEventListener("jpush.openNotification", (res:any) => {

            this.clearBadage();
            if(this.platform.is("ios")){

              console.log( res.aps.alert) ;

            } else {

                console.log( res.aps.alert) ;
            }

        }, false);
    }

    clearBadage(){

        window.plugins.jPushPlugin.prototype.reSetBadge()

    }



}

// 安卓
// "title": "title",
//     "alert":"ding",
//     "extras":{
//     "yourKey": "yourValue",
//         "cn.jpush.android.MSG_ID": "1691785879",
//         "app": "com.thi.pushtest",
//         "cn.jpush.android.ALERT": "ding",
//         "cn.jpush.android.EXTRA": {},
//          "cn.jpush.android.PUSH_ID": "1691785879",
//         "cn.jpush.android.NOTIFICATION_ID": 1691785879,
//         "cn.jpush.android.NOTIFICATION_TYPE": "0"
// }


//ios
// {
//     "aps":{
//     "badge": 1,
//         "sound": "default",
//         "alert": "今天去哪儿"
// },
//     "key1": "value1",
//     "key2": "value2",
//     "_j_msgid": 154604475
// }
