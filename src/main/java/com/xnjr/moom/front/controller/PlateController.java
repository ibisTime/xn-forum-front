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
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "siteCode", required = true) String siteCode) {
        return plateAO.queryPlateList(kind, userId, siteCode);
    }
    
    // 板块分页列表
    @RequestMapping(value = "/list1", method = RequestMethod.GET) 
    @ResponseBody
    public Object queryPlateList(
            @RequestParam(value = "kind", required = false) String kind,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "siteCode", required = true) String siteCode) {
        return plateAO.queryPlateList(kind, getSessionUserId(userId), siteCode);
    }
}
