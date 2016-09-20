/**
 * Created by tianlei on 16/9/17.
 */
import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ViewController} from "ionic-angular";
import {WarnService} from "../../services/warn.service";
import {CityService} from "../../services/city.service";

@Component({
  templateUrl:'build/pages/headline/city-choose.html',
})
export class CityChoosePage implements OnInit,AfterViewInit {

   headlineData;
  searching = false;
  constructor(private viewCtrl: ViewController,
              private cityS: CityService,
              private warn: WarnService) {

  }

  ngOnInit() {

  }

  ngAfterViewInit(){

  }

  back(){
    this.viewCtrl.dismiss();
  }

  confirmCity(city){
    this.viewCtrl.dismiss(city);
  }

  cancleSearch(){
    this.searching = false;
    this.cityS.searchCitys = [];
  }

  searchCity(value){

    this.searching = value.length > 0;
    this.cityS.searchCity(value);


  }
}
