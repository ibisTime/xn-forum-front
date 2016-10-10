/**
 * Created by tianlei on 16/9/17.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {baiduMapUrl} from "./release";


export interface City{
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

interface navObj{
  code?;
  isGlobal?;
  orderNo?;
  parentCode?;
  pic?;
  siteCode?;
  status?;
  title?;
  type?;
  url?;
}

@Injectable()
export class CityService {

  citys = [];
  /*启动广告*/
  ads = [];
  /*推荐站点*/
  recommendSite = [];
  searchCitys = [];
  baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
  // baidu = 'http://api.map.baidu.com/location/ip';
  // baidu = "http://localhost:8080/geocoder/";
  // baidu = "http://api.map.baidu.com/geocoder/v2/"
  baidu = baiduMapUrl();
  /*客服引流数据*/
  kefuData = [];
  /*视频引流数据*/
  videoData = [];

  public headlineData = {
  "banner": [],
  "func3": [],
  "func8": [],
  "tabs": []
  };

  public tabsData = {
    "one": [],
    "two" : [],
    "three" : [],
    "four": []
  }

  currentCity: City = {"name":"未知地点"}; //根据经纬度获得

  constructor( private  http: HttpService) {

  }

  getCity(){
   return this.http.get('/site/list').then( res => {

      if(res["data"] instanceof Array ){
        /*清空原来的数据*/
        this.recommendSite = [];

        res["data"].forEach((value,index,array) => {
          if(value.priority == "2"){
            this.recommendSite.push(value);
          }
        });

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

  /*通过经纬度直接获取导航*/
  getNavByBaiduMap(longitude, latitude){

    return this.getSiteByBaiduMap(longitude, latitude).then(res => {
      let zoneObj = {
        "province":res.result.addressComponent.province,
        "city":res.result.addressComponent.city,
        "area": res.result.addressComponent.district
      }
      /*获取站点*/
       return this.getSiteByAddress(zoneObj);
    }).then(res => {
      return this.getNavigateBySiteCode(res["data"]["code"]);
    });

  }

  /*百度地图 根据经纬度查询地理位置*/
  getSiteByBaiduMap(longitude, latitude) {

    return this.http.get(null, null, this.baidu + '?ak=' + this.baiduMapAK + '&location=' + latitude + ',' + longitude + "&output=json").then(res => {
      if(res.status == "0"){

        return res;
      }
     throw new Error("定位失败")
    });
  }

  /*通过地址获取站点*/
  getSiteByAddress(zoneObj){
    return this.http.get('/site',zoneObj).then(res => {

      let re = res;
      console.log(res);

      this.currentCity = res["data"];
      return res;
    });
  }


  /*code 查询导航详情*/
  getNavigateBySiteCode(siteCode){

    let obj = {
      "isDqNavigate":"1",
      "siteCode":siteCode
    };

    /*1 菜单tabbar 2 banner 3 模块func3  4 引流func8  5.启动广告图*/
   return this.http.get('/view/list',obj).then(res => {


     let data = res["data"];
     let tempArray = [];

     if(data instanceof Array){
        //是否全局
       data.forEach((value:navObj,index,array) => {

         if(value.parentCode == "0" && value.type != "5"){

           tempArray.push(value);

         }

         if(value.type == "5"){
            this.ads.push(value);
         }

       });

       /*排序*/
       tempArray = tempArray.sort((a,b) => {
         return a.orderNo - b.orderNo;
       });

     }


      let headline =  {
        "banner": [],
        "func3": [],
        "func8": [],
        "tabs": tempArray
      };
      let kefuData = [];

      if(data instanceof Array){

        data.forEach((value,index,array) => {
          /*首页及tab数据*/
         if(value.parentCode == tempArray[0].code){

           if(value.type == "2"){
             headline["banner"].push(value);
           } else if(value.type == "3") {
             headline["func3"].push(value);
           } else if(value.type == "4"){
             headline["func8"].push(value);
           }

         } else if(value.parentCode == tempArray[2].code) {
           /*客服引流的数据*/
           kefuData.push(value);
         } else if(value.parentCode == tempArray[3].code){
           this.videoData.push(value);
         }

        });

        /*排序*/
        for ( let key in headline){
          headline[key] = headline[key].sort((a,b) => {
            return a.orderNo - b.orderNo;
          });
        }
        this.headlineData = headline;

        /*客服数据排序*/
        kefuData = kefuData.sort((a,b) => {
          return a.orderNo - b.orderNo;
        });
        this.kefuData = kefuData;
        console.log(this.kefuData);

      }

    });

  }

  searchCity(value){

    value = value.replace(/\s/g,"");
    /*匹配首字母*/
    this.searchCitys = [];
    let reg = new RegExp('[A-Za-z]');
    if(value.length == 1 && reg.test(value)){

      this.citys.find((value1,po,array) => {

        let searchCom = value1.letter == value.toUpperCase();
        if(searchCom){
          this.searchCitys = value1["data"];
        }
        return searchCom;
      })
      return;
    };

    /*匹配汉字*/
    if(value.length <= 0) return;
    reg = new RegExp(`${value}+`);

    this.citys.forEach((value1, index, array) => {

      value1.data.forEach((city: City, index1, array1) => {
        if (reg.test(city.name)) {
          this.searchCitys.push(city);
        }
      });

    })




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



  /*经纬度 查站点详情*/
  getSiteByPosition(longitude?,latitude?){

    let obj;
    if((longitude instanceof String) &&(latitude instanceof String)){
      obj = {
        "longitude":longitude,
        "latitude" :latitude
      }
    }


    return this.http.get('/site/position',obj).then( res => {

      console.log(res);
      this.currentCity = res["data"];

      return res;
    });

  }

  /*通过坐标获取详情*/
  getNavigateByPosition(x?,y?){

    return this.getSiteByPosition(x,y).then((res) => {

      return this.getNavigateBySiteCode(res['data']["code"]);

    });

  }


}
