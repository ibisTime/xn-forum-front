/**
 * Created by tianlei on 16/9/2.
 */
import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';

const RELEASE_ADDR = "S";
const DEBUG_ADDR = "http://tianlei/";
const TEST_ADDR = "S";

@Injectable()
export class HttpService {

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
          console.debug(key);
        }
        console.debug(url1);
      }
      console.debug(url1);
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
