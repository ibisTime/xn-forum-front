package com.xnjr.moom.front.req;

public class XN610073Req {
    // 用户编号 （必填）
    private String talker;
    // 第几页
    private String start;
    // 页面个数
    private String limit;
    // 排序字段
    private String orderColumn;
    // 排序方向
    private String orderDir;
    
	public String getTalker() {
		return talker;
	}
	public void setTalker(String talker) {
		this.talker = talker;
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
}
