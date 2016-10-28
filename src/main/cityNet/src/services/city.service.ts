/**
 * Created by tianlei on 16/9/17.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Release} from "./release";
import {Events} from "ionic-angular";
import {Storage} from "@ionic/storage";

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
  name?;
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
  baiduMapAK = Release.baiduMapAK;
  baidu = Release.baiduMapUrl();

  /*自定义页的title*/
  customTitle = "";

  locationSuccessAddress;

  /*客服引流数据*/
  kefuData = [];
  /*视频引流数据*/
  customData = [];
  /*首页的数据*/
  headlineData = {
    "banner": [],
    "func3": [],
    "func8": []
  };
  tabbarItems = [];

  // regAddress;//存入省市区
  currentCity: City = {"name":"未知地点"}; //根据经纬度获得

  constructor( private  http: HttpService,
               public   events: Events,
               public  storage: Storage) {

  }


  getCity(){
  // ,{"priority":"1"}
   return this.http.get('/site/list').then( res => {

      if(res["data"] instanceof Array ){
        /*清空原来的数据*/
        this.recommendSite = [];

        res["data"].forEach((value,index,array) => {
          if(value.location == "2"){
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

    if(longitude == 0 && latitude == 0){

      let zoneObj = {
        "province": "未知",
        "area":  "未知",
        "city": "未知"
      }

      // this.regAddress = zoneObj;

      return this.getSiteByAddress(zoneObj);

    } else {

      return this.getSiteByBaiduMap(longitude, latitude).then(res => {

        let city = res.result.addressComponent.city;
        let area = res.result.addressComponent.district;
        let zoneObj = {
          // "province":res.result.addressComponent.province,
          // "city":res.result.addressComponent.city,
          // "city":city.slice(0,city.length - 1)
          "province":res.result.addressComponent.province.slice(0,city.length - 1) || "未知",
          "area": area || "未知",
          "city":city.slice(0,city.length - 1) || "未知"
        }

        this.cityChanged(zoneObj);

        /*定位成功 存储地理位置*/
        this.locationSuccessAddress = zoneObj;


        /*获取站点*/
        return this.getSiteByAddress(zoneObj);

      });
    }


  }

  /*城市改变 进行更新*/
  cityChanged(zoneObj){

    //如果数据库中有的话进行比对
    this.storage.get("zoneObj").then(res => {

      if(res != null){

        if(res.area != zoneObj.area){
          this.storage.set("zoneObj",zoneObj);
        }

      } else {

        //如果没有的话添加进数据库
        this.storage.set("zoneObj",zoneObj);

      }

    });

  }

  /*获取已经存储的城市 进行更新*/
  checkedCity(){
    //如果数据库中有的话进行比对
   return this.storage.get("zoneObj").then(res => {

     return res;

    });
  }

  /*百度地图 根据经纬度查询地理位置*/
  getSiteByBaiduMap(longitude, latitude) {

    return this.http.get(null, null, this.baidu + '?ak=' + this.baiduMapAK + '&location=' +`${latitude}` + ',' + `${longitude}` + "&output=json").then(res => {
      if(res.status == "0"){

        return res;
      }
     throw new Error("定位失败")
    });
  }

  /*通过地址获取站点*/
  getSiteByAddress(zoneObj){

    return this.http.get('/site/fetchone',zoneObj).then(res => {

      this.currentCity = res["data"];

      let data = res["data"];
      return this.getNavigateBySiteCode(data["code"]);
    });

  }



  /*code 查询导航详情*/
  getNavigateBySiteCode(siteCode){

    let obj = {
      "isDqNavigate":"1",
      "siteCode":siteCode,
      "status":"1"
    };

    /*1 菜单tabbar 2 banner 3 模块func3  4 引流func8  5.启动广告图*/
   return this.http.get('/view/list',obj).then(res => {

     /*重新整理逻辑*/
     let data = res["data"];


     if(data.length < 5){
       throw new Error();
     }

     /*取出 tabbar*/
     let tabbarItemsTmp = [];
     let adsTmp = [];
     data.forEach((value: navObj, index, array) => {

       if (value.type == "1") {
         tabbarItemsTmp.push(value);
       }
       /*取出广告图*/
       if (value.type == "5") {

         adsTmp.push(value);
       }

     });
     this.tabbarItems = tabbarItemsTmp;
     this.ads = adsTmp;

     //临时存储
     let kefuDataTmp = [];
     /*视频引流数据*/
     let customDataTmp = [];
     /*首页的数据*/
     let headlineDataTmp = {
       "banner": [],
       "func3": [],
       "func8": []
     };

     /*根据tabbar 取出 子导航*/
     this.tabbarItems.forEach((value: navObj, index, array) => {

       data.forEach((value_inner: navObj, index_inner, array_inner) => {

         if(value_inner.parentCode == value.code){

           if(/page:headline/.test(value.url)){

             if (value_inner.type == "2") {//banner

               headlineDataTmp.banner.push(value_inner);

             } else if (value_inner.type == "3") { //

               headlineDataTmp.func3.push(value_inner);

             } else if (value_inner.type == "4") { //func8

               headlineDataTmp.func8.push(value_inner);

             }

           } else if(/page:xiaomi/.test(value.url) && value_inner.type == "4"){

             kefuDataTmp.push(value_inner);

           } else if(/page:custom/.test(value.url) && value_inner.type == "4"){

             this.customTitle = value.name;
             customDataTmp.push(value_inner);

           }

         }

       });

     });

     /*改变值*/
     this.headlineData = headlineDataTmp;
     this.kefuData = kefuDataTmp;
     this.customData = customDataTmp;

      /*外界 得知 是否否有广告图*/
      if(this.tabbarItems.length >= 4){

        this.events.publish("city:change");
        return true;

      } else {
        return false;
      };

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
