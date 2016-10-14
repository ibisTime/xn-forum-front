package com.xnjr.moom.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.ICommodityAO;

@Controller
@RequestMapping(value = "/commodity")
public class CommodityController extends BaseController {
    @Autowired
    ICommodityAO commodityAO;

    // 分页查询产品
    @RequestMapping(value = "/queryProducePage", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProducePage(
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "siteCode", required = false) String siteCode,
            @RequestParam("start") String start,
            @RequestParam("limit") String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return commodityAO.queryProducePage(name, kind, status, siteCode,
            start, limit, orderColumn, orderDir);
    }

    // 详情查询产品
    @RequestMapping(value = "/queryProduce", method = RequestMethod.GET)
    @ResponseBody
    public Object queryProduce(
            @RequestParam(value = "code", required = false) String code) {
        return commodityAO.queryProduce(code);
    }

    // 购买商品
    @RequestMapping(value = "/buyProduct", method = RequestMethod.POST)
    @ResponseBody
    public Object buyProduct(
            @RequestParam(value = "productCode", required = true) String productCode,
            @RequestParam(value = "quantity", required = true) String quantity) {
        return commodityAO.buyProduct(this.getSessionUserId(null), productCode,
            quantity);
    }
}
