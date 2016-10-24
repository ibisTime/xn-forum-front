package com.xnjr.moom.front.req;

/** 
 * 板块列表查询
 * @author: xieyj 
 * @since: 2016年8月29日 下午2:38:43 
 * @history:
 */
public class XN610031Req {
    // 类别(选填)
    private String kind;

    // 版主(选填)
    private String userId;

    public String getKind() {
        return kind;
    }

    public void setKind(String kind) {
        this.kind = kind;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

}
