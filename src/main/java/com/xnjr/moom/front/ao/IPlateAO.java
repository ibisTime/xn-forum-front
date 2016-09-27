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
     * 根据站点列表查询板块
     * @param siteCode
     * @return 
     * @create: 2016年9月27日 下午5:12:16 xieyj
     * @history:
     */
    public Object queryPlateList(String siteCode);

}
