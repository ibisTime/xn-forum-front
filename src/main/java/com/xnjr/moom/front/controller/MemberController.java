package com.xnjr.moom.front.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.ao.IAccountAO;
import com.xnjr.moom.front.ao.IBankCardAO;
import com.xnjr.moom.front.ao.ISmsAO;
import com.xnjr.moom.front.ao.IUserAO;
import com.xnjr.moom.front.base.ControllerContext;
import com.xnjr.moom.front.captcha.MyCaptchaService;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.localToken.TokenDO;
import com.xnjr.moom.front.localToken.UserDAO;
import com.xnjr.moom.front.res.XN805043Res;
import com.xnjr.moom.front.session.ISessionProvider;
import com.xnjr.moom.front.session.SessionUser;

@Controller
@RequestMapping(value = "/user")
public class MemberController extends BaseController {
    @Autowired
    IUserAO userAO;

    @Autowired
    UserDAO userDAO;

    @Autowired
    IAccountAO accountAO;

    @Autowired
    IBankCardAO bankCardAO;

    @Autowired
    ISmsAO smsAO;

    @Resource(name = "imageCaptchaService")
    private MyCaptchaService imageCaptchaService;

    // 检查用户名已存在
    @RequestMapping(value = "/mobile/check", method = RequestMethod.POST)
    @ResponseBody
    public Object checkMobileExist(@RequestParam("loginName") String mobile) {
        return userAO.checkMobileExit(mobile);
    }

    // 用户注册
    @RequestMapping(value = "/regist", method = RequestMethod.POST)
    @ResponseBody
    public Object doRegister(
            @RequestParam("loginName") String mobile,
            @RequestParam("captcha") String captcha,
            @RequestParam(value = "userReferee", required = false) String userReferee) {
        String sessionId = ControllerContext.getRequest().getSession().getId();
        boolean flag = imageCaptchaService.validateResponseForID(sessionId,
            captcha);
        imageCaptchaService.removeCaptcha(sessionId);
        if (!flag) { // 验证码正确
            throw new BizException("83099901", "图片验证码不正确");
        }
        return userAO.doRegister(mobile, userReferee);
    }

    // 用户注册（密码短信方式）
    @RequestMapping(value = "/reg", method = RequestMethod.POST)
    @ResponseBody
    public Object doReg(
            @RequestParam("mobile") String mobile,
            @RequestParam("loginPwd") String loginPwd,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam(value = "userReferee", required = false) String userReferee,
            @RequestParam(value = "companyCode", required = false) String companyCode) {
        return userAO.doReg(mobile, loginPwd, smsCaptcha,
        		userReferee, companyCode);
    }

    // 用户登录
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ResponseBody
    public Object doLogin(@RequestParam("loginName") String loginName,
            @RequestParam("loginPwd") String loginPwd,
            @RequestParam("terminalType") String terminalType,
            @RequestParam(value = "kind", required = false) String kind) {
        XN805043Res res = userAO.doLogin(loginName, loginPwd, kind);
        SessionUser sessionUser = new SessionUser();
        sessionUser.setUserId(res.getUserId());
        // 创建session
        setSessionUser(sessionUser);
        String userId = res.getUserId();
        TokenDO tokenDO = new TokenDO();
        tokenDO.setUserId(userId);
        tokenDO.setTokenId(pwdUserId(userId));
        tokenDO.setIsExist("0");
        return tokenDO;
    }

    // 用户tokenId登录
    @RequestMapping(value = "/login-t", method = RequestMethod.POST)
    @ResponseBody
    public Object doLoginT(@RequestParam("tokenId") String tokenId) {
        Map map = null;
        try {
            map = userAO.doGetUser(unPwdUserId(tokenId));
        } catch (Exception e) {
            e.printStackTrace();
        }
        if (map == null) {
            throw new BizException("10001", "用户不存在");
        }
        
        if (!map.get("status").equals("0")) {
        	throw new BizException("10002", "用户被锁定");
        }

        // XN805043Res res = userAO.doLogin((String)(map.get("loginName")),
        // (MD5Util.KL((String)map.get("loginPwd"))), "f1");
        String userId = (String) (map.get("userId"));
        SessionUser sessionUser = new SessionUser();
        sessionUser.setUserId(userId);
        // 创建session
        setSessionUser(sessionUser);

        TokenDO tokenDO = new TokenDO();
        tokenDO.setUserId(userId);
        tokenDO.setTokenId(pwdUserId(userId));
        tokenDO.setIsExist("1");
        return tokenDO;
    }

