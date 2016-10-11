/**
 * @Title PlateAOImpl.java 
 * @Package com.xnjr.moom.front.ao.impl 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午5:13:25 
 * @version V1.0   
 */
package com.xnjr.moom.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.moom.front.ao.IPlateAO;
import com.xnjr.moom.front.enums.EBoolean;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN610046Req;

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
    public Object queryPlateList(String siteCode, String kind) {
        if (StringUtils.isBlank(siteCode)) {
            throw new BizException("A010001", "站点编号不能为空");
        }
        XN610046Req req = new XN610046Req();
        req.setSiteCode(siteCode);
        req.setKind(kind);
        req.setStatus(EBoolean.YES.getCode());
        return BizConnecter.getBizData("610046", JsonUtils.object2Json(req),
            Object.class);
    }
}
