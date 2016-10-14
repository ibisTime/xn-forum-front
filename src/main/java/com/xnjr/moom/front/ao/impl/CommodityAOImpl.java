package com.xnjr.moom.front.ao.impl;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.moom.front.ao.ICommodityAO;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN610310Req;
import com.xnjr.moom.front.req.XN610311Req;
import com.xnjr.moom.front.req.XN610320Req;

@Service
public class CommodityAOImpl implements ICommodityAO {

    /** 
     * @see com.xnjr.moom.front.ao.ICommodityAO#queryProducePage(java.lang.String, java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object queryProducePage(String name, String kind, String status,
            String siteCode, String start, String limit, String orderColumn,
            String orderDir) {
        if (StringUtils.isBlank(start)) {
            throw new BizException("A010001", "开始页不能为空");
        }
        if (StringUtils.isBlank(limit)) {
            throw new BizException("A010001", "每页个数不能为空");
        }
        XN610310Req req = new XN610310Req();
        req.setName(name);
        req.setKind(kind);
        req.setStatus(status);
        req.setSiteCode(siteCode);
        req.setStart(start);
        req.setLimit(limit);
        req.setOrderColumn(orderColumn);
        req.setOrderDir(orderDir);
        return BizConnecter.getBizData("610310", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.ICommodityAO#queryProduce(java.lang.String)
     */
    @Override
    public Object queryProduce(String code) {
        XN610311Req req = new XN610311Req();
        req.setCode(code);
        return BizConnecter.getBizData("610311", JsonUtils.object2Json(req),
            Object.class);
    }

    /** 
     * @see com.xnjr.moom.front.ao.ICommodityAO#buyProduct(java.lang.String, java.lang.String, java.lang.String)
     */
    @Override
    public Object buyProduct(String userId, String productCode, String quantity) {
        XN610320Req req = new XN610320Req();
        req.setUserId(userId);
        req.setProductCode(productCode);
        req.setQuantity(quantity);
        return BizConnecter.getBizData("610320", JsonUtils.object2Json(req),
            Object.class);
    }
}
