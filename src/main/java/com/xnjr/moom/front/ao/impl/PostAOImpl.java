/**
 * @Title PostAOImpl.java 
 * @Package com.xnjr.moom.front.ao.impl 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午3:55:37 
 * @version V1.0   
 */
package com.xnjr.moom.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.moom.front.ao.IPostAO;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN610040Req;
import com.xnjr.moom.front.req.XN610041Req;
import com.xnjr.moom.front.req.XN610042Req;
import com.xnjr.moom.front.req.XN610043Req;
import com.xnjr.moom.front.req.XN610044Req;
import com.xnjr.moom.front.req.XN610047Req;
import com.xnjr.moom.front.req.XN610049Req;
import com.xnjr.moom.front.req.XN610052Req;
import com.xnjr.moom.front.req.XN610053Req;
import com.xnjr.moom.front.req.XN610054Req;
import com.xnjr.moom.front.req.XN610070Req;
import com.xnjr.moom.front.req.XN610072Req;
import com.xnjr.moom.front.req.XN610073Req;
import com.xnjr.moom.front.req.XN610075Req;
import com.xnjr.moom.front.req.XN610076Req;
import com.xnjr.moom.front.req.XN610077Req;
import com.xnjr.moom.front.req.XN610078Req;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午3:55:37 
 * @history:
 */
@Service
public class PostAOImpl implements IPostAO {

    /**
     * @see com.xnjr.moom.front.ao.IPostAO#publishPost(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object publishPost(String title, String content, String pic,
            String plateCode, String publisher, String isPublish) {
        if (StringUtils.isBlank(content)) {
            throw new BizException("A010001", "发布内容不能为空");
        }
        if (StringUtils.isBlank(plateCode)) {
            throw new BizException("A010001", "选择板块不能为空");
        }
        if (StringUtils.isBlank(publisher)) {
            throw new BizException("A010001", "发布人不能为空");
        }
        XN610040Req req = new XN610040Req();
        req.setTitle(title);
        req.setContent(content);
        req.setPic(pic);
        req.setPlateCode(plateCode);
        req.setPublisher(publisher);
        req.setIsPublish(isPublish);
        return BizConnecter.getBizData("610040", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.IPostAO#publishPost(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object draftPublishPost(String code, String title, String content,
            String pic, String plateCode, String publisher, String isPublish) {
        if (StringUtils.isBlank(content)) {
            throw new BizException("A010001", "发布内容不能为空");
        }
        if (StringUtils.isBlank(plateCode)) {
            throw new BizException("A010001", "选择板块不能为空");
        }
        if (StringUtils.isBlank(publisher)) {
            throw new BizException("A010001", "发布人不能为空");
        }
        XN610041Req req = new XN610041Req();
        req.setCode(code);
        req.setTitle(title);
        req.setContent(content);
        req.setPic(pic);
        req.setPlateCode(plateCode);
        req.setPublisher(publisher);
        req.setIsPublish(isPublish);
        return BizConnecter.getBizData("610041", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryPagePost(String title, String keyword, String status,
            String location, String plateCode, String siteCode,
            String publisher, String start, String limit, String orderColumn,
            String orderDir, String userId, String isLock, String dateStart,
            String dateEnd) {
        XN610070Req req = new XN610070Req();
        req.setUserId(userId);
        req.setKeyword(keyword);
        req.setTitle(title);
        req.setPublisher(publisher);
        req.setStatus(status);
        req.setLocation(location);
        req.setIsLock(isLock);
        req.setPlateCode(plateCode);
        req.setSiteCode(siteCode);
        req.setDateEnd(dateEnd);
        req.setDateStart(dateStart);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);

        return BizConnecter.getBizData("610070", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.IPostAO#getPost(java.lang.String)
     */
    @Override
    public Object getPost(String postCode, String userId, String commStatus) {
        XN610072Req req = new XN610072Req();
        req.setCode(postCode);
        req.setUserId(userId);
        req.setCommStatus(commStatus);
        return BizConnecter.getBizData("610072", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object praise(String type, String postCode, String talker) {
        XN610053Req req = new XN610053Req();
        req.setPostCode(postCode);
        req.setUserId(talker);
        req.setType(type);
        return BizConnecter.getBizData("610053", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object comment(String content, String parentCode, String commer) {
        XN610042Req req = new XN610042Req();
        req.setCommer(commer);
        req.setContent(content);
        req.setParentCode(parentCode);
        return BizConnecter.getBizData("610042", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object deletePost(String code, String userId, String type) {
        XN610047Req req = new XN610047Req();
        req.setCode(code);
        req.setUserId(userId);
        req.setType(type);
        return BizConnecter.getBizData("610047", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object queryPageCollections(String talker, String start,
            String limit, String orderColumn, String orderDir) {
        XN610073Req req = new XN610073Req();
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        req.setStart(start);
        req.setTalker(talker);
        return BizConnecter.getBizData("610073", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMyPostPage(String userId, String status,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir) {
        XN610075Req req = new XN610075Req();
        req.setUserId(userId);
        req.setStatus(status);
        req.setDateStart(dateStart);
        req.setDateEnd(dateEnd);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("610075", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMyCommentToPage(String userId, String start, String limit) {
        XN610076Req req = new XN610076Req();
        req.setUserId(userId);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("610076", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryMyCommentFromPage(String userId, String start,
            String limit) {
        XN610077Req req = new XN610077Req();
        req.setUserId(userId);
        req.setStart(start);
        req.setLimit(limit);
        return BizConnecter.getBizData("610077", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryPostDetailComment(String userId, String commentCode) {
        XN610078Req req = new XN610078Req();
        req.setUserId(userId);
        req.setCommentCode(commentCode);
        return BizConnecter.getBizData("610078", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object report(String reporter, String code, String reportNote,
            String type) {
        XN610043Req req = new XN610043Req();
        req.setReporter(reporter);
        req.setReportNote(reportNote);
        req.setCode(code);
        req.setType(type);
        return BizConnecter.getBizData("610043", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object gratuity(String talker, String postCode, String amount) {
        XN610054Req req = new XN610054Req();
        req.setAmount(amount);
        req.setPostCode(postCode);
        req.setUserId(talker);
        return BizConnecter.getBizData("610054", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object read(String userId, String postCode) {
        XN610052Req req = new XN610052Req();
        req.setPostCode(postCode);
        req.setUserId(userId);
        return BizConnecter.getBizData("610052", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object totalPost(String userId) {
        return BizConnecter.getBizData("610900",
            JsonUtils.string2Json("userId", userId), Object.class);
    }

    @Override
    public Object checkPost(String code, String approveResult, String approver,
            String approveNote, String type) {
        XN610044Req req = new XN610044Req();
        req.setApproveNote(approveNote);
        req.setApprover(approver);
        req.setApproveResult(approveResult);
        req.setCode(code);
        req.setType(type);
        return BizConnecter.getBizData("610044", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object setTop(String code, String location, String endDatetime) {
        XN610049Req req = new XN610049Req();
        req.setCode(code);
        req.setEndDatetime(endDatetime);
        req.setLocation(location);
        return BizConnecter.getBizData("610049", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object lockPost(String code) {
        return BizConnecter.getBizData("610051",
            JsonUtils.string2Json("code", code), Object.class);
    }
}
