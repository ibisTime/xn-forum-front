package com.xnjr.moom.front.res;

import java.util.Date;

public class BusinessTable {

    // 收入/支出/收益
    private String type;

    // 名目名称
    private String key;

    // 名目值
    private String value;

    // 备注
    private String remark;

    // 创建时间
    private Date createDatetime;

    // 业务编号
    private String businessCode;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getCreateDatetime() {
        return createDatetime;
    }

    public void setCreateDatetime(Date createDatetime) {
        this.createDatetime = createDatetime;
    }

    public String getBusinessCode() {
        return businessCode;
    }

    public void setBusinessCode(String businessCode) {
        this.businessCode = businessCode;
    }

}
