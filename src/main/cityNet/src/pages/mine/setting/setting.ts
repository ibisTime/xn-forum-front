import {Component,AfterViewInit} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {ImPage} from "../im/im";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {MineDetailPage} from "../detail/detail";
import {CollectionPage} from "../collection/collection";
import {EditDetailPage} from "../detail/editDetail";
import {AccountPage} from "./account";
import {AboutusPage} from "./aboutus";


@Component({
  templateUrl: 'setting.html'
})
export class SettingPage {

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public imService: IMService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public app :App) {
    
  }

  loginOut(){
    this.userService.loginOut();
    this.imService.clearCurrentData();
    this.imService.close();
    this.app.getRootNav().setRoot(LoginPage);
  }
 
  goEdit(){
    this.navCtrl.push(EditDetailPage);
  }
  goAccount(){
    this.navCtrl.push(AccountPage);
  }
  goUs(){
    this.navCtrl.push(AboutusPage);
  }

}
