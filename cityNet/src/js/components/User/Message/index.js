import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import {NormalPostItem} from '../../../components';
import './index.scss';

const Util = require('../../../util/util');
const rightIcon = require('../../../../images/_pic.png');
const msgIcon = require('../../../../images/消息列表－系统消息@2x.png');
const peopleIcon = require('../../../../images/人@2x.png');

export default class Message extends Component {

    handleIconClick(){
        Util.goPath('/user/attention/list')
    }

    goBack(){
        Util.goPath('/user');
    }

    render(){
        return (
            <div>
                <NormalHeader title="我的消息" rightIcon={peopleIcon} goBack={this.goBack.bind(this)} handleClick={this.handleIconClick.bind(this)}/>
                <div style={{height: "0.88rem"}}></div>
                <div class="myMsg">
                    <ul>
                        <li><Link to='/user/like/list'><div class="best"></div><span>赞</span><img src={rightIcon} alt=""/></Link></li>
                        <li><Link to='/user/mention/list'><div class="mention"></div><span>提到我的</span><img src={rightIcon} alt=""/></Link></li>
                        <li><Link to='/user/comment/list/1'><div class="comment"></div><span>评论</span><img src={rightIcon} alt=""/></Link></li>
                        <li><Link to='/user/'><div class="systemMsg"></div><span>系统消息</span><img src={rightIcon} alt=""/></Link></li>
                    </ul>
                </div>
                <div class="contacts">
                    <p><span>最近联系人</span></p>
                    <ul>
                        <li><img src={msgIcon} alt=""/><span>赞赞赞赞</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}
