/**
 * Created by tianlei on 2016/10/23.
 */
import {Injectable} from '@angular/core';
import {App} from "ionic-angular";
import {Release} from './release'
import {MallPage} from "../pages/headline/mall/mall";
import {IFramePage} from "../pages/headline/iframe";
import {InAppBrowser} from 'ionic-native';

@Injectable()
export class NavService {


    constructor(public app: App) {


    }

    transition(url,title,signingCallBack?){

        let nav = this.app.getRootNav();

        if(url == "page:mall"){

            nav.push(MallPage);

        } else if(url == "page:signin"){

            (typeof(signingCallBack) != "undefined")&&(signingCallBack())

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