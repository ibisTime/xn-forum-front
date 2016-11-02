/**
 * @Title PostController.java 
 * @Package com.xnjr.moom.front.controller 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午3:42:27 
 * @version V1.0   
 */
package com.xnjr.moom.front.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.IPostAO;
import com.xnjr.moom.front.ao.IUserAO;

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

    @Autowired
    IUserAO userAO;

    // -----------------帖子操作----------------
    @RequestMapping(value = "/publish", method = RequestMethod.POST)
    @ResponseBody
    public Object publishPost(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = true) String content,
            @RequestParam(value = "pic", required = false) String pic,
            @RequestParam(value = "plateCode", required = true) String plateCode,
            @RequestParam(value = "isPublish", required = true) String isPublish) {
        return postAO.publishPost(title, content, pic, plateCode, this
            .getSessionUser().getUserId(), isPublish);
    }

    @RequestMapping(value = "/draft/publish", method = RequestMethod.POST)
    @ResponseBody
    public Object draftPublishPost(
            @RequestParam(value = "code", required = true) String code,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "content", required = true) String content,
            @RequestParam(value = "pic", required = false) String pic,
            @RequestParam(value = "plateCode", required = true) String plateCode,
            @RequestParam(value = "isPublish", required = true) String isPublish) {
        return postAO.draftPublishPost(code, title, content, pic, plateCode,
            this.getSessionUser().getUserId(), isPublish);
    }

    // -----------------帖子列表----------------
    // 帖子的分页列表
    @RequestMapping(value = "/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPostPage(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "location", required = false) String location,
            @RequestParam(value = "plateCode", required = false) String plateCode,
            @RequestParam(value = "siteCode", required = false) String siteCode,
            @RequestParam(value = "publisher", required = false) String publisher,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "isLock", required = false) String isLock,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd) {
        return postAO.queryPagePost(title, keyword, status, location,
            plateCode, siteCode, publisher, start, limit, orderColumn,
            orderDir, getSessionUserId(userId), isLock, dateStart, dateEnd);
    }

    // @我的帖子分页列表
    @RequestMapping(value = "/talkMe/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPostTalkMePage(
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "isLock", required = false) String isLock,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd) {
        Map map = userAO.doGetUser(this.getSessionUserId(null));
        String keyword = "@" + map.get("nickname");
        return postAO.queryPagePost(null, keyword, null, null, null, null,
            null, start, limit, orderColumn, orderDir,
            getSessionUserId(userId), isLock, dateStart, dateEnd);
    }

    // 获取帖子详情
    @RequestMapping(value = "/get", method = RequestMethod.GET)
    @ResponseBody
    public Object getPostDetail(
            @RequestParam(value = "postCode", required = true) String postCode,
            @RequestParam(value = "commStatus", required = false) String commStatus,
            @RequestParam(value = "userId", required = false) String userId) {
        return postAO.getPost(postCode, getSessionUserId(userId), commStatus);
    }

    // 点赞或收藏
    @RequestMapping(value = "/praise", method = RequestMethod.POST)
    @ResponseBody
    public Object praise(@RequestParam("type") String type,
            @RequestParam("postCode") String postCode,
            @RequestParam(value = "talker", required = false) String talker) {
        return postAO.praise(type, postCode, getSessionUserId(talker));
    }

    // 评论
    @RequestMapping(value = "/comment", method = RequestMethod.POST)
    @ResponseBody
    public Object comment(@RequestParam("content") String content,
            @RequestParam("parentCode") String parentCode,
            @RequestParam(value = "commer", required = false) String commer) {
        return postAO.comment(content, parentCode, getSessionUserId(commer));
    }

    // 将自己已发布的帖子删除
    @RequestMapping(value = "/delete", method = RequestMethod.POST)
    @ResponseBody
    public Object deletePost(@RequestParam("code") String code,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam("type") String type) {
        return postAO.deletePost(code, getSessionUserId(userId), type);
    }

    // 我收藏的帖子分页查询
    @RequestMapping(value = "/collection/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPageCollections(
            @RequestParam(value = "talker", required = false) String talker,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return postAO.queryPageCollections(getSessionUserId(talker), start,
            limit, orderColumn, orderDir);
    }

    // 分页查询我的帖子
    @RequestMapping(value = "/my/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMyPostPage(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "dateStart", required = false) String dateStart,
            @RequestParam(value = "dateEnd", required = false) String dateEnd,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return postAO.queryMyPostPage(this.getSessionUser().getUserId(),
            status, dateStart, dateEnd, start, limit, orderColumn, orderDir);
    }

    // 我发出的评论分页查询
    @RequestMapping(value = "/mytocomment/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMyCommentToPage(@RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return postAO.queryMyCommentToPage(this.getSessionUser().getUserId(),
            start, limit);
    }

    // 我收到的评论分页查询
    @RequestMapping(value = "/myfromcomment/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryMyCommentFromPage(@RequestParam("start") String start,
            @RequestParam("limit") String limit) {
        return postAO.queryMyCommentFromPage(this.getSessionUser().getUserId(),
            start, limit);
    }

    // 根据评论编号获取帖子详情
    @RequestMapping(value = "/detail/comment", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPostDetailComment(
            @RequestParam("commentCode") String commentCode) {
        return postAO.queryPostDetailComment(this.getSessionUser().getUserId(),
            commentCode);
    }

    // 举报帖子、评论
    @RequestMapping(value = "/report", method = RequestMethod.POST)
    @ResponseBody
    public Object report(@RequestParam("code") String code,
            @RequestParam("reportNote") String reportNote,
            @RequestParam("type") String type) {
        return postAO.report(this.getSessionUser().getUserId(), code,
            reportNote, type);
    }

    // 打赏帖子
    @RequestMapping(value = "/gratuity", method = RequestMethod.POST)
    @ResponseBody
    public Object gratuity(@RequestParam("postCode") String postCode,
            @RequestParam("amount") String amount) {
        return postAO.gratuity(this.getSessionUser().getUserId(), postCode,
            amount);
    }

    // 阅读帖子
    @RequestMapping(value = "/read", method = RequestMethod.POST)
    @ResponseBody
    public Object read(@RequestParam("postCode") String postCode) {
        return postAO.read(null, postCode);
    }

    // 详情查询用户发帖数
    @RequestMapping(value = "/total", method = RequestMethod.GET)
    @ResponseBody
    public Object totalPost(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "status", required = false) String status) {
        return postAO.totalPost(getSessionUserId(userId), status);
    }

    // 审核帖子/评论
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public Object checkPost(
            @RequestParam("code") String code,
            @RequestParam("approveResult") String approveResult,
            @RequestParam(value = "approver", required = false) String approver,
            @RequestParam("approveNote") String approveNote,
            @RequestParam("type") String type) {
        return postAO.checkPost(code, approveResult,
            getSessionUserId(approver), approveNote, type);
    }

    // 设置/取消帖子置顶/精华/头条
    @RequestMapping(value = "/setTop", method = RequestMethod.GET)
    @ResponseBody
    public Object setTop(@RequestParam("code") String code,
            @RequestParam("location") String location,
            @RequestParam(value = "endDatetime", required = false) String endDatetime) {
        return postAO.setTop(code, location, endDatetime);
    }

    // 锁帖/取消锁帖
    @RequestMapping(value = "/lock", method = RequestMethod.GET)
    @ResponseBody
    public Object lockPost(@RequestParam("code") String code) {
        return postAO.lockPost(code);
    }
}
