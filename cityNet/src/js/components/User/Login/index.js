import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import './index.scss';

const wechatIcon = require('../../../../images/wechat.png');

export default class Login extends Component {
    render() {
        return (
            <div>
                <NormalHeader title="登录"/>
                <div style={{"height": "0.88rem"}}></div>
                <div class="p10 border-box">
                    <form class="register-wrap bg_fff" id="registForm">
                        <div class="reg-item b-b-e9 reg-item-user">
                            <div class="pr wp100">
                                <input type="text" class="reg-input"/>
                                <label class="item-error" >请输入手机号码或用户名</label>
                            </div>
                        </div>
                        <div class="reg-item b-b-e9 reg-item-password">
                            <div class="pr wp100">
                                <input type="password"  class="reg-input"/>
                                <label class="item-error">请输入密码</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="plr10 pt35">
                    <input type="button" id="registerBtn" class="wp100 h50 bg_red t_white special-button" value="登录"/>
                </div>

                <div class="reg-b-tip over-hide">
                    <a href="register.html" class="fl t_red">去注册</a>
                    <a href="findPwd.html" class="fr t_bbb">找回密码?</a>
                </div>

                <div class="wp100 pt150">
                    <div class="tc b_bd_b pr"><p class="wp100 otherLogin tc"><samp class="bg_f0 inline_block plr10">其他登陆方式</samp></p></div>
                    <a class="tc inline_block wp100 pt35"><img class="h50" src={wechatIcon}/></a>
                </div>
            </div>
        );
    }
}
