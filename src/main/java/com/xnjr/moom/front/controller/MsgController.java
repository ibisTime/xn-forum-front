package com.xnjr.moom.front.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xnjr.moom.front.http.BizConnecter;
import com.xnjr.moom.front.http.JsonUtils;
import com.xnjr.moom.front.req.XN805140Req;
import com.xnjr.moom.front.req.XN805145Req;
import com.xnjr.moom.front.req.XN805146Req;

@Controller
@RequestMapping(value = "/msg")
public class MsgController extends BaseController {

	// 阅读广播，返回广播信息并将该阅读记录状态置为已读
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	@ResponseBody
	public Object msgRead(@RequestParam("smsCode") String smsCode) {
		XN805140Req req = new XN805140Req();
		req.setSmsCode(smsCode);
		req.setUserId(this.getSessionUserId(null));
		return BizConnecter.getBizData("805140", JsonUtils.object2Json(req),
				Object.class);
	}

	// 前端用户将不显示此条广播，数据库还留存数据。（更改阅读纪录的状态）
	@RequestMapping(value = "/read/delete", method = RequestMethod.POST)
	@ResponseBody
	public Object msgReadDetele(@RequestParam("id") String id) {
		return BizConnecter.getBizData("805141",
				JsonUtils.string2Json("id", id), Object.class);
	}

	// 分页查询阅读广播记录
	@RequestMapping(value = "/read/page", method = RequestMethod.GET)
	@ResponseBody
	public Object msgReadPage(
			@RequestParam(value = "smsCode", required = false) String smsCode,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "dateStart", required = false) String dateStart,
			@RequestParam(value = "dateEnd", required = false) String dateEnd,
			@RequestParam(value = "start", required = true) String start,
			@RequestParam(value = "limit", required = true) String limit) {
		XN805145Req req = new XN805145Req();
		req.setSmsCode(smsCode);
		req.setStatus(status);
		// req.setUserId(this.getSessionUserId(null));
		req.setUserId("");
		req.setDateStart(dateStart);
		req.setDateEnd(dateEnd);
		req.setStart(start);
		req.setLimit(limit);
		return BizConnecter.getBizData("805145", JsonUtils.object2Json(req),
				Object.class);
	}

	// 列表查询阅读广播记录
	@RequestMapping(value = "/read/list", method = RequestMethod.GET)
	@ResponseBody
	public Object msgReadList(
			@RequestParam(value = "smsCode", required = false) String smsCode,
			@RequestParam(value = "status", required = false) String status,
			@RequestParam(value = "dateStart", required = false) String dateStart,
			@RequestParam(value = "dateEnd", required = false) String dateEnd) {
		XN805146Req req = new XN805146Req();
		req.setSmsCode(smsCode);
		req.setStatus(status);
		req.setUserId(this.getSessionUserId(null));
		req.setDateStart(dateStart);
		req.setDateEnd(dateEnd);
		return BizConnecter.getBizData("805146", JsonUtils.object2Json(req),
				Object.class);
	}
}
