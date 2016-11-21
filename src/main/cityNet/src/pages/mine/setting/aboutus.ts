import {Component, AfterViewInit} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {UserService} from "../../../services/user.service";
import {WarnService} from "../../../services/warn.service";
import {HttpService} from "../../../services/http.service";
import {CityService} from "../../../services/city.service";


@Component({
  templateUrl: 'aboutus.html',
  styles: [`
  div{
  
  padding: 5px 10px;
  
  }

`]
})
export class AboutusPage implements AfterViewInit{

  description = "";

  constructor(public navCtrl: NavController,
              public platform: Platform,
              public userService: UserService,
              public warnCtrl: WarnService,
              public http: HttpService,
              public cityService: CityService) {



  }


  ngAfterViewInit(){

    // cswDescription
    let load = this.warnCtrl.loading();

    this.http.get("/sconfig/info",{"ckey":"cswDescription"}).then(res => {


        this.description = res["data"]["note"];

      load.dismiss();

    }).catch(error => {
      load.dismiss();


    });

    //获取电话和时间



  }


}
