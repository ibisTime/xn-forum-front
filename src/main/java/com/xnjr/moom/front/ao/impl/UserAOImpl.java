package com.xnjr.moom.front.ao.impl;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.xnjr.moom.front.ao.IUserAO;
import com.xnjr.moom.front.enums.EUserKind;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN602601Req;
import com.xnjr.moom.front.req.XN602800Req;
import com.xnjr.moom.front.req.XN602801Req;
import com.xnjr.moom.front.req.XN602802Req;
import com.xnjr.moom.front.req.XN602803Req;
import com.xnjr.moom.front.req.XN602804Req;
import com.xnjr.moom.front.req.XN602805Req;
import com.xnjr.moom.front.req.XN805040Req;
import com.xnjr.moom.front.req.XN805043Req;
import com.xnjr.moom.front.req.XN805045Req;
import com.xnjr.moom.front.req.XN805047Req;
import com.xnjr.moom.front.req.XN805048Req;
import com.xnjr.moom.front.req.XN805049Req;
import com.xnjr.moom.front.req.XN805051Req;
import com.xnjr.moom.front.req.XN805055Req;
import com.xnjr.moom.front.req.XN805057Req;
import com.xnjr.moom.front.req.XN805073Req;
import com.xnjr.moom.front.req.XN805074Req;
import com.xnjr.moom.front.req.XN805075Req;
import com.xnjr.moom.front.req.XN805076Req;
import com.xnjr.moom.front.req.XN805100Req;
import com.xnjr.moom.front.req.XN805101Req;
import com.xnjr.moom.front.req.XN805102Req;
import com.xnjr.moom.front.req.XN805150Req;
import com.xnjr.moom.front.req.XN805153Req;
import com.xnjr.moom.front.req.XNfd0003Req;
import com.xnjr.moom.front.req.XNfd0004Req;
import com.xnjr.moom.front.res.XN602601Res;
import com.xnjr.moom.front.res.XN801215Res;
import com.xnjr.moom.front.res.XN805043Res;
import com.xnjr.moom.front.res.XNfd0003Res;
import com.xnjr.moom.front.util.PwdUtil;
import com.xnjr.moom.front.util.UploadUtil;

/**
 * @author: miyb
 * @since: 2015-5-12 下午2:53:12
 * @history:
 */
@Service
public class UserAOImpl implements IUserAO {

	@Override
	public XN602601Res doRegister(String mobile, String userReferee) {
		if (StringUtils.isBlank(mobile)) {
			throw new BizException("A010001", "手机号码不能为空");
		}
		if (StringUtils.isBlank(userReferee)) {
			throw new BizException("A010001", "推荐人不能为空");
		}
		XN602601Req req = new XN602601Req();
		req.setMobile(mobile);
		req.setUserReferee(userReferee);
		return BizConnecter.getBizData("602601", JsonUtils.object2Json(req),
				XN602601Res.class);
	}

