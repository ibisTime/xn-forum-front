/**
 * Created by tianlei on 2016/10/23.
 */
import {Injectable} from '@angular/core';
import {App, Events} from "ionic-angular";
import {Release} from './release'
import {MallPage} from "../pages/headline/mall/mall";
import {IFramePage} from "../pages/headline/iframe";
import { SafariViewController } from 'ionic-native';

import {PlatDetailPage} from "../pages/forum/detail/platDetail";
@Injectable()
export class NavService {


    constructor(public app: App,
                public events: Events
               ) {


    }

    transition(url,title,signingCallBack?){

        let nav = this.app.getActiveNav();

        console.log(url);
        if(url == "page:mall"){

            nav.push(MallPage);

        } else if(url == "page:signin"){

            (typeof(signingCallBack) != "undefined")&&(signingCallBack())

        } else if(/page:board/ig.test(url)){//跳板块


            let bkCode = url.replace("page:board,code:","");
            console.log(bkCode);
            nav.push(PlatDetailPage,{"code":bkCode});


        } else if(/page:/ig.test(url)){


            //循环引用无法跳转，发送到tabs里进行跳转

            this.events.publish("transtion",url);

        } else {

            if(Release.weChat){

                nav.push(IFramePage,{"url":url,"title":title});

            } else {
                //插件跳转
                // let browser = new InAppBrowser(url,"_system");
                // browser.show();
                SafariViewController.isAvailable().then((available: boolean) => {
                        if (available) {

                            SafariViewController.show({
                                url: url,
                                hidden: false,
                                animated: false,
                                transition: 'curl',
                                enterReaderModeIfAvailable: true,
                                tintColor: '#ff0000'
                            }).then((result: any) => {
                                // if(result.event === 'opened') console.log('Opened');
                                // else if(result.event === 'loaded') console.log('Loaded');
                                // else if(result.event === 'closed') console.log('Closed');
                            }, (error: any) => console.error(error));

                        } else {

                            nav.push(IFramePage, {"url": url, "title": title});
                            // use fallback browser, example InAppBrowser
                        }
                    }
                );

            }

        }

    }


}