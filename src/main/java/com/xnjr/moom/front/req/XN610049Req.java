package com.xnjr.moom.front.req;

public class XN610049Req {
    // 帖子编号
    private String code;

    // 位置 A置顶 B 精华 C 头条
    private String location;

    // 有效期终止时间
    private String endDatetime;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getEndDatetime() {
        return endDatetime;
    }

    public void setEndDatetime(String endDatetime) {
        this.endDatetime = endDatetime;
    }
}
