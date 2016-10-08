/**
 * Created by tianlei on 2016/10/8.
 */
import {Component, OnInit,AfterViewInit} from '@angular/core';
import {NavController} from "ionic-angular";
import {UserService} from "../../services/user.service";
import {TabsPage} from "../tabs/tabs";
import {LoginPage} from "../user/login";
import {CityService} from "../../services/city.service";
import {WarnService} from "../../services/warn.service";

@Component({
  selector: 'tutorial-page',
  templateUrl: 'tutorial.html'
})
export class TutorialPage implements AfterViewInit {
  constructor( private nav: NavController,
               private userServe: UserService,
               private cityService: CityService,
               private warn: WarnService
             ) {

  }

  ngAfterViewInit() {

    setTimeout(() => {
      let loadNav = this.warn.loading('定位中...');
      navigator.geolocation.getCurrentPosition( (position:any) => {

        /*同意定位加载*/
        console.log(position);

        /*同意加载站点*/
        this.cityService.getNavigateByPosition(position.x,position.y).then(res => {

          loadNav.dismiss().then(() => {
          });

        }).catch(error => {

          loadNav.dismiss().then(res => {
            this.warn.toast('加载站点失败');
          });

        });

      }, error => {

        /*不同意获取默认站点*/
        this.cityService.getNavigateByPosition(0,0).then(res => {
          loadNav.dismiss().then(() => {

          });

        }).catch(error => {
          loadNav.dismiss().then(res => {

            this.warn.toast('加载站点失败');

          });
        });

      },{timeout: 5000});

    },100);

  }

  howLoad(){
    this.userServe.whetherLogin().then((msg) => {

      if(msg != null){
        this.nav.push(TabsPage);
        // this.rootPage = TabsPage;
      } else {
        this.nav.push(LoginPage);
        // this.rootPage = LoginPage;
      }

    });
  }

  loadEnd($event){

    setTimeout(() => {

      this.howLoad();

    },500);

  }

}
