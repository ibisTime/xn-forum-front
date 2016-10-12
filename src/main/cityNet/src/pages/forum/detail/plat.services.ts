/**
 * Created by tianlei on 2016/10/12.
 */
import {Injectable, OnDestroy} from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable()
export class PlatService implements OnDestroy{

    articles = [];
    /*头条*/
    lastArticles = [];
    /*置顶*/
    topArticels = [];
    /*精华*/
    essenceeArticles = [];

    tempArticles = [];

    platCode;

    topStart = 1;
    articleStart = 1;
    lastStart = 1;
    essenceeStart = 1;


    constructor(public  http: HttpService) {
        this.tempArticles = this.articles;
    }

    ngOnDestroy(){
    }

    destroy(){
        this.topStart = 1;
        this.articles = [];
        this.lastArticles = [];
        this.topArticels = [];
        this.essenceeArticles = [];
    }

    getTopArticle(){
        let lim = 3;
        let obj = {
            // isTop: "",//置顶
            // plateCode: this.platCode,//板块代码
            start: this.topStart,
            limit: lim
        }


        return this.http.get("/post/page",obj).then(res => {

            // let thisCopy = this;

            this.resolveData(res,this.topStart,10,this.topArticels);

            // let tmpAtrticles = this.topArticels;
            // let list = res.data.list;
            //
            // if(list.length > 0){
            //     for(let i = 0; i < list.length; i++){
            //         if( list[i].pic  != null){
            //             list[i].pic = list[i].pic.split(/\|\|/);
            //         }
            //
            //     }
            //
            //
            //
            //     tmpAtrticles.push(...list);
            //     console.log(this.topArticels);
            //
            //     if (lim * thisCopy.topStart >= res.data.totalCount) {
            //         return false;
            //     } else {
            //         thisCopy.topStart++;
            //         return true;
            //     }
            //
            //
            // } else {
            //     /*无数据*/
            //     return false;
            // }

        });
    }


    getArticleByType(type){
        if(type = "all"){
            return this.getArticle();

        } else if(type = "new") {
            return this.getLastArticles();

        } else  { //
            return this.getEssenceeArticles();

        }
    }

    getEssenceeArticles(){
        this.tempArticles = this.essenceeArticles;
        let obj = {
            // plateCode: this.platCode,//板块代码
            start: this.topStart,
            // isEssence: ""//精华
            limit: 10
        }
        return this.http.get("/post/page",obj).then(res => {

            this.resolveData(res,this.essenceeStart,10,this.essenceeArticles);

        });

    }


    getLastArticles(){
        this.tempArticles = this.lastArticles;
        let obj = {
            // isHeadline: "",//头条
            // plateCode: this.platCode,//板块代码
            start: this.topStart,
            limit: 10
        }
        return this.http.get("/post/page",obj).then(res => {
            this.resolveData(res,this.lastStart,10,this.lastArticles);
        });

    }


    getArticle() {
        this.tempArticles = this.articles;
        let obj = {
            // plateCode: this.platCode,//板块代码
            start: "1",
            limit: "10"
        }
       return this.http.get("/post/page",obj).then(res => {

           let thisCopy = this;
           this.resolveData(res,thisCopy.articleStart,10,thisCopy.articles);

        });

    }

    resolveData(res, start,lim, tmpAtrticles){
        let list = res.data.list;

        if(list.length > 0){
            for(let i = 0; i < list.length; i++){
                if( list[i].pic  != null){
                    list[i].pic = list[i].pic.split(/\|\|/);
                }

            }

            tmpAtrticles = tmpAtrticles.concat(...list);
            console.log(this.topArticels);
            if (lim * start >= res.data.totalCount) {
                return false;
            } else {
                start++;
                return true;
            }


        } else {
            /*无数据*/
            return false;
        }
    }
    /*获取置顶帖*/
    /*获取*/

}