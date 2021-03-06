/**
 * Created by tianlei on 2016/10/8.
 */
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'forumDate'
})
export class ForumDatePipe implements PipeTransform {
  transform(value: any): any {

    return this.jsDateDiff(new Date(value).getTime()/1000);
  }

  jsDateDiff(publishTime){
        var d_minutes,d_hours,d_days;
        var timeNow = new Date().getTime()/1000;
        var d;
        d = timeNow - publishTime;
        d_days = Math.floor(d/86400);
        d_hours = Math.floor(d/3600);
        d_minutes = Math.floor(d/60);
        if(d_days >= 2){
            var s = new Date(publishTime*1000);
            return (s.getMonth()+1)+"月"+s.getDate()+"日 "+s.getHours()+":"+s.getMinutes();
        }else if(d_days >= 1){
            return Math.ceil(d_days)+"天前";
        }else if(d_days < 1 && d_hours >= 1){

            return Math.ceil(d_hours)+"小时前";

        }else if(d_hours < 1 && d_minutes > 10){

            return Math.ceil(d_minutes)+"分钟前";

        } else {
            return "刚刚";
        }
  }

}
