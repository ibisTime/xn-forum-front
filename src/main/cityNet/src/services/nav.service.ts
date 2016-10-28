/**
 * Created by tianlei on 2016/10/23.
 */
import {Injectable} from '@angular/core';
import {App} from "ionic-angular";
import {Release} from './release'
import {MallPage} from "../pages/headline/mall/mall";
import {IFramePage} from "../pages/headline/iframe";
import {InAppBrowser} from 'ionic-native';
import {JsonPipe} from "@angular/common";
import {HttpService} from "./http.service";
import {PlatDetailPage} from "../pages/forum/detail/platDetail";

@Injectable()
export class NavService {


    constructor(public app: App,
                public http: HttpService
    ) {


    }

    transition(url,title,signingCallBack?){

        let nav = this.app.getActiveNav();

        console.log(url);
        if(url == "page:mall"){

            nav.push(MallPage);

        } else if(url == "page:signin"){

            (typeof(signingCallBack) != "undefined")&&(signingCallBack())

        } else if(/page:board/ig.test(url)){


            let bkCode = url.replace("page:board,param:","");
            nav.push(PlatDetailPage,{"code":bkCode});

        } else {

            if(Release.weChat){

                nav.push(IFramePage,{"url":url,"title":title});

            } else {

                //插件跳转
                let browser = new InAppBrowser(url);
                browser.show();

            }

        }

    }


}