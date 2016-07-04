define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dialog'
], function (base, Ajax, dialog) {
    $(function () {
    	initView();
	    function initView() {
            addListeners();
	    }

	    function addListeners(){
	    	$("#verification").on("change",validate_verification);
	    	$("#mobile").on("change", validate_mobile);
	    	$("#password").on("change", validate_password)
		        .on("focus", function(){
		            $(this).siblings(".register_verifycon")
			            .css({
			                "display": "block"
			            });
		        })
		        .on("blur", function(){
		            $(this).siblings(".register_verifycon")
			            .css({
			                "display": "none"
			            });
		        });
            $("#sbtn").on("click", function (e) {
                changeMobile();
            });
            
	    }
	    function handleSendVerifiy() {
            $("#getVerification").addClass("cancel-send");
            Ajax.post(APIURL + '/gene/changemobile/send',
                {
                    "mobile": $("#mobile").val()
                }).then(function (response) {
                    if (response.success) {
                        for (var i = 0; i <= 60; i++) {
                            (function (i) {
                                setTimeout(function () {
                                    if (i < 60) {
                                        $("#getVerification").text((60 - i) + "s");
                                    } else {
                                    	$("#getVerification").text("获取验证码").removeClass("cancel-send")
			                            	.one("click", handleSendVerifiy);
                                    }
                                }, 1000 * i);
                            })(i);
                        }
                    } else {
                    	$("#getVerification").one("click", handleSendVerifiy);
		            	var parent = $("#verification").parent();
	                    var span = parent.find("span.warning")[2];
	                    $(span).fadeIn(150).fadeOut(3000);
                    }
                });
        }
        function validate_mobile(){
            var elem = $("#mobile")[0],
                parent = elem.parentNode,
                span;
            $("#getVerification").off("click");

            if(elem.value == ""){
	            span = $(parent).find("span.warning")[0];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }else if(!/^1[3,4,5,7,8]\d{9}$/.test(elem.value)){
	            span = $(parent).find("span.warning")[1];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }
	        if(!$("#getVerification").hasClass("cancel-send")){
	        	$("#getVerification").one("click", handleSendVerifiy);
	        }
	        return true;
        }
        function validate_verification(){
        	var elem = $("#verification")[0],
	            parent = elem.parentNode,
	            span;
	        if(elem.value == ""){
	            span = $(parent).find("span.warning")[0];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }else if(!/^[\d]{4}$/.test(elem.value)){
	            span = $(parent).find("span.warning")[1];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }
	        return true;
        }

        function validate_password(){
        	var elem = $("#password")[0],
	            parent = elem.parentNode,
	            myreg = /^[^\s]{6,16}$/,
	            span;
	        if(elem.value == ""){
	            span = $(parent).find("span.warning")[0];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }else if(!myreg.test(elem.value)){
	            span = $(parent).find("span.warning")[1];
	            $(span).fadeIn(150).fadeOut(3000);
	            return false;
	        }
	        return true;
        }
	    function validate(){
            if(validate_mobile() && validate_verification() && validate_password()){
                return true;
            }
            return false;
        }
        function checkMobile (){
            Ajax.post(APIURL + '/user/mobile/check',
                {"loginName": $("#mobile").val()})
                .then(function (response) {
                    if (response.success) {
                        finalChangeMobile();
                    } else {
                    	var parent = $("#mobile").parent();
                    	var span = parent.find("span.warning")[2];
	                    $(span).fadeIn(150).fadeOut(3000);
                        
                    }
                });
        }
        function doSuccess(){
        	$("#sbtn").text("设置");
	        showMsg("恭喜您，交易密码设置成功！");
	        setTimeout(function(){
	        	location.href = './user_info.html';
	        }, 1000);
        }
        function finalChangeMobile() {
        	$("#sbtn").attr("disabled", "disabled").text("设置中...");
            var param = {
                "newMobile": $("#mobile").val(),
                "tradePwd": $("#password").val(),
                "smsCaptcha": $("#verification").val()
            };
            Ajax.post(APIURL + '/user/mobile/change', param)
                .then(function (response) {
                    if (response.success) {
                        doSuccess();
                    } else {
                    	$("#sbtn").removeAttr("disabled").text("设置");
	                    showMsg(response.msg);
                    }
                });
        }
        function changeMobile(){
            if(validate()){
                checkMobile();
            }
        }
	});
});