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
import com.xnjr.moom.front.req.XN610031Req;

@Controller
@RequestMapping(value = "/view")
public class ViewController extends BaseController {

    // 列表查询导航
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object siteList(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "isDqNavigate", required = false) String isDqNavigate,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "isGlobal", required = false) String isGlobal,
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "siteCode", required = false) String siteCode) {
    	XN610031Req req = new XN610031Req();
    	req.setCode(code);
    	req.setIsDqNavigate(isDqNavigate);
    	req.setName(title);
    	req.setStatus(status);
    	req.setType(type);
    	req.setIsGlobal(isGlobal);
    	req.setParentCode(parentCode);
    	req.setSiteCode(siteCode);
        return BizConnecter.getBizData("610031", JsonUtils.object2Json(req),
            Object.class);
    }

    // 查询导航详情
    @RequestMapping(value = "/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object siteDetail(
            @RequestParam(value = "code", required = false) String code) {
    	return BizConnecter.getBizData("610032", JsonUtils.string2Json("code", code),
                Object.class);
    }
}
