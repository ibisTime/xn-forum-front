import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {ResetPwdPage} from "../../user/resetPwd";


@Component({
  templateUrl: 'aboutus.html'
})
export class AboutusPage {

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public warnCtrl: WarnService,
              public http: HttpService) {
    
  }

}
