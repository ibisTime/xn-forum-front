/**
 * Created by tianlei on 16/9/27.
 */
import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";

interface Article{

}
interface Page{
  pageNO?,
  start?,
  pageSize?
  totalCount?,
  totalPage?
}
export class PageHelper  {

  start = 0;
  limit = 15;

  constructor(private http: HttpService) {
  }
  /*刷新*/
  refresh(url){
    let obj = {
      "start" : "0",
      "limit" : `${this.limit}`
    }
    return this.http.post(url,obj).then(res => {

    });


  }

  /*加载更多*/
  loadMore(url){
    let obj = {
      "start" : "0",
      "limit" : `${this.limit}`
    }
    return this.http.post(url,obj).then(res => {

      /*进行相应判断，*/
      this.limit ++;

    });


  }

}
