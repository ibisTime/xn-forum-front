package com.xnjr.moom.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN610011Req;
import com.xnjr.moom.front.req.XN610012Req;

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
            @RequestParam(value = "priority", required = false) String priority,
            @RequestParam(value = "isDefault", required = false) String isDefault) {
    	XN610011Req req = new XN610011Req();
    	req.setCode(code);
    	req.setName(name);
        req.setUserId(userId);
        req.setPriority(priority);
        req.setIsDefault(isDefault);
        return BizConnecter.getBizData("610011", JsonUtils.object2Json(req),
            Object.class);
    }

    // 按经纬度查询站点
    @RequestMapping(value = "/position", method = RequestMethod.GET)
    @ResponseBody
    public Object sitePosition(
            @RequestParam(value = "longitude", required = false) String longitude,
            @RequestParam(value = "latitude", required = false) String latitude) {

    	XN610012Req req = new XN610012Req();
    	req.setLongitude(longitude);
    	req.setLatitude(latitude);
        return BizConnecter.getBizData("610012", JsonUtils.object2Json(req),
            Object.class);
    }

    // 查询站点详情
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object siteDetail(
            @RequestParam(value = "code", required = false) String code) {
    	return BizConnecter.getBizData("610013", JsonUtils.string2Json("code", code),
                Object.class);
    }
}
