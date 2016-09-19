/**
 * Created by tianlei on 16/9/17.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";

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
  public headlineData = {
  "banner": [],
  "func3": [],
  "func8": [],
  "tabs": []
  };

  currentCity: City = {"name":"未知地点"}; //根据经纬度获得

  constructor( private  http: HttpService) {
  }

  getCity(){
   return this.http.get('/site/list').then( res => {

      if(res["data"] instanceof Array ){

        this.citys = this.pySegSort(res["data"]);
      }

    });

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

  return this.http.get('/site/position',obj).then( res => {

     console.log('通过经纬度获得站点');
     console.log(res);
     this.currentCity = res["data"];

     return res;
    });

  }

  getCurrentCityByIp(){

    let obj = {
     "ak" : this.baiduMapAK,
     "coor":"bd09ll"
    };

   return this.http.get(null,obj,this.baidu).then(res => {

      return res.content.point;

    }).then(point => {


      return this.getDetailByPosition(point.x,point.y);

    }).then(res => {
      /**/

      return this.getNavigateByCode(res['data']["code"]);

    });

  }

  /*code 查询导航详情*/
  getNavigateByCode(siteCode){

    let obj = {
      "siteCode":siteCode
    };

    /*1 菜单tabbar 2 banner 3 模块func3  4 引流func8*/
   return this.http.get('/view/list',obj).then(res => {



      let headline =  {
        "banner": [],
        "func3": [],
        "func8": [],
        "tabs": []
      };
      let data = res["data"];
      if(data instanceof Array){

        /*分类*/
        data.forEach((value,index,array) => {

          if(value.type == "2"){
            headline["banner"].push(value);
          } else if(value.type == "3") {
            headline["func3"].push(value);
          } else if(value.type == "4"){
            headline["func8"].push(value);
          } else if(value.type == "1"){
            headline["tabs"].push(value);
          }

        });

        /*排序*/
        for ( let key in headline){
          headline[key] = headline[key].sort((a,b) => {
            return a.orderNo - b.orderNo;
          });
        }

        this.headlineData = headline;
      }


       // return 'success';
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
