/**
 * Created by tianlei on 16/9/17.
 */
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ViewController} from "ionic-angular";
import {CityService} from "./city.service";
import {WarnService} from "../../services/warn.service";

@Component({
  templateUrl:'build/pages/headline/city-choose.html',
  providers:[CityService]
})
export class CityChoosePage implements OnInit,AfterViewInit {
  constructor(private viewCtrl: ViewController,
              private cityS: CityService,
              private warn: WarnService) {

  }

  ngOnInit() {
     this.cityS.getCity();
  }

  ngAfterViewInit(){

  }

  back(){
    this.viewCtrl.dismiss();
  }

  confirmCity(city){
    this.viewCtrl.dismiss(city);
  }

}
