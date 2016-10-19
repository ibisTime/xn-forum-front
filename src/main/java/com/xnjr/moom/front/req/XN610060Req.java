package com.xnjr.moom.front.req;

public class XN610060Req {

    // 帖子编号 （必填）
    private String postCode;
    
    // 用户编号
    private String userId;

    public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }
}
