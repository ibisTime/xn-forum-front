import React, {Component} from 'react';

export default class FormatDate extends Component {
    formatDate(date, format){
        if (!date)
            return "--";
        if (typeof date == "string")
            date = date.replace(/(12:\d\d:\d\d\s)AM$/, "$1PM");
        date = new Date(date);
        var o = {
            "M+": date.getMonth() + 1, //month
            "d+": date.getDate(), //day
            "h+": date.getHours(), //hour
            "m+": date.getMinutes(), //minute
            "s+": date.getSeconds(), //second
            "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
            "S": date.getMilliseconds() //millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? o[k]
                    : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    }
    render() {
        let {date, format} = this.props;
        return (
            <span>{this.formatDate(date, format)}</span>
        )
    }
}
