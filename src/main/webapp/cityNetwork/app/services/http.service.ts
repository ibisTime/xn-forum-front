/**
 * Created by tianlei on 16/9/2.
 */
import { Injectable } from '@angular/core';
import {Http, Headers, Response, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import {AlertController} from "ionic-angular";

const RELEASE_ADDR = "S";
// const DEBUG_ADDR = "http://localhost:8080/xn-forum-front";
const DEBUG_ADDR = "http://121.43.101.148:8080/xn-forum-front";
const TEST_ADDR = "S";

@Injectable()
export class HttpService {

  src = DEBUG_ADDR + '/captcha';
  addr = DEBUG_ADDR;
    public headers;
    constructor(private http: Http,
                private alertCtrl: AlertController ) {

      this.headers = new Headers();
      this.headers.append('Content-Type','application/json');
      this.headers.append('Accept','application/json');
    }

    get(url: string,parameters?: Object,optionURL?: string): Promise<any>{

      let url1 = optionURL || (this.addr + url );

      if (typeof(parameters) == "object"){
        let flag = 1;
        for( let key in parameters){
          url1 += (flag == 1 ? '?':'&') + key + '=' + parameters[key];
          flag = 0;
        }
      }

      return new Promise((resolve,reject) => {

        this.http.get(url1).subscribe(
          (res) => {
            this.handleRes(res,resolve,reject, url1);
          },
          (error) => {
            this.handelError(error,reject);
          }
        );

      });

    }

    post(url: string,parameters: Object,optionURL?: string): Promise<any>{

      let url1 = optionURL ||( this.addr + url);

      let body = "";
      if (typeof(parameters) == "object"){
        let flag = 1;
        for( let key in parameters){
            body += (flag == 1 ? "" : "&") + key + '=' + parameters[key];
            flag = 0;
        }
      }
      let headers = new Headers({ 'Content-Type':'application/x-www-form-urlencoded'});
      headers.append('Accept','application/json');
      let reqOptions = new RequestOptions({ headers: headers });

      return new Promise((resolve,reject) => {

        this.http.post(url1,body,reqOptions).subscribe(
          (res) => {
            this.handleRes(res,resolve,reject,url1);
          },
          (error) => {
            this.handelError(error,reject);
          }
        );

      });

    };

    handleRes(res,resolve,reject,url1){
      try{
        let resObj = res.json();
        if(resObj.eType == 2){
          this.alert(resObj.msg);
          reject('发生异常');
        } else {
          resolve(resObj);
        }
      }catch(e){
        if(url1.indexOf("webimplugin/welcome?") != -1){
          resolve(res._body);
        }else{
          reject('发生异常');
        }
      }
    }

    handelError(error,reject){

      console.log('发生错误');
      console.log(error);
      reject(error);

    }

  alert(msg: string, confirmAction?: () => void) {
    let alert = this.alertCtrl.create({
      message: msg,
      buttons: [{
        text: '确定',
        handler: () => {
          confirmAction ? confirmAction() : 1;
          // typeof(confirmAction) === "undefined"  ? 1>0 : confirmAction();
        }
      }]
    });
    alert.present();
  }

/*end*/
}


// let ht = new  XMLHttpRequest();
// ht.open("POST","http://121.43.101.148:7303/xn-forum-front/user/regist");
// ht.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
// ht.send(body);
// let body = "loginName" + "=" + "23423" + "&" + "captcha" + "=" + "33dd";
