/**
 * Created by tianlei on 16/9/26.
 */

// export const RELEASE = false;

// export function  url(){
//
//     if(RELEASE){
//         return "http://121.43.101.148:7303/xn-forum-front";
//     } else {
//         return "http://localhost:8080/xn-forum-front";
//     }
//
// }

export namespace Release {

    const release = false;
    const  test = false;

    export const weChat = true;

    export const baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
    export function baiduMapUrl() {

        if (release) {
            return "http://api.map.baidu.com/geocoder/v2/";
        } else {
            return "http://localhost:8080/geocoder/";
        }
    }

    export function  url(){

        if(release){
            if(test){
                return "http://120.26.222.73:8080/xn-forum-front";
            } else {
                return "//121.43.101.148:8080/xn-forum-front";
            }

        } else {
            return "http://localhost:8080/xn-forum-front";
        }

    }

    export function  kefuUrl(){

        if(release){
            if(test){
                return "http://120.26.222.73:8080";
            } else  {
                return "//121.43.101.148:8080";
            }

        } else {
            return "http://localhost:8080";
        }

    }


    export function log(msg) {
        if (!release) {
            console.log(msg);
        }
    }

}

