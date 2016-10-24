package com.xnjr.moom.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN806052Req;

@Controller
@RequestMapping(value = "/view")
public class ViewController extends BaseController {

    // 列表查询导航
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object siteList(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "siteCode", required = false) String companyCode) {
        XN806052Req req = new XN806052Req();
        req.setName(name);
        req.setStatus(status);
        req.setType(type);
        req.setParentCode(parentCode);
        req.setCompanyCode(companyCode);
        return BizConnecter.getBizData("806052", JsonUtils.object2Json(req),
            Object.class);
    }

    // 查询导航详情
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object siteDetail(
            @RequestParam(value = "code", required = false) String code) {
        return BizConnecter.getBizData("806054",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
