package com.xnjr.moom.front.req;

public class XN610050Req {

    // 标题（必填）
    private String title;

    // 内容（必填）
    private String content;

    // 多张图片（选填）
    private String pic;

    // 所属板块（必填）
    private String plateCode;

    // 发布人（必填）
    private String publisher;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getPlateCode() {
        return plateCode;
    }

    public void setPlateCode(String plateCode) {
        this.plateCode = plateCode;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
}
