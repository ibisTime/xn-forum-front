/**
 * Created by tianlei on 16/9/26.
 */

enum  environment{

    test = 0,
    develop,
    develop_local
}

export namespace Release {

    const release = false;

    //release false才有效
     const  run_environment = environment.test;
    export const weChat = true;
    const  port = "8080";
    export const baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
    export function baiduMapUrl() {

        if (release) {

            if(weChat) {

                return "//114.55.179.135:8080/geocoder/";

            } else {
                return "//api.map.baidu.com/geocoder/v2/";
            }


        } else {

            if(weChat){

                switch (run_environment){

                    case environment.test: return "//120.26.222.73:" + port +"/geocoder/";
                    case environment.develop: return "//121.43.101.148:" + port +"/geocoder/";
                    case environment.develop_local:  return "http://localhost:8080/geocoder/";

                }

            } else {

                return "//api.map.baidu.com/geocoder/v2/";

            }
        }
    }

    export function  url(){

        if(release){

            return "//114.55.179.135:8080";

        } else {

            switch (run_environment){

                case environment.test: return "//120.26.222.73:8080/xn-forum-front";
                case environment.develop: return "//121.43.101.148:" + port +"/xn-forum-front";
                case environment.develop_local:  return "http://localhost:8080/xn-forum-front";

            }


        }

    }

    export function  kefuUrl(){

        if(release){


          return "//114.55.179.135:8080";


        } else {

            switch (run_environment){
                case environment.test: return "//120.26.222.73:8080";
                case environment.develop:  return "//121.43.101.148:" + port;
                case environment.develop_local:   return "http://localhost:8080";
            }

        }

    }


    export function log(msg) {
        if (!release) {
            console.log(msg);
        }
    }

}

