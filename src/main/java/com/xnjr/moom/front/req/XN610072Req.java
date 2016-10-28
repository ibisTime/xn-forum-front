package com.xnjr.moom.front.req;

public class XN610072Req {

    // 帖子编号 （必填）
    private String code;

    // 用户编号(选填)
    private String userId;
    
    private String commStatus;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

	public String getCommStatus() {
		return commStatus;
	}

	public void setCommStatus(String commStatus) {
		this.commStatus = commStatus;
	}
    
}
