package com.xnjr.moom.front.req;

public class XNyw4036Req {
    // 用户编号(必填)
    private String userId;

    // 认购状态(非必填)
    private String status;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
