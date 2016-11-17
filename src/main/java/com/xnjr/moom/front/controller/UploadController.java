package com.xnjr.moom.front.controller;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.xnjr.moom.front.ao.IUserAO;
import com.xnjr.moom.front.exception.BizException;
import com.xnjr.moom.front.util.FileUploadUtil;
import com.xnjr.moom.front.util.UploadUtil;

@Controller
@RequestMapping(value = "/upload")
public class UploadController extends BaseController {
    @Autowired
    IUserAO userAO;

    @RequestMapping(value = "/editAvatar", method = RequestMethod.POST)
    public Object uploadFile(@RequestParam("file") MultipartFile file,
            HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        if (file.isEmpty()) {
            throw new BizException("A010001", "文件不能为空");
        } else if (file.getContentType().equals("")) {
            throw new BizException("A010001", "文件格式错误");
        } else if (file.getSize() > 10 * 1024 * 1024) {
            throw new BizException("A010001", "文件过大");
        } else {
            FileUploadUtil uploadUtil = new FileUploadUtil();
            String url = uploadUtil.EditAvatar(file, request);
            switch (url) {
                case "-1":
                    throw new BizException("A010001", "文件不能为空");
                case "-2":
                    throw new BizException("A010001", "文件上传失败");
                default:
                    return userAO.setAvatar(getSessionUserId(""), url);
            }
        }
    }
    
    @RequestMapping(value = "/img", method = RequestMethod.POST)
    public Object uploadImg(@RequestParam("photo") String photo) throws UnsupportedEncodingException{
    	photo = URLDecoder.decode(photo, "UTF-8");
    	return UploadUtil.uploadPicture(photo);
    }
}
