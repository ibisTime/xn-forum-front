import {Component} from '@angular/core';
import {HeadlinePage} from "../headline/headline";
import {ForumPage} from "../forum/forum";

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;


  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = HeadlinePage;
    this.tab2Root = ForumPage;
  }
}