	@Override
	public void doIdentify(String userId, String realName, String idKind,
			String idNo) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(realName)) {
			throw new BizException("A010001", "真实姓名不能为空");
		}
		if (StringUtils.isBlank(idKind)) {
			throw new BizException("A010001", "证件类型不能为空");
		}
		if (StringUtils.isBlank(idNo)) {
			throw new BizException("A010001", "证件号不能为空");
		}
		XNfd0004Req req = new XNfd0004Req();
		req.setUserId(userId);
		req.setRealName(realName);
		req.setIdKind(idKind);
		req.setIdNo(idNo);
		BizConnecter.getBizData("fd0004", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public void doSetTradePwd(String userId, String tradePwd, String smsCaptcha) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(tradePwd)) {
			throw new BizException("A010001", "交易密码不能为空");
		}
		if (StringUtils.isBlank(smsCaptcha)) {
			throw new BizException("A010001", "验证码不能为空");
		}
		XN805045Req req = new XN805045Req();
		req.setUserId(userId);
		req.setTradePwd(tradePwd);
		req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(tradePwd));
		req.setSmsCaptcha(smsCaptcha);
		BizConnecter.getBizData("805045", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public XN805043Res doLogin(String loginName, String loginPwd, String kind) {
		if (StringUtils.isBlank(loginName)) {
			throw new BizException("A010001", "登录名不能为空");
		}
		if (StringUtils.isBlank(loginPwd)) {
			throw new BizException("A010001", "登录密码不能为空");
		}

		XN805043Req req = new XN805043Req();
		req.setLoginName(loginName);
		req.setLoginPwd(loginPwd);
		req.setKind("f1");

		return BizConnecter.getBizData("805043", JsonUtils.object2Json(req),
				XN805043Res.class);
	}

	@Override
	// Object
	public Map doGetUser(String userId) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		return BizConnecter.getBizData("805056",
				JsonUtils.string2Json("userId", userId), Map.class);
	}

	@Override
	public void doFindLoginPwd(String mobile, String newLoginPwd,
			String smsCaptcha) {
		if (StringUtils.isBlank(mobile)) {
			throw new BizException("A010001", "手机号不能为空");
		}
		if (StringUtils.isBlank(smsCaptcha)) {
			throw new BizException("A010001", "手机验证码不能为空");
		}
		if (StringUtils.isBlank(newLoginPwd)) {
			throw new BizException("A010001", "新登录密码不能为空");
		}
		XN805048Req req = new XN805048Req();
		req.setMobile(mobile);
		req.setSmsCaptcha(smsCaptcha);
		req.setNewLoginPwd(newLoginPwd);
		req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
		BizConnecter.getBizData("805048", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public void doResetLoginPwd(String userId, String oldLoginPwd,
			String newLoginPwd) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(oldLoginPwd)) {
			throw new BizException("A010001", "原登录密码不能为空");
		}
		if (StringUtils.isBlank(newLoginPwd)) {
			throw new BizException("A010001", "新登录密码不能为空");
		}
		XN805049Req req = new XN805049Req();
		req.setUserId(userId);
		req.setOldLoginPwd(oldLoginPwd);
		req.setNewLoginPwd(newLoginPwd);
		req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(newLoginPwd));
		BizConnecter.getBizData("805049", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public void doFindTradePwd(String userId, String newTradePwd,
			String smsCaptcha) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(smsCaptcha)) {
			throw new BizException("A010001", "短信验证码不能为空");
		}
		if (StringUtils.isBlank(newTradePwd)) {
			throw new BizException("A010001", "新交易密码不能为空");
		}
		XN805057Req req = new XN805057Req();
		req.setUserId(userId);
		req.setNewTradePwd(newTradePwd);
		req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(newTradePwd));
		req.setSmsCaptcha(smsCaptcha);
		BizConnecter.getBizData("805057", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public void doResetTradePwd(String userId, String oldTradePwd,
			String newTradePwd) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(oldTradePwd)) {
			throw new BizException("A010001", "原交易密码不能为空");
		}
		if (StringUtils.isBlank(newTradePwd)) {
			throw new BizException("A010001", "新交易密码不能为空");
		}
		XN805051Req req = new XN805051Req();
		req.setUserId(userId);
		req.setOldTradePwd(oldTradePwd);
		req.setNewTradePwd(newTradePwd);
		req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(newTradePwd));
		BizConnecter.getBizData("805051", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public void doChangeMoblie(String userId, String newMobile,
			String smsCaptcha, String tradePwd) {
		XN805047Req req = new XN805047Req();
		req.setUserId(userId);
		req.setNewMobile(newMobile);
		req.setSmsCaptcha(smsCaptcha);
		tradePwd = "888888";
		req.setTradePwd(tradePwd);
		BizConnecter.getBizData("805047", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public boolean doIdentityCheck(String userId) {
		boolean flag = false;
		return flag;
	}

	@Override
	public Object doGetLog(String userId) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		return BizConnecter.getBizData("fd0010",
				JsonUtils.string2Json("userId", userId), Object.class);
	}

	@Override
	// 检查手机号是否存在
	public Object checkMobileExit(String mobile) {
		if (StringUtils.isBlank(mobile)) {
			throw new BizException("A010001", "手机号不能为空");
		}
		XN805040Req req = new XN805040Req();
		req.setMobile(mobile);
		return BizConnecter.getBizData("805040", JsonUtils.object2Json(req),
				XN801215Res.class);
	}

	@Override
	public void doIdentifySetTradePwd(String userId, String realName,
			String idKind, String idNO, String tradePwd, String tradeCaptcha) {
		XNfd0003Req req = new XNfd0003Req();
		req.setUserId(userId);
		req.setIdKind(idKind);
		req.setIdNo(idNO);
		req.setRealName(realName);
		req.setSmsCaptcha(tradeCaptcha);
		req.setTradePwd(tradePwd);
		req.setTradePwdStrength(PwdUtil.calculateSecurityLevel(tradePwd));
		BizConnecter.getBizData("fd0003", JsonUtils.object2Json(req),
				XNfd0003Res.class);
	}

	/**
	 * @see com.xnjr.moom.front.ao.ICompanyAO#doKyc(java.lang.String)
	 */
	@Override
	public Object doKyc(String userId) {
		return BizConnecter.getBizData("fd2900",
				JsonUtils.string2Json("userId", userId), Object.class);
	}

	public Object addAddress(String userId, String addressee, String mobile,
			String province, String city, String district,
			String detailAddress, String isDefault) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(addressee)) {
			throw new BizException("A010001", "收件人不能为空");
		}
		if (StringUtils.isBlank(mobile)) {
			throw new BizException("A010001", "手机号不能为空");
		}
		if (StringUtils.isBlank(province)) {
			throw new BizException("A010001", "省份不能为空");
		}
		if (StringUtils.isBlank(city)) {
			throw new BizException("A010001", "城市不能为空");
		}
		if (StringUtils.isBlank(district)) {
			throw new BizException("A010001", "区县不能为空");
		}
		if (StringUtils.isBlank(detailAddress)) {
			throw new BizException("A010001", "详细地址不能为空");
		}
		if (StringUtils.isBlank(isDefault)) {
			throw new BizException("A010001", "是否默认不能为空");
		}
		XN602800Req req = new XN602800Req();
		req.setAddressee(addressee);
		req.setCity(city);
		req.setDetailAddress(detailAddress);
		req.setDistrict(district);
		req.setIsDefault(isDefault);
		req.setMobile(mobile);
		req.setProvince(province);
		req.setUserId(userId);
		return BizConnecter.getBizData("602800", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object deleteAddress(String code) {
		XN602801Req req = new XN602801Req();
		req.setCode(code);
		if (StringUtils.isBlank(code)) {
			throw new BizException("A010001", "收件编号不能为空");
		}
		return BizConnecter.getBizData("602801", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object editAddress(String code, String userId, String addressee,
			String mobile, String province, String city, String district,
			String detailAddress, String isDefault) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(addressee)) {
			throw new BizException("A010001", "收件人不能为空");
		}
		if (StringUtils.isBlank(mobile)) {
			throw new BizException("A010001", "手机号不能为空");
		}
		if (StringUtils.isBlank(province)) {
			throw new BizException("A010001", "省份不能为空");
		}
		if (StringUtils.isBlank(city)) {
			throw new BizException("A010001", "城市不能为空");
		}
		if (StringUtils.isBlank(district)) {
			throw new BizException("A010001", "区县不能为空");
		}
		if (StringUtils.isBlank(detailAddress)) {
			throw new BizException("A010001", "详细地址不能为空");
		}
		if (StringUtils.isBlank(isDefault)) {
			throw new BizException("A010001", "是否默认不能为空");
		}
		if (StringUtils.isBlank(code)) {
			throw new BizException("A010001", "收件编号不能为空");
		}
		XN602802Req req = new XN602802Req();
		req.setCode(code);
		req.setAddressee(addressee);
		req.setCity(city);
		req.setDetailAddress(detailAddress);
		req.setDistrict(district);
		req.setIsDefault(isDefault);
		req.setMobile(mobile);
		req.setProvince(province);
		req.setUserId(userId);
		return BizConnecter.getBizData("602802", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object setDefaultAddress(String code, String userId) {
		XN602803Req req = new XN602803Req();
		if (StringUtils.isBlank(code)) {
			throw new BizException("A010001", "收件编号不能为空");
		}
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		req.setCode(code);
		req.setUserId(userId);
		return BizConnecter.getBizData("602803", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object queryAddresses(String code, String userId, String isDefault) {
		XN602804Req req = new XN602804Req();
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		req.setCode(code);
		req.setUserId(userId);
		req.setIsDefault(isDefault);
		return BizConnecter.getBizData("602804", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object queryAddress(String code) {
		XN602805Req req = new XN602805Req();
		if (StringUtils.isBlank(code)) {
			throw new BizException("A010001", "收件编号不能为空");
		}
		req.setCode(code);
		return BizConnecter.getBizData("602805", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object getHpsList() {
		XN805055Req req = new XN805055Req();
		req.setStatus("0");
		req.setKind("05");
		return BizConnecter.getBizData("805055", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object doReg(String mobile, String loginPwd, String smsCaptcha,
			String userReferee, String companyCode) {
		XN805076Req req = new XN805076Req();
		req.setMobile(mobile);
		req.setLoginPwd(loginPwd);
		req.setLoginPwdStrength(PwdUtil.calculateSecurityLevel(loginPwd));
		req.setSmsCaptcha(smsCaptcha);
		req.setUserReferee(userReferee);
		req.setCompanyCode(companyCode);
		req.setIsRegHx("1");
		return BizConnecter.getBizData("805076", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object setAvatar(String userId, String photo) {
		XN805073Req req = new XN805073Req();
		req.setUserId(userId);
		req.setPhoto(UploadUtil.uploadPicture(photo));
		return BizConnecter.getBizData("805073", JsonUtils.object2Json(req),
				Object.class);
	}

	public Object uploadImg(String photo) {
		return UploadUtil.uploadPicture(photo);
	}

	@Override
	public Object setProfile(String userId, String gender, String birthday,
			String email, String introduce) {
		XN805074Req req = new XN805074Req();
		req.setUserId(userId);
		req.setGender(gender);
		req.setBirthday(birthday);
		req.setEmail(email);
		req.setIntroduce(introduce);
		return BizConnecter.getBizData("805074", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object setNickName(String userId, String nickname) {
		XN805075Req req = new XN805075Req();
		req.setUserId(userId);
		req.setNickname(nickname);
		return BizConnecter.getBizData("805075", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object setUserName(String userId, String loginName) {
		XN805150Req req = new XN805150Req();
		req.setLoginName(loginName);
		req.setUserId(userId);
		return BizConnecter.getBizData("805150", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object signIn(String userId, String location) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(location)) {
			throw new BizException("A010001", "地区不能为空");
		}
		XN805100Req req = new XN805100Req();
		req.setUserId(userId);
		req.setLocation(location);
		return BizConnecter.getBizData("805100", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object signInPage(String userId, String dateStart, String dateEnd,
			String start, String limit) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		if (StringUtils.isBlank(start)) {
			throw new BizException("A010001", "开始页不能为空");
		}
		if (StringUtils.isBlank(limit)) {
			throw new BizException("A010001", "页面个数不能为空");
		}
		XN805101Req req = new XN805101Req();
		req.setDateEnd(dateEnd);
		req.setDateStart(dateStart);
		req.setLimit(limit);
		req.setStart(start);
		req.setUserId(userId);
		return BizConnecter.getBizData("805101", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object signInList(String userId, String dateStart, String dateEnd) {
		if (StringUtils.isBlank(userId)) {
			throw new BizException("A010001", "用户编号不能为空");
		}
		XN805102Req req = new XN805102Req();
		req.setDateEnd(dateEnd);
		req.setDateStart(dateStart);
		req.setUserId(userId);
		return BizConnecter.getBizData("805102", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object userSTAT(String userId) {
		return BizConnecter.getBizData("610900",
				JsonUtils.string2Json("userId", userId), Object.class);
	}

	/**
	 * @see com.xnjr.moom.front.ao.IUserAO#queryUserList(java.lang.String,
	 *      java.lang.String)
	 */
	@Override
	public Object queryUserList(String nickname, String mobile) {
		XN805055Req req = new XN805055Req();
		req.setNickname(nickname);
		req.setMobile(mobile);
		req.setKind(EUserKind.F1.getCode());
		return BizConnecter.getBizData("805055", JsonUtils.object2Json(req),
				Object.class);
	}

	@Override
	public Object doBindMoblie(String userId, String mobile, String smsCaptcha) {
		XN805153Req req = new XN805153Req();
		req.setUserId(userId);
		req.setMobile(mobile);
		req.setSmsCaptcha(smsCaptcha);
		return BizConnecter.getBizData("805153", JsonUtils.object2Json(req),
				Object.class);
	}
}
