/**
 * Created by tianlei on 16/9/21.
 */
import {Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer} from '@angular/core';
import {NavController} from "ionic-angular";

@Component({

  templateUrl: 'search-user-article.html',
  styles:[`
  .current-btn{
  background-color: white;
  color: rgb(206,63,66);
  }
  
  `]
})
export class SearchUserAndArticlePage implements OnInit, AfterViewInit {
  @ViewChild('left') left: ElementRef;

  show = true;
  constructor(private  navCtrl: NavController,
              private render:Renderer) {
  }

  ngOnInit() {
  }
  back(){
    this.navCtrl.pop();


  }
  leftClick(){
    this.show = true;
  }
  rightClick(){
    this.show = false;

  }
  ngAfterViewInit(){

  }
}
