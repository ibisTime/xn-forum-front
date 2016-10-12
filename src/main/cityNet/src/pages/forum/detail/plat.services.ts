/**
 * Created by tianlei on 2016/10/12.
 */
import {Injectable} from '@angular/core';
import {HttpService} from "../../../services/http.service";

@Injectable()
export class PlatService {

    articles = [];
    /*头条*/
    headlineArticles = [];
    /*置顶*/
    topArticels = [];
    /*精华*/
    ssenceeArticles = [];

    platCode = [];

    constructor(public  http: HttpService) {

    }

    article() {
        let obj = {
            isHeadline: "",//头条
            isTop: "",//置顶
            plateCode: this.platCode,//板块代码
            isEssence: ""//精华
        }
        this.http.get("/post/page")
    }

    /*获取置顶帖*/
    /*获取*/

}