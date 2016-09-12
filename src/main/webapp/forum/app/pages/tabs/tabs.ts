import {Component, ViewChild, ViewChildren, QueryList, AfterViewInit, Renderer} from '@angular/core';
import {HomePage} from '../home/home';
import {ImPage} from '../im/im';
import {NextPage} from "../kefu/nextpage";
import {MinePage} from "../mine/mine";
import {Tab, Tabs, Events} from "ionic-angular";
import {FriendPage} from "../friend/friend";
import {IMService, FUTURE_FRIEND_COUNT, MSG_TOTAL_COUNT} from "../../serve/im.service";
import {UserService} from "../../serve/user.serve";
import {KefuService} from "../../serve/kefu.serve";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage implements AfterViewInit{

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;
  private tab5Root: any;
  tabBadgeStyle = "danger";

  @ViewChild(Tabs) myTabs: Tabs;
  @ViewChildren(Tab) allTab: QueryList<Tab>;

  constructor(private  imService: IMService,
              private  userServe: UserService,
              private events: Events,
              private kefuService: KefuService,
              private render: Renderer) {

    this.tab1Root = HomePage;
    this.tab2Root = ImPage;
    this.tab3Root = NextPage;
    this.tab4Root = FriendPage;
    this.tab5Root = MinePage;
    //登陆成功 密码默认
    this.imService.login(this.userServe.userName);
    this.kefuService.me = this.userServe.userName;

    this.events.subscribe(FUTURE_FRIEND_COUNT, msg => {
      /*事件*/
      this.myTabs.getByIndex(3).tabBadge = msg[0] > 0 ? `${msg[0]}`: null;
    });

    this.events.subscribe(MSG_TOTAL_COUNT, msg => {
      let count = msg[0];
      let tabBadge = null;
      if( count > 0 && count <= 99) {
        tabBadge = `${count}`;
      } else if(count > 99) {
        tabBadge = '99+';
      } else if(tabBadge <= 0) {

      }
      this.myTabs.getByIndex(1).tabBadge = tabBadge;
    });

  }
  ngAfterViewInit(){

  }

}
