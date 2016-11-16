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
    export const weChat = true;

    //release false才有效
     const  run_environment = environment.develop_local;

    // const  port = "8080";
    export const baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
    export function baiduMapUrl() {

        if (release) {

            if(weChat) {

                return "http://cswapp.hichengdai.com/geocoder/";

            } else {

                return "http://api.map.baidu.com/geocoder/v2/";

            }


        } else {

            if(weChat){

                switch (run_environment){

                    case environment.test: return "http://120.26.222.73:8080/geocoder/";
                    case environment.develop: return "http://121.43.101.148:8080/geocoder/";
                    case environment.develop_local:  return "http://localhost:8080/geocoder/";

                }

            } else {

                return "http://api.map.baidu.com/geocoder/v2/";

            }
        }
    }

    export function  url(){

        if(release){

            return "http://cswapp.hichengdai.com/xn-forum-front";

        } else {

            if(weChat){

                switch (run_environment){

                    case environment.test: return "http://120.26.222.73:8080/xn-forum-front";
                    case environment.develop: return "http://121.43.101.148:8080/xn-forum-front";
                    case environment.develop_local:  return "http://localhost:8080/xn-forum-front";

                }

            } else  {

                return "http://121.43.101.148:8080/xn-forum-front";
            }



        }

    }

    export function  kefuUrl(){

        if(release){


            if(weChat){

                return "http://cswapp.hichengdai.com/rvisitor/";

            } else {

                return "http://kefu.easemob.com/v1/Tenants/";
            }


        } else {

            if (weChat){

                switch (run_environment) {

                    case environment.test:
                        return "http://120.26.222.73:8080/rvisitor/";
                    case environment.develop:
                        return "http://121.43.101.148:8080/rvisitor/";
                    case environment.develop_local:
                        return "http://localhost:8080/rvisitor/";
                }

             } else {

                return "http://kefu.easemob.com/v1/Tenants/";

             }

        }

    }


    export function log(msg) {
        if (!release) {
            console.log(msg);
        }
    }

}

// return "http://114.55.179.135:8080/rvisitor/";
