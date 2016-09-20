package com.xnjr.moom.front.req;

public class XN805102Req {
    // 用户编号
    private String userId;

    // 查询开始日期
    private String dateStart;

    // 查询结束日期
    private String dateEnd;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getDateStart() {
        return dateStart;
    }

    public void setDateStart(String dateStart) {
        this.dateStart = dateStart;
    }

    public String getDateEnd() {
        return dateEnd;
    }

    public void setDateEnd(String dateEnd) {
        this.dateEnd = dateEnd;
    }
}
