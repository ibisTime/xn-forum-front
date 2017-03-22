import React, {Component} from 'react';
import {Link} from 'react-router';
import {List, InputItem, Button} from 'antd-mobile';
import {createForm} from 'rc-form';
import NormalHeader from '../../../components/NormalHeader';
import './index.scss';

class Register extends Component {
    register() {
        var param = {
            mobile: 18868824532,
            loginPwd: 111111,
            loginPwdStrength: 1,
            systemCode: 'CD-CCSW000008'
        }
        fetch('http://121.43.101.148:8901/forward-service/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': '*'
            },
            body: 'code=805076&json=' + JSON.stringify(param)
        }).then((response) => response.json()).then((responseJson) => {
            console.log(responseJson);
        }).catch((error) => {
            console.error(error);
        });
    }
    render() {
        let {getFieldProps} = this.props.form;
        return (
            <div>
                <NormalHeader title="注册"/>
                <div style={{
                    "height": "0.88rem"
                }}></div>
                <div class="p10 border-box">
                    <List class="register-wrap bg_fff">
                        <List.Item>
                            <InputItem {...getFieldProps('username')} placeholder="请输入手机号码或用户名">
                                <div class="reg-item-user"/>
                            </InputItem>
                        </List.Item>
                        <List.Item extra={< Button type = "primary" size = "small" inline > 获取验证码 < /Button>}>
                            <InputItem {...getFieldProps('captcha')} placeholder="请输入验证码">
                                <div class="reg-item-captcha"/>
                            </InputItem>
                        </List.Item>
                        <List.Item>
                            <InputItem {...getFieldProps('password')} placeholder="密码 (6~16)位，同时包含数字和字母">
                                <div class="reg-item-password"/>
                            </InputItem>
                        </List.Item>
                        <List.Item>
                            <InputItem {...getFieldProps('rePassword')} placeholder="确认密码">
                                <div class="reg-item-password"/>
                            </InputItem>
                        </List.Item>
                        <List.Item>
                            <div class="am-list-item am-input-item">
                                <div class="am-input-label am-input-label-5">
                                    <div class="reg-item-mask"></div>
                                </div>
                                <div class="am-input-control">选择站点</div>
                            </div>
                        </List.Item>
                    </List>

                    <div class="wp100 pt25 pb20 tc t_bbb fs13 lh120">注册成功后将生成一个登录名，格式为<samp class="t_red">CSW + 手机号</samp>您可以使用这个登录名进行登录</div>
                </div>
                <div class="plr10">
                    <input type="button" id="registerBtn" onClick={this.register.bind(this)} class="wp100 h50 bg_red t_white special-button" value="注册"/>
                </div>
                <div class="reg-b-tip tc t_bbb">注册即代表同意<samp class="t_red">《城市网服务协议》</samp>
                </div>
            </div>
        );
    }
}
export default createForm()(Register);