    // 获取用户信息
    @RequestMapping(value = "/info", method = RequestMethod.GET)
    @ResponseBody
    public Map doGetUser(
            @RequestParam(value = "userId", required = false) String userId) {
        return userAO.doGetUser(getSessionUserId(userId));
    }

    // 修改用户信息
    @RequestMapping(value = "/profile", method = RequestMethod.POST)
    @ResponseBody
    public Object setProfile(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam("gender") String gender,
            @RequestParam("birthday") String birthday,
            @RequestParam("email") String email,
            @RequestParam(value = "introduce", required = false) String introduce) {
        return userAO.setProfile(getSessionUserId(userId), gender, birthday,
        		email, introduce);
    }

    // 修改昵称
    @RequestMapping(value = "/nickname", method = RequestMethod.POST)
    @ResponseBody
    public Object setNickName(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "nickname") String nickname) {
        return userAO.setNickName(getSessionUserId(userId), nickname);
    }
    
    // 修改用户名
    @RequestMapping(value = "/username", method = RequestMethod.POST)
    @ResponseBody
    public Object setUserName(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "loginName") String loginName) {
        return userAO.setUserName(getSessionUserId(userId), loginName);
    }

    // 头像修改
    @RequestMapping(value = "/avatar", method = RequestMethod.POST)
    @ResponseBody
    public Object setAvatar(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "photo") String photo) {
        return userAO.setAvatar(getSessionUserId(userId), photo);
    }

    // 上传图片
    @RequestMapping(value = "/upload/img", method = RequestMethod.POST)
    @ResponseBody
    public Object uploadImg(@RequestParam(value = "photo") String photo) {
        return userAO.uploadImg(photo);
    }

    // 签到
    @RequestMapping(value = "/signIn", method = RequestMethod.POST)
    @ResponseBody
    public Object signIn(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "location") String location) {
        return userAO.signIn(getSessionUserId(userId), location);
    }

    // 分页查询签到记录
    @RequestMapping(value = "/signIn/page", method = RequestMethod.POST)
    @ResponseBody
    public Object signInPage(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "dateStart") String dateStart,
            @RequestParam(value = "dateEnd") String dateEnd,
            @RequestParam(value = "start") String start,
            @RequestParam(value = "limit") String limit) {
        return userAO.signInPage(getSessionUserId(userId), dateStart, dateEnd,
            start, limit);
    }

    // 分页查询签到记录
    @RequestMapping(value = "/signIn/list", method = RequestMethod.POST)
    @ResponseBody
    public Object signInList(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "dateStart") String dateStart,
            @RequestParam(value = "dateEnd") String dateEnd) {
        return userAO.signInList(getSessionUserId(userId), dateStart, dateEnd);
    }

    // 新增用户地址（收货）
    @RequestMapping(value = "/add/address", method = RequestMethod.POST)
    @ResponseBody
    public Object addAddress(@RequestParam("addressee") String addressee,
            @RequestParam("mobile") String mobile,
            @RequestParam("province") String province,
            @RequestParam("city") String city,
            @RequestParam("district") String district,
            @RequestParam("detailAddress") String detailAddress,
            @RequestParam("isDefault") String isDefault,
            @RequestParam(value = "userId", required = false) String userId) {
        return userAO.addAddress(getSessionUserId(userId), addressee, mobile,
            province, city, district, detailAddress, isDefault);
    }

    // 删除用户地址（收货）
    @RequestMapping(value = "/delete/address", method = RequestMethod.POST)
    @ResponseBody
    public Object deleteAddress(@RequestParam(value = "code") String code) {
        return userAO.deleteAddress(code);
    }

    // 修改用户地址（收货）
    @RequestMapping(value = "/edit/address", method = RequestMethod.POST)
    @ResponseBody
    public Object editAddress(@RequestParam("code") String code,
            @RequestParam("addressee") String addressee,
            @RequestParam("mobile") String mobile,
            @RequestParam("province") String province,
            @RequestParam("city") String city,
            @RequestParam("district") String district,
            @RequestParam("detailAddress") String detailAddress,
            @RequestParam("isDefault") String isDefault,
            @RequestParam(value = "userId", required = false) String userId) {
        return userAO.editAddress(code, getSessionUserId(userId), addressee,
            mobile, province, city, district, detailAddress, isDefault);
    }

    // 设置用户默认地址（收货）
    @RequestMapping(value = "/edit/setDefaultAddress", method = RequestMethod.POST)
    @ResponseBody
    public Object setDefaultAddress(@RequestParam("code") String code,
            @RequestParam(value = "userId", required = false) String userId) {
        return userAO.setDefaultAddress(code, getSessionUserId(userId));
    }

    @RequestMapping(value = "/queryAddresses", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAddresses(
            @RequestParam(value = "code", required = false) String code,
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "isDefault", required = false) String isDefault) {
        return userAO.queryAddresses(code, getSessionUserId(userId), isDefault);
    }

    // 查询地址（收货）
    @RequestMapping(value = "/queryAddress", method = RequestMethod.GET)
    @ResponseBody
    public Object queryAddress(@RequestParam("code") String code) {
        return userAO.queryAddress(code);
    }

    // 用户退出
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    @ResponseBody
    public boolean logout() {
        sessionProvider.removeAttribute(ISessionProvider.SESSION_KEY_USER);
        return true;
    }

    // 新增用户银行卡
    @RequestMapping(value = "/bankcard/bind", method = RequestMethod.POST)
    @ResponseBody
    public boolean doBindBankCard(
            @RequestParam("bankCode") String bankCode,
            @RequestParam("bankcardNo") String bankcardNo,
            @RequestParam(value = "subbranch", required = false) String subbranch,
            @RequestParam(value = "userId", required = false) String userId) {
        // 验证是否实名
        String uId = getSessionUserId(userId);
        boolean flag = userAO.doIdentityCheck(uId);
        // 三方验证和保存用户卡 未完待续
        bankCardAO.doBindBankCard(uId, bankCode, bankcardNo, subbranch);
        flag = true;
        return flag;
    }

    // 列表查看用户银行卡
    @RequestMapping(value = "/bankcard/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryBankCardList(
            @RequestParam(value = "userId", required = false) String userId) {
        return bankCardAO.queryBankCardList(getSessionUserId(userId));
    }

    // 分页查看用户银行卡
    @RequestMapping(value = "/bankcard/page", method = RequestMethod.GET)
    @ResponseBody
    public Object queryBankCardPage(
            @RequestParam(value = "userId", required = false) String userId,
            @RequestParam(value = "start", required = false) String start,
            @RequestParam(value = "limit", required = false) String limit,
            @RequestParam(value = "orderColumn", required = false) String orderColumn,
            @RequestParam(value = "orderDir", required = false) String orderDir) {
        return bankCardAO.queryBankCardPage(getSessionUserId(userId), start,
            limit, orderColumn, orderDir);
    }

    // 查看用户银行卡详情
    @RequestMapping(value = "/bankcard/detail", method = RequestMethod.GET)
    @ResponseBody
    public Object queryBankCard(@RequestParam(value = "id") String id) {
        return bankCardAO.doViewBankCard(id);
    }

    // 删除银行卡
    @RequestMapping(value = "/bankcard/drop", method = RequestMethod.POST)
    @ResponseBody
    public Object dropBankCard(
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "userId", required = false) String userId) {
        return bankCardAO.doDropBankCard(id, getSessionUserId(userId));
    }

    // 修改银行卡
    @RequestMapping(value = "/bankcard/edit", method = RequestMethod.POST)
    @ResponseBody
    public Object editBankCard(
            @RequestParam(value = "id", required = false) String id,
            @RequestParam(value = "bankCode", required = false) String bankCode,
            @RequestParam(value = "subbranch", required = false) String subbranch,
            @RequestParam(value = "bankCardNo", required = false) String bankCardNo,
            @RequestParam(value = "userId", required = false) String userId) {
        return bankCardAO.doEditBankCard(id, getSessionUserId(userId),
            bankCode, bankCardNo, subbranch);
    }

    // 登录密码重置
    @RequestMapping(value = "/loginpwd/reset", method = RequestMethod.POST)
    @ResponseBody
    public boolean doResetLoginPwd(@RequestParam("oldLoginPwd") String oldPwd,
            @RequestParam("newLoginPwd") String newPwd,
            @RequestParam(value = "userId", required = false) String userId) {
        userAO.doResetLoginPwd(getSessionUserId(userId), oldPwd, newPwd);
        // 重新登陆
        return logout();
    }

    // 找回登录密码
    @RequestMapping(value = "/loginpwd/find", method = RequestMethod.POST)
    @ResponseBody
    public boolean doFindLoginPwd(@RequestParam("mobile") String mobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam("newLoginPwd") String newLoginPwd) {
        userAO.doFindLoginPwd(mobile, newLoginPwd, smsCaptcha);
        return true;
    }

    // // ****交易密码start****
    // @RequestMapping(value = "/tradepwd/set", method = RequestMethod.POST)
    // @ResponseBody
    // public boolean doSetTradePwd(@RequestParam("tradePwd") String tradePwd,
    // @RequestParam("smsCaptcha") String smsCaptcha,
    // @RequestParam(value = "userId", required = false) String userId) {
    // userAO.doSetTradePwd(getSessionUserId(userId), tradePwd, smsCaptcha);
    // return true;
    // }
    //
    // @RequestMapping(value = "/tradepwd/reset", method = RequestMethod.POST)
    // @ResponseBody
    // public boolean doResetTradePwd(
    // @RequestParam("oldTradePwd") String oldTradePwd,
    // @RequestParam("newTradePwd") String newTradePwd,
    // @RequestParam(value = "userId", required = false) String userId) {
    // userAO.doResetTradePwd(getSessionUserId(userId), oldTradePwd,
    // newTradePwd);
    // return true;
    // }
    //
    // @RequestMapping(value = "/tradepwd/find", method = RequestMethod.POST)
    // @ResponseBody
    // public boolean doFindTradePwd(
    // @RequestParam("newTradePwd") String newTradePwd,
    // @RequestParam("smsCaptcha") String smsCaptcha,
    // @RequestParam(value = "userId", required = false) String userId) {
    // userAO
    // .doFindTradePwd(getSessionUserId(userId), newTradePwd, smsCaptcha);
    // return true;
    // }

    // ****交易密码end****

    // 修改手机号
    @RequestMapping(value = "/mobile/change", method = RequestMethod.POST)
    @ResponseBody
    public boolean doChangeMobile(
            @RequestParam("newMobile") String newMobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam(value = "tradePwd", required = false) String tradePwd,
            @RequestParam(value = "userId", required = false) String userId) {

        userAO.doChangeMoblie(getSessionUserId(userId), newMobile, smsCaptcha,
            tradePwd);
        return true;
    }
    
    // 绑定手机号
    @RequestMapping(value = "/mobile/bind", method = RequestMethod.POST)
    @ResponseBody
    public Object doBindMobile(
            @RequestParam("mobile") String mobile,
            @RequestParam("smsCaptcha") String smsCaptcha,
            @RequestParam(value = "userId", required = false) String userId) {

        return userAO.doBindMoblie(getSessionUserId(userId), mobile, smsCaptcha);
        
    }

    // 详情查询用户关注、粉丝、账户、发帖数
    @RequestMapping(value = "/stats", method = RequestMethod.GET)
    @ResponseBody
    public Object userSTAT() {
        return userAO.userSTAT(getSessionUserId(null));
    }

    // 根据昵称和手机号查询用户列表
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public Object queryUserList(
            @RequestParam(value = "nickname", required = false) String nickname,
            @RequestParam(value = "mobile", required = false) String mobile) {
        return userAO.queryUserList(nickname, mobile);
    }
}
