/**
 * @Title PlateController.java 
 * @Package com.xnjr.moom.front.controller 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午5:17:33 
 * @version V1.0   
 */
package com.xnjr.moom.front.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.IPlateAO;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午5:17:33 
 * @history:
 */
@Controller
@RequestMapping(value = "/plate")
public class PlateController extends BaseController {

    @Autowired
    IPlateAO plateAO;

    // -----------------板块列表----------------
    // 板块的分页列表
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPlatePage(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "siteCode", required = false) String siteCode,
            @RequestParam(value = "userId", required = false) String userId) {
        return plateAO.queryPlateList(kind, userId, siteCode);
    }

    // 板块分页列表
    @RequestMapping(value = "/list1", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPlateList(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "siteCode", required = false) String siteCode,
            @RequestParam(value = "userId", required = false) String userId) {
        return plateAO.queryPlateList(kind, getSessionUserId(userId), siteCode);
    }

    // 详情查询板块
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPlateInfo(
            @RequestParam(value = "code", required = true) String code) {
        return plateAO.queryPlateInfo(code);
    }
    
    //列表查询密码记录(环信配置)
    @RequestMapping(value = "/pwd/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryPasswordList(
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "account", required = false) String account,
            @RequestParam(value = "companyCode", required = false) String companyCode) {
        return plateAO.queryPasswordList(type, account, companyCode);
    }
    
    //列表查询类别
    @RequestMapping(value = "/category/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCategoryList(
            @RequestParam(value = "parentCode", required = false) String parentCode,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "name", required = false) String name,
            @RequestParam(value = "companyCode", required = false) String companyCode) {
        return plateAO.queryCategoryList(parentCode, type, name, companyCode);
    }
    //详情查询类别
    @RequestMapping(value = "/category/info", method = RequestMethod.GET)
    @ResponseBody
    public Object queryCategoryInfo(
            @RequestParam(value = "code", required = false) String code) {
        return plateAO.queryCategoryInfo(code);
    }
}
