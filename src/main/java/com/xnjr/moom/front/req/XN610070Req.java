package com.xnjr.moom.front.req;

public class XN610070Req {
    // 标题
    private String title;

    // 发布人
    private String publisher;

    // 状态 0 待审核 1 审核通过 2 审核不同 3 已发布
    private String status;

    // 是否举报 1 是 0 否
    private String isReport;

    // 是否推荐 1 是 0 否
    private String isHeadline;

    // 是否置顶 1 是 0 否
    private String isTop;

    // 是否精华 1 是 0 否
    private String isEssence;

    // 板块编号
    private String plateCode;

    // 站点编号
    private String siteCode;

    // 发布开始时间 2015-01-01
    private String dateStart;

    // 发布结束时间 2015-10-01
    private String dateEnd;

    // 第几页 0=第一页；1=第二页…
    private String start;

    // 页面个数 1
    private String limit;

    // 排序字段 code等
    private String orderColumn;

    // 排序方向 asc=升序；desc=降序
    private String orderDir;

    private String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getIsReport() {
        return isReport;
    }

    public void setIsReport(String isReport) {
        this.isReport = isReport;
    }

    public String getIsHeadline() {
        return isHeadline;
    }

    public void setIsHeadline(String isHeadline) {
        this.isHeadline = isHeadline;
    }

    public String getIsTop() {
        return isTop;
    }

    public void setIsTop(String isTop) {
        this.isTop = isTop;
    }

    public String getIsEssence() {
        return isEssence;
    }

    public void setIsEssence(String isEssence) {
        this.isEssence = isEssence;
    }

    public String getPlateCode() {
        return plateCode;
    }

    public void setPlateCode(String plateCode) {
        this.plateCode = plateCode;
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

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getLimit() {
        return limit;
    }

    public void setLimit(String limit) {
        this.limit = limit;
    }

    public String getOrderColumn() {
        return orderColumn;
    }

    public void setOrderColumn(String orderColumn) {
        this.orderColumn = orderColumn;
    }

    public String getOrderDir() {
        return orderDir;
    }

    public void setOrderDir(String orderDir) {
        this.orderDir = orderDir;
    }

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

}
