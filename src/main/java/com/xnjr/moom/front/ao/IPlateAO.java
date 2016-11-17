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
    
    /**
     * 列表查询密码记录(环信配置)
     * @param type
     * @param account
     * @param companyCode
     * @return
     */
    public Object queryPasswordList(String type, String account, String companyCode);
    
    /**
     * 列表查询类别
     * @param parentCode
     * @param type
     * @param name
     * @param companyCode
     * @return
     */
    public Object queryCategoryList(String parentCode, String type, String name, String companyCode);
    
    public Object queryCategoryInfo(String code);
}
