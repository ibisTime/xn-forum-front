/**
 * Created by tianlei on 2016/10/13.
 */
import {HttpService} from "../../services/http.service";
import { Injectable,OnDestroy} from '@angular/core';

@Injectable()
export class PageDataService implements OnDestroy{

    start = 1;
    limit = 15;
    type = "article";
    reqObj;
    url;
    httpMethod = "get";
    refreshComp;
    loadMoreComp;
    articles = [];
    items = [];

    constructor(public http: HttpService) {

    }



    refresh(success?,failure?){

        this.start = 1;
        this.loadMoreComp.enable(true);
        /*导航相关信息*/
      return this.getArticle("refresh").then(res => {

          (typeof(this.refreshComp) != "undefined")&&(this.refreshComp.complete());
          (typeof(success) != "undefined")&&(success(res));

        }).catch(error => {

          (typeof(this.refreshComp) != "undefined")&&(this.refreshComp.complete());
          (typeof(failure) != "undefined")&&(failure(error));

        });

    }

    loadMore(success?,failure?) {

       return this.getArticle().then(res => {

           (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.complete());
           (typeof(success) != "undefined")&&(success(res));
        }).catch(error => {

           (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.complete());
           (typeof(failure) != "undefined")&&(failure(error));

        });

    }


    getArticle(refresh?){

        this.reqObj["start"] = this.start;
        this.reqObj["limit"] = this.limit;
        if(this.httpMethod == "get"){

            return this.http.get(this.url,this.reqObj).then(res => {


                if(refresh == "refresh") {

                    this.articles = [];
                    this.items = []
                }

                let list = res.data.list;
                if(list.length > 0){///////////



                    this.articles.push(...list);
                    this.items.push(...list);


                    if (this.limit*this.start >= res.data.totalCount) {
                        (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));
                    }

                } else {//////////
                    (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));
                }/////////////

                this.start++;

            });

        } else {

            return this.http.post(this.url,this.reqObj).then(res => {


                if(refresh == "refresh") {

                    this.articles = [];
                    this.items = []
                }

                let list = res.data.list;
                if(list.length > 0){///////////



                    this.articles.push(...list);
                    this.items.push(...list);


                    if (this.limit*this.start >= res.data.totalCount) {
                        (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));
                    }

                } else {//////////
                    (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));
                }/////////////

                this.start++;

            });

        }


    }

    ngOnDestroy(){
        console.log('分页管理被销毁');
    }

}