package com.xnjr.moom.front.req;

public class XN805904Req {
    // 手机号(必填)
    private String mobile;

    // 业务类型(必填)
    private String bizType;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getBizType() {
        return bizType;
    }

    public void setBizType(String bizType) {
        this.bizType = bizType;
    }
}
