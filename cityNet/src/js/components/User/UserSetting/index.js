import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import './index.scss';

const rightIcon = require('../../../../images/_pic.png');

export default class UserSetting extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render(){
        return (
            <div>
                <NormalHeader title='设置'/>
                <div class="setMenu">
                    <ul>
                        <li><span>修改登录名</span><img src={rightIcon} alt=""/></li>
                        <li><span>账号和密码</span><img src={rightIcon} alt=""/></li>
                        <li><span>修改手机号</span><img src={rightIcon} alt=""/></li>
                        <li><span>个人资料</span><img src={rightIcon} alt=""/></li>
                        <li><span>清除缓存</span><img src={rightIcon} alt=""/></li>
                    </ul>
                </div>
                <div class="setting-logout">退出登录</div>
            </div>
        );
    }
}
