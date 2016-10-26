package com.xnjr.moom.front.req;

public class XN805100Req {
    // 用户编号（必填）
    private String userId;

    // 地区（选填）
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
