import { hashHistory } from 'react-router';

Date.prototype.format = function(format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};

module.exports = {
    formatDate: (date, format) => {
        if (!date)
            return "--";
        if (typeof date == "string")
            date = date.replace(/(12:\d\d:\d\d\s)AM$/, "$1PM");
        return new Date(date).format(format);
    },
    historyBack: (e) => {
        e && e.preventDefault();
        window.history.back();
    },
    goPath: (path) => {
        hashHistory.push(path)
    }
};
