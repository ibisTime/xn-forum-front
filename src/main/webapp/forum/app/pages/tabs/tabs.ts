import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {ImPage} from '../im/im';
import {ContactPage} from "../kefu/contact";
import {MinePage} from "../mine/mine";
import {Tab, Tabs} from "ionic-angular";
import {FriendPage} from "../friend/friend";
import {IMService} from "../../serve/im.serve";
import {UserAccountService} from "../../serve/user-account.serve";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;


  constructor( private  imService : IMService,
               private  userServe: UserAccountService) {

    this.tab1Root = HomePage;
    this.tab2Root = ImPage;
    this.tab3Root = ContactPage;
    this.tab4Root = FriendPage;
    this.tab5Root = MinePage;
    //登陆成功
    this.imService.login(this.userServe.userName,this.userServe.password);

  }
}
