package com.xnjr.moom.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN805080Req;
import com.xnjr.moom.front.req.XN805081Req;
import com.xnjr.moom.front.req.XN805090Req;
import com.xnjr.moom.front.req.XN805091Req;

@Controller
@RequestMapping(value = "/rs")
public class MemberRSController extends BaseController {

    // 关注
    @RequestMapping(value = "/follow", method = RequestMethod.POST)
    @ResponseBody
    public Object follow(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "toUser", required = false) String toUser) {
        XN805080Req req = new XN805080Req();
        req.setUserId(getSessionUserId(userId));
        req.setToUser(toUser);
        return BizConnecter.getBizData("805080", JsonUtils.object2Json(req),
            Object.class);
    }

    // 取消关注
    @RequestMapping(value = "/unfollow", method = RequestMethod.POST)
    @ResponseBody
    public Object unfollow(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "toUser", required = false) String toUser) {
        XN805081Req req = new XN805081Req();
        req.setUserId(getSessionUserId(userId));
        req.setToUser(toUser);
        return BizConnecter.getBizData("805081", JsonUtils.object2Json(req),
            Object.class);
    }

    // 分页查询关注
    @RequestMapping(value = "/follows/page", method = RequestMethod.GET)
    @ResponseBody
    public Object followsPage(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        XN805090Req req = new XN805090Req();
        req.setMobile(mobile);
        req.setUserId(getSessionUserId(userId));
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805090", JsonUtils.object2Json(req),
            Object.class);
    }

    // 列表查询关注
    @RequestMapping(value = "/follows/list", method = RequestMethod.GET)
    @ResponseBody
    public Object followsList(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userId", required = false) String userId) {
        XN805091Req req = new XN805091Req();
        req.setMobile(mobile);
        req.setUserId(getSessionUserId(userId));
        return BizConnecter.getBizData("805091", JsonUtils.object2Json(req),
            Object.class);
    }

    // 分页查询粉丝
    @RequestMapping(value = "/fans/page", method = RequestMethod.GET)
    @ResponseBody
    public Object fansPage(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit) {
        XN805090Req req = new XN805090Req();
        req.setMobile(mobile);
        req.setToUser(getSessionUserId(userId));
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("805090", JsonUtils.object2Json(req),
            Object.class);
    }

    // 列表查询粉丝
    @RequestMapping(value = "/fans/list", method = RequestMethod.GET)
    @ResponseBody
    public Object fansList(
            @RequestParam(value = "mobile", required = false) String mobile,
            @RequestParam(value = "userId", required = false) String userId) {
        XN805091Req req = new XN805091Req();
        req.setMobile(mobile);
        req.setUserId(getSessionUserId(userId));
        return BizConnecter.getBizData("805091", JsonUtils.object2Json(req),
            Object.class);
    }
}
