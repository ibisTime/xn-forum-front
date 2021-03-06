import {Component} from '@angular/core';
import {NavController, Platform, App} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {IMService} from "../../../services/im.service";
import {LoginPage} from "../../user/login";
import {HttpService} from "../../../services/http.service";
import {EditDetailPage} from "../detail/editDetail";
import {AccountPage} from "./account";
import {AboutusPage} from "./aboutus";
import {ChangeMobilePage} from "./changeMobile";
import {ChangeAccountPage} from "./changeAccount";
import { Storage } from '@ionic/storage';

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
              public app :App,
              public storage: Storage) {
    
  }

  loginOut(){
    this.userService.loginOut();
    this.imService.close();
    this.navCtrl.pop();
  }
 
  goEdit(){
    this.navCtrl.push(EditDetailPage);
  }
  goAccount(){
    this.navCtrl.push(AccountPage);
  }



  goChangeMobile(){
    this.navCtrl.push(ChangeMobilePage);
  }

  goChangeAccount(){
    this.navCtrl.push(ChangeAccountPage);
  }


  clear(){

    this.storage.clear();
    this.loginOut();

  }

}
