package com.xnjr.moom.front.req;

public class XN610903Req {
    // （必填） 用户编号
    private String userId;

    // （必填） 地区
    private String location;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
