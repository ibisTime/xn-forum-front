/**
 * Created by tianlei on 16/9/2.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {AlertController, Events} from "ionic-angular";
import {Release} from "./release";
import {WarnService} from "./warn.service";

const DEBUG_ADDR = "http://localhost:8080/xn-forum-front";


@Injectable()
export class HttpService {


  addr = Release.url();
  public headers;
  constructor(public http: Http,
              public alertCtrl: AlertController,
              public events: Events,
              public warn: WarnService) {

  }

  get(url: string, parameters?: Object, optionURL?: string): Promise<any> {

    let url1 = optionURL || (this.addr + url );

    if (parameters != null && typeof(parameters) == "object") {
      let flag = 1;
      for (let key in parameters) {
        url1 += (flag == 1 ? '?' : '&') + key + '=' + parameters[key];
        flag = 0;
      }
    }

    return new Promise((resolve, reject) => {

      let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
      headers.append('Accept', 'application/json');
      let reqOptions = new RequestOptions({headers: headers});
      this.http.get(url1, reqOptions).subscribe(
          (res) => {
            this.handleRes(res, resolve, reject, url1);
          },
          (error) => {
            this.handelError(error, reject);
          }
      );

    });

  }

  post(url: string, parameters: Object, optionURL?: string): Promise<any> {

    let url1 = optionURL || ( this.addr + url);

    let body = "";
    if (parameters != null && typeof(parameters) == "object") {
      let flag = 1;
      for (let key in parameters) {
        body += (flag == 1 ? "" : "&") + key + '=' + parameters[key];
        flag = 0;
      }
    }

    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    headers.append('Accept', 'application/json');
    let reqOptions = new RequestOptions({headers: headers});

    return new Promise((resolve, reject) => {

      this.http.post(url1, body, reqOptions).subscribe(
          (res) => {
            this.handleRes(res, resolve, reject, url1);
          },
          (error) => {
            this.handelError(error, reject);
          }
      );

    });

  }

  handleRes(res, resolve, reject, url1) {

    if (url1.indexOf("webimplugin/welcome?") != -1) {/////////

      resolve(res._body);

    } else {////////////////

      /*登陆超时，重新登陆*/
      let resObj = res.json();
      console.log(url1);
      console.log(resObj);

      /*自己的请求*/
      if (typeof(resObj.success) != "undefined") {

        if (resObj.success) {//无异常
          resolve(resObj);
        } else {//有异常
          reject('请求出现异常');
          this.warn.toast(resObj.msg);
          if (resObj.timeout) {
            this.events.publish('user:timeout', "timeout");
          }

        }

      } else {//其他接口请求
        resolve(resObj);
      }

    }////////////

  }


  handelError(error, reject) {

    console.log('发生错误');
    console.log(error);
    reject(error);

  }




/*end*/
}

// let ht = new  XMLHttpRequest();
// ht.open("POST","http://121.43.101.148:7303/xn-forum-front/user/regist");
// ht.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
// ht.send(body);
// let body = "loginName" + "=" + "23423" + "&" + "captcha" + "=" + "33dd";
