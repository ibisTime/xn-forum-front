package com.xnjr.moom.front.req;

public class XN610044Req {
	//帖子编号
	private String code;
	//审核结果	1 是 0 否
	private String approveResult;
	//审核人
	private String approver;
	//审核说明
	private String approveNote;
	//类型	1 帖子 2 评论
	private String type;
	
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getApproveResult() {
		return approveResult;
	}
	public void setApproveResult(String approveResult) {
		this.approveResult = approveResult;
	}
	public String getApprover() {
		return approver;
	}
	public void setApprover(String approver) {
		this.approver = approver;
	}
	public String getApproveNote() {
		return approveNote;
	}
	public void setApproveNote(String approveNote) {
		this.approveNote = approveNote;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
