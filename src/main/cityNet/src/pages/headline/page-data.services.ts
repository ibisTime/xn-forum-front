/**
 * Created by tianlei on 2016/10/13.
 */
import {HttpService} from "../../services/http.service";
import { Injectable,OnDestroy} from '@angular/core';

@Injectable()
export class PageDataService implements OnDestroy{

    start = 1;
    limit = 3;
    type = "article";
    reqObj;
    url;
    refreshComp;
    loadMoreComp;
    articles = [];
    constructor(public http: HttpService) {

    }



    refresh(){

        this.start = 1;
        this.loadMoreComp.enable(true);
        /*导航相关信息*/
      return this.getArticle("refresh").then(res => {

          (typeof(this.refreshComp) != "undefined")&&(this.refreshComp.complete());

        }).catch(error => {

          (typeof(this.refreshComp) != "undefined")&&(this.refreshComp.complete());
        });

    }

    loadMore() {

       return this.getArticle().then(res => {

           (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.complete());

        }).catch(error => {

           (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.complete());

        });

    }


    getArticle(refresh?){

        this.reqObj["start"] = this.start;
        this.reqObj["limit"] = this.limit;
        return this.http.get(this.url,this.reqObj).then(res => {


            let list = res.data.list;
            if(list.length > 0){

                if(this.type == "article"){
                    for (let i = 0; i < list.length; i++) {
                        if (list[i].pic != null) {
                            list[i].pic = list[i].pic.split(/\|\|/);
                        }
                    }
                }

                (refresh == "refresh") &&(this.articles = []);
                this.articles.push(...list);

                if (3*this.start >= res.data.totalCount) {
                    (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));


                }

            } else {
                (typeof(this.loadMoreComp) != "undefined")&&(this.loadMoreComp.enable(false));
            }

            this.start++;

        }).catch(error => {
            console.log(error);
        });

    }

    ngOnDestroy(){
        console.log('分页管理被销毁');
    }
}