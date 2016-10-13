package com.xnjr.moom.front.req;

public class XN610070Req extends APageReq {
    /** 
     * @Fields serialVersionUID : TODO(用一句话描述这个变量表示什么) 
     */
    private static final long serialVersionUID = 42624793469132513L;

    // 当前用户（选填）
    private String userId;

    // 标题（选填）
    private String title;

    // 发布人（选填）
    private String publisher;

    // 状态 （选填）
    private String status;

    // 是否推荐 （选填）
    private String isHeadlines;

    // 置顶 1/精华 2/置顶+精华 3（选填）
    private String location;

    // 板块编号 （选填）
    private String plateCode;

    // 站点编号（选填）
    private String siteCode;

    // 关键字搜索（选填）
    private String keyword;

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

    public String getIsHeadlines() {
        return isHeadlines;
    }

    public void setIsHeadlines(String isHeadlines) {
        this.isHeadlines = isHeadlines;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPlateCode() {
        return plateCode;
    }

    public void setPlateCode(String plateCode) {
        this.plateCode = plateCode;
    }

    public String getSiteCode() {
        return siteCode;
    }

    public void setSiteCode(String siteCode) {
        this.siteCode = siteCode;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
