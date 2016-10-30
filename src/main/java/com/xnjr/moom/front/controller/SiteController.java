package com.xnjr.moom.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN806013Req;

@Controller
@RequestMapping(value = "/site")
public class SiteController extends BaseController {

    // 列表查询站点，返回结果按首字母排序
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object siteList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "area", required = false) String area,
            @RequestParam(value = "isDefault", required = false) String isDefault) {
        XN806013Req req = new XN806013Req();
        req.setCode(code);
        req.setName(name);
        req.setCity(city);
        req.setArea(area);
        req.setUserId(userId);
        req.setLocation("12");// 启用和推荐
        req.setIsDefault(isDefault);
        return BizConnecter.getBizData("806013", JsonUtils.object2Json(req),
            Object.class);
    }

    // 按经纬度查询站点(弃用)
    // @RequestMapping(value = "/position", method = RequestMethod.GET)
    // @ResponseBody
    // public Object sitePosition(
    // @RequestParam(value = "longitude", required = false) String longitude,
    // @RequestParam(value = "latitude", required = false) String latitude) {
    //
    // XN610012Req req = new XN610012Req();
    // req.setLongitude(longitude);
    // req.setLatitude(latitude);
    // return BizConnecter.getBizData("610012", JsonUtils.object2Json(req),
    // Object.class);
    // }

    // 查询站点详情
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object siteDetail(
            @RequestParam(value = "code", required = false) String code) {
        return BizConnecter.getBizData("806010",
            JsonUtils.string2Json("code", code), Object.class);
    }

    // 查询站点（有默认值）
    @RequestMapping(value = "/fetchone", method = RequestMethod.GET)
    @ResponseBody
    public Object siteFetchone(
            @RequestParam(value = "province", required = false) String province,
            @RequestParam(value = "city", required = false) String city,
            @RequestParam(value = "area", required = false) String area) {
        XN806013Req req = new XN806013Req();
        req.setProvince(province);
        req.setCity(city);
        req.setArea(area);
        return BizConnecter.getBizData("806012", JsonUtils.object2Json(req),
            Object.class);
    }
}
