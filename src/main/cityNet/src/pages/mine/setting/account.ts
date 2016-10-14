import {Component} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {ResetPwdPage} from "../../user/resetPwd";


@Component({
  templateUrl: 'account.html'
})
export class AccountPage {

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public warnCtrl: WarnService) {
    
  }
 
  goPwd(){
    this.navCtrl.push(ResetPwdPage);
  }

}
