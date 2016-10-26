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
    const  port = "8080";

    export const baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
    export function baiduMapUrl() {

        if (release) {
            // return "//api.map.baidu.com/geocoder/v2/";
            return "//121.43.101.148:" + port +"/geocoder/"
        } else {
            return "http://localhost:8080/geocoder/";
        }
    }

    export function  url(){

        if(release){
            if(test){
                return "//120.26.222.73:8080/xn-forum-front";
            } else {
                return "//121.43.101.148:" + port +"/xn-forum-front";
            }

        } else {
            return "http://localhost:8080/xn-forum-front";
        }

    }

    export function  kefuUrl(){

        if(release){
            if(test){
                return "//120.26.222.73:8080";
            } else  {
                return "//121.43.101.148:" + port;
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

