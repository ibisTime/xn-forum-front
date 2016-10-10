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
      let loadNav = this.warn.loading('定位中...');

      navigator.geolocation.getCurrentPosition( (geo:any) => {

        /*同意定位加载*/

        this.cityService.getAddressByBaiduMap(geo.coords.longitude,geo.coords.latitude).then(res => {
          loadNav.dismiss();
          if(res.status == "0"){

            let cityName = res.result.addressComponent.district;
            console.log(cityName);
            let zoneObj = {
              "province":res.result.addressComponent.province,
              "city":res.result.addressComponent.city,
              "area": res.result.addressComponent.district
            };
            return this.http.get('/site',zoneObj);
          }
          throw new Error();
        }).then(res => {
          /**/
           this.cityService.getNavigateBySiteCode(res['data']["code"]);

        }).catch(error => {

          console.log(error);
        });

        /*同意加载站点*/
        // this.cityService.getNavigateByPosition(geo.coords.longitude,geo.coords.latitude).then(res => {
        //
        //   loadNav.dismiss().then(() => {
        //   });
        //
        // }).catch(error => {
        //
        //   loadNav.dismiss().then(res => {
        //     this.warn.toast('加载站点失败');
        //   });
        //
        // });

      }, error => {

        // console.log('定位超时');
        // /*不同意获取默认站点*/
        // this.cityService.getNavigateByPosition(0,0).then(res => {
        //   loadNav.dismiss().then(() => {
        //
        //   });
        //
        // }).catch(error => {
        //   loadNav.dismiss().then(res => {
        //
        //     this.warn.toast('加载站点失败');
        //
        //   });
        // });

        loadNav.dismiss();
        let zoneObj = {
          "province":"未知",
          "city":"未知",
          "area": "未知"
        };
         this.http.get('/site',zoneObj).then(res => {
           this.cityService.getNavigateBySiteCode(res['data']["code"]);
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
