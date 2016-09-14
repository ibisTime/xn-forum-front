import {Component} from '@angular/core';
import {HeadlinePage} from "../headline/headline";
import {ForumPage} from "../forum/forum";
import {MinePage} from "../mine/mine";
import {KefuPage} from "../kefu/kefu";
import {VideoPage} from "../video/video";
import {UserService} from "../../services/user.services";
import {KefuService} from "../../services/kefu.serve";
import {NavController} from 'ionic-angular';
import {LoginPage} from '../user/login';
import {IMService} from "../../services/im.service";


@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;


  constructor(private userServe: UserService,
              private kefuService: KefuService,
              private nav: NavController,
              private imServe: IMService) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HeadlinePage;
    this.tab2Root = ForumPage;
    this.tab3Root = KefuPage;
    this.tab4Root = VideoPage;
    this.tab5Root = MinePage;

    this.kefuService.me = this.userServe.userName;
    this.imServe.login(this.userServe.userName);

    // this.userServe.whetherLogin().then((msg) => {
    //
    //   if(msg != null){
    //     this.userServe.userName = msg;
    //     this.kefuService.me = msg;
    //     this.imServe.login(msg);
    //   }
    //
    // });

  }
}




