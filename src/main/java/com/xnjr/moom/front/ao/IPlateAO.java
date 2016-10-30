/**
 * @Title IPlateAO.java 
 * @Package com.xnjr.moom.front.ao 
 * @Description 
 * @author xieyj  
 * @date 2016年9月27日 下午5:09:10 
 * @version V1.0   
 */
package com.xnjr.moom.front.ao;

/** 
 * @author: xieyj 
 * @since: 2016年9月27日 下午5:09:10 
 * @history:
 */
public interface IPlateAO {

    /**
     * 根据站点,种类列表查询板块
     * @param kind
     * @param userId
     * @param siteCode
     * @return 
     * @create: 2016年10月30日 下午2:32:09 xieyj
     * @history:
     */
    public Object queryPlateList(String kind, String userId, String siteCode);

    /**
     * 详情查询板块
     * @param code
     * @return
     */
    public Object queryPlateInfo(String code);
}
