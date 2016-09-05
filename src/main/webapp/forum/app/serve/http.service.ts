/**
 * Created by tianlei on 16/9/2.
 */
import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {IMService} from "./im.serve";

const RELEASE_ADDR = "S";
const DEBUG_ADDR = "http://121.43.101.148:7303/xn-forum-front";
const TEST_ADDR = "S";

@Injectable()
export class HttpService {

  // http://121.43.101.148:7303/xn-forum-front/user/login

    addr = DEBUG_ADDR;
    constructor( private http: Http) {

    }

    get(url: string,parameters: Object,optionURL?: string): Promise<any>{


      let url1 = optionURL || (this.addr + url);

      if (typeof(parameters) == "object"){
        let flag = 1;
        for( let key in parameters){
          if(flag == 1){
            url1 += "?" + key + '=' + parameters[key];
            flag = 0;
          } else {
            url1 += "&" + key + '=' + parameters[key];
          }
        }
      }
     console.log(url1);
     return this.http.get(url1).toPromise();
    }

    post(url: string,parameters: Object,optionURL?: string){

      let headers = new Headers({
          'Content-Type': 'application/json'});
      let url1 = optionURL ||( this.addr + url);

      this.http.post(url,JSON.stringify(parameters),{headers: headers});

    //   return this.http
    //     .post(this.heroesUrl, JSON.stringify(hero), {headers: headers})
    //     .toPromise()
    //     .then(res => res.json().data)
    //     .catch(this.handleError);
    // }
    }
}
