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
import com.xnjr.moom.front.req.XN610050Req;
import com.xnjr.moom.front.req.XN610051Req;
import com.xnjr.moom.front.req.XN610056Req;
import com.xnjr.moom.front.req.XN610057Req;
import com.xnjr.moom.front.req.XN610070Req;
import com.xnjr.moom.front.req.XN610072Req;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午3:55:37 
 * @history:
 */
@Service
public class PostAOImpl implements IPostAO {

    /** 
     * @see com.xnjr.moom.front.ao.IPostAO#publishPost(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object publishPost(String title, String content, String pic,
            String plateCode, String publisher) {
        if (StringUtils.isBlank(title)) {
            throw new BizException("A010001", "标题不能为空");
        }
        if (StringUtils.isBlank(content)) {
            throw new BizException("A010001", "发布内容不能为空");
        }
        if (StringUtils.isBlank(plateCode)) {
            throw new BizException("A010001", "选择板块不能为空");
        }
        if (StringUtils.isBlank(publisher)) {
            throw new BizException("A010001", "发布人不能为空");
        }
        XN610050Req req = new XN610050Req();
        req.setTitle(title);
        req.setContent(content);
        req.setPic(pic);
        req.setPlateCode(plateCode);
        req.setPublisher(publisher);
        return BizConnecter.getBizData("610050", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.IPostAO#queryPagePost(java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object queryPagePost(String title, String status, String isReport,
            String isHeadline, String isTop, String isEssence,
            String plateCode, String start, String limit, String orderColumn,
            String orderDir, String userId) {
        XN610070Req req = new XN610070Req();
        req.setTitle(title);
        req.setStatus(status);
        req.setIsReport(isReport);
        req.setIsHeadline(isHeadline);
        req.setIsTop(isTop);
        req.setIsEssence(isEssence);
        req.setPlateCode(plateCode);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        req.setUserId(userId);
        return BizConnecter.getBizData("610070", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.IPostAO#getPost(java.lang.String)
     */
    @Override
    public Object getPost(String postCode, String userId) {
        XN610072Req req = new XN610072Req();
        req.setCode(postCode);
        req.setUserId(userId);
        return BizConnecter.getBizData("610072", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object praise(String type, String postCode, String talker) {
        XN610056Req req = new XN610056Req();
        req.setPostCode(postCode);
        req.setTalker(talker);
        req.setType(type);
        return BizConnecter.getBizData("610056", JsonUtils.object2Json(req),
            Object.class);
    }

    public Object comment(String content, String parentCode, String commer) {
        XN610057Req req = new XN610057Req();
        req.setCommer(commer);
        req.setContent(content);
        req.setParentCode(parentCode);
        return BizConnecter.getBizData("610057", JsonUtils.object2Json(req),
            Object.class);
    }
    
    public Object deletePost(String code, String userId){
    	XN610051Req req = new XN610051Req();
    	req.setCode(code);
    	req.setUserId(userId);
    	return BizConnecter.getBizData("610051", JsonUtils.object2Json(req),
                Object.class);
    	
    }
}
