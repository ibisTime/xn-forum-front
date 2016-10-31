package com.xnjr.moom.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.IDictAO;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN807715Req;

@Controller
@RequestMapping(value = "/sconfig")
public class SystemConfigController {
    @Autowired
    IDictAO dictAO;

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageConfig(
    		@RequestParam(value = "ckey", required = false) String ckey,
            @RequestParam(value = "start", required = true) String start,
            @RequestParam(value = "limit", required = true) String limit) {
    	XN807715Req req = new XN807715Req();
    	req.setCkey(ckey);
    	req.setLimit(limit);
    	req.setStart(start);
        return BizConnecter.getBizData("807715", JsonUtils.object2Json(req),
        		Object.class);
    }
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryConfigInfo(
    		@RequestParam(value = "ckey", required = true) String ckey) {
        return BizConnecter.getBizData("807717", JsonUtils.string2Json("ckey", ckey),
        		Object.class);
    }
}
