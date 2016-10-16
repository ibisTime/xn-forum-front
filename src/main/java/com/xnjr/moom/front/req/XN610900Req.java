package com.xnjr.moom.front.req;

public class XN610900Req {
    // 手机号
    private String mobile;

    // 登陆密码
    private String loginPwd;

    // 登陆密码强度 1=弱；2=中；3=强
    private String loginPwdStrength;

    // 推荐人
    private String userReferee;

    // 验证码
    private String smsCaptcha;

    // 省份
    private String province;

    // 城市
    private String city;

    // 区域
    private String area;

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getLoginPwd() {
        return loginPwd;
    }

    public void setLoginPwd(String loginPwd) {
        this.loginPwd = loginPwd;
    }

    public String getLoginPwdStrength() {
        return loginPwdStrength;
    }

    public void setLoginPwdStrength(String loginPwdStrength) {
        this.loginPwdStrength = loginPwdStrength;
    }

    public String getUserReferee() {
        return userReferee;
    }

    public void setUserReferee(String userReferee) {
        this.userReferee = userReferee;
    }

    public String getSmsCaptcha() {
        return smsCaptcha;
    }

    public void setSmsCaptcha(String smsCaptcha) {
        this.smsCaptcha = smsCaptcha;
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
}
