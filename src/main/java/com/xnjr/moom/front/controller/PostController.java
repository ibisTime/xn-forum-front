/**
 * @Title PostController.java 
 * @Package com.xnjr.moom.front.controller 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午3:42:27 
 * @version V1.0   
 */
package com.xnjr.moom.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.IPostAO;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午3:42:27 
 * @history:
 */
@Controller
@RequestMapping(value = "/post")
public class PostController extends BaseController {

    @Autowired
    IPostAO postAO;

    // -----------------帖子操作----------------
    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    @ResponseBody
    public Object publishPost(
            @RequestParam(value = "title", required = true) String title,
            @RequestParam(value = "content", required = true) String content,
            @RequestParam(value = "pic", required = true) String pic,
            @RequestParam(value = "plateCode", required = true) String plateCode) {
        return postAO.publishPost(title, content, pic, plateCode, this
            .getSessionUser().getUserId());
    }

    // -----------------帖子列表----------------
    // 帖子的分页列表
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPostPage(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "isReport", required = false) String isReport,
            @RequestParam(value = "isHeadline", required = false) String isHeadline,
            @RequestParam(value = "isTop", required = false) String isTop,
            @RequestParam(value = "isEssence", required = false) String isEssence,
            @RequestParam(value = "plateCode", required = false) String plateCode,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return postAO.queryPagePost(title, status, isReport, isHeadline, isTop,
            isEssence, plateCode, start, limit, orderColumn, orderDir);
    }

    // 获取企业降本标的列表
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public Object getPostDetail(
            @RequestParam(value = "postCode", required = true) String postCode) {
        return postAO.getPost(postCode);
    }
}
