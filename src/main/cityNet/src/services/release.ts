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

    //const  port = "80";
    export const baiduMapAK = "diLP00QHyzEs57O1xvnmfDZFpUu2vt7N";
    export function wxLoginUrl() {

        let url;

        if(release){
            url =  "http://cswapp.hichengdai.com"
        } else {

            switch (run_environment){

                case environment.test: url = "http://120.26.222.73:80";
                case environment.develop: url = "http://tcaigo.xiongniujr.com:80";

            }
        }

       // return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef7fda595f81f6d6&redirect_uri="
       //     +
       //     url
       //     + "&response_type=code&scope=snsapi_userinfo&state=register&connect_redirect=1#wechat_redirect";
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxef7fda595f81f6d6&redirect_uri=http://tcaigo.xiongniujr.com&response_type=code&scope=snsapi_userinfo&state=register&connect_redirect=1#wechat_redirect";

    }
    
    
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

                    case environment.test: return "http://120.26.222.73:80/geocoder/";
                    case environment.develop: return "http://tcaigo.xiongniujr.com:80/geocoder/";
                    case environment.develop_local:  return "http://localhost:8080/geocoder/";

                        // http://tcaigo.xiongniujr.com
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

                    case environment.test: return "http://120.26.222.73:80/xn-forum-front";
                    case environment.develop: return "http://tcaigo.xiongniujr.com:80/xn-forum-front";
                    case environment.develop_local:  return "http://localhost:8080/xn-forum-front";

                }

            } else {

                return "http://tcaigo.xiongniujr.com:80/xn-forum-front";
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
                        return "http://120.26.222.73:80/rvisitor/";
                    case environment.develop:
                        return "http://tcaigo.xiongniujr.com:80/rvisitor/";
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

// return "http://114.55.179.135:80/rvisitor/";
