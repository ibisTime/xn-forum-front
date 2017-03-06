package com.xnjr.moom.front.req;

public class XN806017Req {

    // 公司编号（选填）
    private String code;

    // userId（选填）
    private String userId;

    // 公司名称（选填）
    private String name;

    // 公司简称（选填）
    private String abbrName;

    // 类型（选填）
    private String type;

    // 是否默认（选填）
    private String isDefault;

    // 是否热门（选填）
    private String isHot;

    // UI位置（选填）
    private String location;

    // 省份（选填）
    private String province;

    // 城市（选填）
    private String city;

    // 区(县)（选填）
    private String area;

    public String getIsHot() {
        return isHot;
    }

    public void setIsHot(String isHot) {
        this.isHot = isHot;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbbrName() {
        return abbrName;
    }

    public void setAbbrName(String abbrName) {
        this.abbrName = abbrName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getIsDefault() {
        return isDefault;
    }

    public void setIsDefault(String isDefault) {
        this.isDefault = isDefault;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
