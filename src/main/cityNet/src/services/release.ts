/**
 * Created by tianlei on 16/9/26.
 */

export const weChat = true;
export const RELEASE = false;

export function  baiduMapUrl(){

    if(RELEASE){
        return "http://api.map.baidu.com/geocoder/v2/";
    } else {
        return "http://localhost:8080/geocoder/";
    }

}


export function  url(){

    if(RELEASE){
        return "http://121.43.101.148:7303/xn-forum-front";
    } else {
        return "http://localhost:8080/xn-forum-front";
    }

}