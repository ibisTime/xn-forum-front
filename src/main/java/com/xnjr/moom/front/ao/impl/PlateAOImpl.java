/**
 * @Title PlateAOImpl.java 
 * @Package com.xnjr.moom.front.ao.impl 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午5:13:25 
 * @version V1.0   
 */
package com.xnjr.moom.front.ao.impl;

import org.springframework.stereotype.Service;

import com.xnjr.moom.front.ao.IPlateAO;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN610031Req;
import com.xnjr.moom.front.req.XN610806Req;
import com.xnjr.moom.front.req.XN806031Req;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午5:13:25 
 * @history:
 */
@Service
public class PlateAOImpl implements IPlateAO {

    /** 
     * @see com.xnjr.moom.front.ao.IPlateAO#queryListPlate(java.lang.String)
     */
    @Override
    public Object queryPlateList(String kind, String userId, String siteCode) {
        XN610031Req req = new XN610031Req();
        req.setKind(kind);
        req.setUserId(userId);
        req.setSiteCode(siteCode);
        return BizConnecter.getBizData("610031", JsonUtils.object2Json(req),
            Object.class);
    }

    @Override
    public Object queryPlateInfo(String code) {
        return BizConnecter.getBizData("610032",
            JsonUtils.string2Json("code", code), Object.class);
    }
    
    @Override
    public Object queryPasswordList(String type, String account, String companyCode){
    	XN806031Req req = new XN806031Req();
    	req.setAccount(account);
    	req.setCompanyCode(companyCode);
    	req.setType(type);
    	return BizConnecter.getBizData("806031", JsonUtils.object2Json(req),
    		Object.class);
    }

	@Override
	public Object queryCategoryList(String parentCode, String type,
			String name, String companyCode) {
		XN610806Req req = new XN610806Req();
		req.setCompanyCode(companyCode);
		req.setName(name);
		req.setParentCode(parentCode);
		req.setType("1");
		req.setOrderColumn("order_no");
		req.setOrderDir("asc");
		return BizConnecter.getBizData("610806", JsonUtils.object2Json(req),
	    	Object.class);
	}

	@Override
	public Object queryCategoryInfo(String code) {
		return BizConnecter.getBizData("610807", JsonUtils.string2Json("code", code),
	    	Object.class);
	}
}
