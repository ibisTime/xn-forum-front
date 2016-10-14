package com.xnjr.moom.front.ao;

public interface ICommodityAO {

    /**
     * 分页查询产品
     * @param name
     * @param kind
     * @param status
     * @param siteCode
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return 
     * @create: 2016年10月14日 上午11:22:58 xieyj
     * @history:
     */
    public Object queryProducePage(String name, String kind, String status,
            String siteCode, String start, String limit, String orderColumn,
            String orderDir);

    /**
     * 详情查询产品
     * @param code
     * @return
     */
    public Object queryProduce(String code);

    /**
     * @param code
     * @return 
     * @create: 2016年10月14日 上午11:10:59 xieyj
     * @history:
     */
    public Object buyProduct(String userId, String productCode, String quantity);
    
    public Object orderPage(String userId, String start, String limit);
    
    public Object orderDetail(String orderCode);
}
