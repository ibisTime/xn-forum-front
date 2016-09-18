/**
 * Created by tianlei on 16/9/17.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../services/http.service";

export interface City{

  // address?code: "ZD201609131930049587"
  // description: "简介"
  // domain: "http://dasd.cn"
  // email: "23123@163.com"
  // isDefault: "0"
  // latitude: "123.323-124.222"
  // logo: "logo url"
  // longitude: "13.234-13.323"
  // name: "啊州城市网1"
  // priority: "1"
  // qrCode: "url"
  // remark: "备注"
  // telephone: "13434344343"
  // userId: "U12321423"
  address?;
  code?;
  description?;
  domain?;
  email?;
  isDefault?;
  latitude?;
  logo?;
  longitude?;
  name?;
  priority?;
  qrCode?;
  remark?;
  telephone?;
  userId?;
}
@Injectable()
export class CityService {

  citys = [];
  baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
  baidu = 'http://api.map.baidu.com/location/ip';
  // baidu = "http://localhost:8080/baidu-map/";
  constructor( private  http: HttpService) {

  }

  getCity(success?,failure?){
    this.http.get('/site/list').then( res => {

      if(res["data"] instanceof Array ){

        this.citys = this.pySegSort(res["data"]);
      }
      (typeof(success) == "function")&&(success());
      (typeof(failure) == "function")&&(failure());

    }).catch(error => {

    });
    //
    // let args = [{name:"乐青城市网"},
    //   {name:"温州在线"},
    //   {name:"缙云在线"},
    //   {name:"张"}];
    // this.citys = this.pySegSort(args);
  }

  getDetail(code){
    this.http.get('/site/detail',{"code":code}).then( res => {
      console.log(res);
    }).catch(() => {

    });
  }

  /*经纬度 查站点详情*/
  getDetailByPosition(longitude,latitude){
    let obj = {
      "longitude":longitude,
      "latitude" :latitude
    }
    this.http.get('/position',obj).then( res => {

    }).catch(() => {

    });
  }

  getCurrentCityByIp(){
    let obj = {
     "ak" : this.baiduMapAK,
      "coor":"bd09ll"
    };

    this.http.get(null,obj,this.baidu).then(res => {
      console.log(res);
    });

  }
  pySegSort(args) {
    if (!String.prototype.localeCompare)
      return null;


    let letters = "ABCDEFGHJKLMNOPQRSTWXYZ".split('');
    let zh = "啊八擦大婀发旮哈讥咔拉妈那噢妑七呥仨他屲夕丫帀".split('');

  /*存储排序的数据*/
    let segs = [];
    // let def = {letter: "*", data: []};

    /*遍历字母*/
    letters.forEach((value, indexLetter, arr) => {

      let current = {letter: value, data: []};
      /*遍历参数*/
      let i = indexLetter;
      args.forEach((value, index, arr) => {

        if ( (zh[i].localeCompare(value.name) <= 0) && value.name.localeCompare(zh[i + 1]) < 0) {
          current.data.push(value);
        }

      });

      /*进入数组*/
      if (current.data.length) {
        segs.push(current);
        current.data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        })
      } else {
        // def.data.push(current);
      }

    });

    // if (def.data.length >= 1) {
    //   segs.push(def);
    // }

    return segs;
  }


}
