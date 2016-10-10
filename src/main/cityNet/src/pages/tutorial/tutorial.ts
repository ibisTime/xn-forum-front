/**
 * Created by tianlei on 2016/10/8.
 */
import {Component, OnInit,AfterViewInit} from '@angular/core';
import {NavController, Events} from "ionic-angular";
import {UserService} from "../../services/user.service";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../user/login";
import {CityService} from "../../services/city.service";
import {WarnService} from "../../services/warn.service";
import {IMService} from "../../services/im.service";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'tutorial-page',
  templateUrl: 'tutorial.html'
})
export class TutorialPage implements AfterViewInit {
  constructor( public nav: NavController,
               public userServe: UserService,
               public cityService: CityService,
               public warn: WarnService,
               public events: Events,
               public im: IMService,
               public http: HttpService
             ) {

  }

  ngAfterViewInit() {



    setTimeout(() => {
      let loadNav = this.warn.loading('加载中');

      navigator.geolocation.getCurrentPosition( (geo:any) => {

        /*同意定位加载*/
        this.cityService.getNavByBaiduMap(geo.coords.longitude,geo.coords.latitude).then(res => {
          loadNav.dismiss();
          console.log(res);
        }).catch(error => {

          loadNav.dismiss();
          this.warn.toast('获取导航失败');

        });


      }, error => {

        loadNav.dismiss();
        /*加载默认*/
        this.cityService.getNavByBaiduMap(0,0).then(res => {
          console.log(res);
        }).catch(error => {
          this.warn.toast('获取导航失败');

        });


      },{timeout: 5000});

    },100);

    this.events.subscribe("user:timeout",()=> {
      this.warn.toast('为了账户安全，请重新登陆');
      this.userServe.loginOut();
      this.im.close();
      this.nav.push(LoginPage);

    });

  }



  howLoad(){
    this.userServe.whetherLogin().then((msg) => {

      if(msg != null){
        this.nav.push(TabsPage);
      } else {
        this.nav.push(LoginPage);
      }

    });
  }

  loadEnd($event){

    setTimeout(() => {

      this.howLoad();

    },500);

  }

}
