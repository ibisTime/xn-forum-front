/**
 * Created by tianlei on 16/9/26.
 */

export const RELEASE = false;
export function  url(){

    if(RELEASE){
        return "http://121.43.101.148:7303/xn-forum-front";
    } else {
        return "http://localhost:8080/xn-forum-front";
    }

}

export namespace Release {

    const release = RELEASE;

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

        if(RELEASE){
            return "http://121.43.101.148:7303/xn-forum-front";
        } else {
            return "http://localhost:8080/xn-forum-front";
        }

    }


    export function log(msg) {
        if (!release) {
            console.log(msg);
        }
    }

}

