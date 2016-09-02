/**
 * Created by tianlei on 16/8/30.
 */

import { Component, OnInit } from '@angular/core';
import {IMService} from "../../serve/im.serve";
import {UserAccountService} from "../../serve/user-account.serve";

@Component({
    templateUrl:"build/pages/mine/mine.html",

})
export class MinePage implements OnInit {
    constructor(private  userServe: UserAccountService,private imServe: IMService) { }

  ngOnInit() {
      // setInterval()
  }

  loginOut($event){

    this.userServe.loginOut();
    this.imServe.clearCurrentData();
    this.imServe.close();

  }

}
