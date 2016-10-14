/**
 * @Title IPostAO.java 
 * @Package com.std.forum.ao 
 * @Description 
 * @author xieyj  
 * @date 2016年8月29日 下午7:46:59 
 * @version V1.0   
 */
package com.xnjr.moom.front.ao;

/** 
 * @author: xieyj 
 * @since: 2016年8月29日 下午7:46:59 
 * @history:
 */
public interface IPostAO {
    /**
     * 发布帖子
     * @param title
     * @param content
     * @param pic
     * @param plateCode
     * @param publisher
     * @return 
     * @create: 2016年9月27日 下午3:53:36 xieyj
     * @history:
     */
    public Object publishPost(String title, String content, String pic,
            String plateCode, String publisher);

    /**
     * 分页查询帖子
     * @param title
     * @param keyword
     * @param status
     * @param isHeadlines
     * @param location
     * @param plateCode
     * @param siteCode
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @param userId
     * @return 
     * @create: 2016年10月13日 下午5:46:33 xieyj
     * @history:
     */
    public Object queryPagePost(String title, String keyword, String status,
            String isHeadlines, String location, String plateCode,
            String siteCode, String start, String limit, String orderColumn,
            String orderDir, String userId);

    /**
     * 获取帖子详情
     * @param postCode
     * @param userId
     * @return 
     * @create: 2016年9月27日 下午3:54:58 xieyj
     * @history:
     */
    public Object getPost(String postCode, String userId);

    /**
     * 点赞
     * @param type
     * @param postCode
     * @param talker
     * @return 
     * @create: 2016年9月27日 下午9:19:32 wulq
     * @history:
     */
    public Object praise(String type, String postCode, String talker);

    /**
     * 评论
     * @param content
     * @param parentCode
     * @param commer
     * @return 
     * @create: 2016年9月28日 上午11:40:31 wulq
     * @history:
     */
    public Object comment(String content, String parentCode, String commer);

    /**
     * 将自己已发布的帖子删除
     * @param code
     * @param userId
     * @return
     */
    public Object deletePost(String code, String userId);

    /**
     * 我收藏的帖子分页查询
     * @param talker
     * @param start
     * @param limit
     * @param orderColumn
     * @param orderDir
     * @return
     */
    public Object queryPageCollections(String talker, String start,
            String limit, String orderColumn, String orderDir);

    public Object postCraftAdd(String title, String content, String pic,
            String plateCode, String userId);

    public Object postCraftEdit(String code, String title, String content,
            String pic, String plateCode, String userId);

    public Object postCraftPublish(String code, String title, String content,
            String pic, String plateCode, String userId);

    public Object queryMyPostPage(String userId, String status,
            String dateStart, String dateEnd, String start, String limit,
            String orderColumn, String orderDir);
    
    public Object queryMyCommentToPage(String userId, String start, String limit);
    
    public Object queryMyCommentFromPage(String userId, String start, String limit);
    
    public Object queryPostDetailComment(String userId, String commentCode);
}
