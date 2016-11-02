/**
 * Created by tianlei on 2016/10/12.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../../services/http.service";

export class Start {
    start;
    constructor(start){
        this.start = start;
    }
}

@Injectable()
export class PlatService{

    articles = [];
    /*头条*/
    lastArticles = [];
    /*置顶*/
    topArticels = [];
    /*精华*/
    essenceeArticles = [];

    tempArticles = [];

    platCode;

    lim = 10;

    topStart = new Start(1);
    articleStart = new Start(1);
    lastStart = new Start(1);
    essenceeStart = new Start(1);



    constructor(public  http: HttpService) {
        this.tempArticles = this.articles;
    }

    // location（选填）		A 置顶 B 精华 C 头条
    getTopArticle(){
        let lim = 4;
        let obj = {
            plateCode: this.platCode,//板块代码
            start: this.topStart.start,
            limit: lim,
            "status" : "BD",
            "location": "A"
        }

        return this.http.get("/post/page",obj).then(res => {

          return  this.resolveData(res,this.topStart,lim,this.topArticels);

        });
    }


    getArticleByType(type){
        console.log(type);
        if(type == "all"){
            return this.getArticle();

        } else if(type == "new") {
            return this.getLastArticles();

        } else  { //
            return this.getEssenceeArticles();

        }
    }

    getEssenceeArticles(){
        this.tempArticles = this.essenceeArticles;
        let obj = {
            plateCode: this.platCode,//板块代码
            start: this.essenceeStart.start,
            limit: this.lim,
            "status" : "BD",
            "location": "B"
        }
        return this.http.get("/post/page",obj).then(res => {

          return  this.resolveData(res,this.essenceeStart,this.lim,this.essenceeArticles);

        });

    }


    getLastArticles(){
        this.tempArticles = this.lastArticles;
        let obj = {
            plateCode: this.platCode,//板块代码
            start: this.lastStart.start,
            limit: this.lim,
            "status" : "BD",
        }
        return this.http.get("/post/page",obj).then(res => {
          return  this.resolveData(res,this.lastStart,this.lim,this.lastArticles);
        });

    }


    getArticle() {
        this.tempArticles = this.articles;
        let obj = {
            plateCode: this.platCode,//板块代码
            start: this.articleStart.start,
            limit: this.lim,
            "status" : "BD"
        }
       return this.http.get("/post/page",obj).then(res => {

           return  this.resolveData(res,this.articleStart,this.lim,this.articles);

        });

    }

    resolveData(res, start: Start,lim, tmpAtrticles){
        let list = res.data.list;

        if(list.length > 0){


            tmpAtrticles.push(...list);

            if (lim * start.start >= res.data.totalCount) {
                start.start ++;
                return false;
            } else {

                start.start ++;
                return true;
            }

        } else {
            /*无数据*/
            return false;
        }
    }


}