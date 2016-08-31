/**
 * Created by tianlei on 16/8/30.
 */

import { Component, OnInit } from '@angular/core';
import {UserService} from "../../serve/user.serve";
import {IMService} from "../../serve/im.serve";

@Component({
    templateUrl:"build/pages/mine/mine.html",
    providers: [UserService]
})
export class MinePage implements OnInit {
    constructor(private  userServe: UserService,private imServe: IMService) { }

  ngOnInit() { }

  loginOut($event){

    this.userServe.loginOut();
    this.imServe.clearCurrentData();

  }

}
