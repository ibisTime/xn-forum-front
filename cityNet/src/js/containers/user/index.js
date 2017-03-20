import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../components/NormalHeader';
import {Nav} from '../../components';
import Tloader from 'react-touch-loader';
import './index.scss';

const userAvatar = require('../../../images/头像@2x.png');
const rightIcon = require('../../../images/_pic.png');
export default class User extends Component {
    constructor() {
        super();
        this.state = {
            initializing: 2,
            refreshedAt: Date.now()
        }
    }
    handleRefresh(resolve) {
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    render(){
        let {initializing} = this.state;
        return (
            <div>
                <NormalHeader hideBack={true} title='我的'/>
                <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} className="tloader headline">
                    <div class="mine-detail">
                        <div class="mine-detail-header">
                            <div class="picDetail">
                                <div class="pic_detail">
                                    <div class="pic">
                                        <img src={userAvatar} alt=""/>
                                    </div>
                                    <div class="picName">
                                        <p class="username">你好</p>
                                        <p class="userRank">论坛元老</p>
                                    </div>
                                </div>
                                <img class="_pic" src={rightIcon} alt=""/>
                            </div>
                            <div class="mine-detail-header-num">
                                <ul>
                                    <li><Link to='/user/post/list'><div>0</div><p>帖子</p></Link></li>
                                    <li><Link to='/user/fansOrAttention/0'><div>0</div><p>关注</p></Link></li>
                                    <li><Link to='/user/fansOrAttention/1'><div>0</div><p>粉丝</p></Link></li>
                                    <li><Link to='/user/reward'><div>0</div><p>赏金</p></Link></li>
                                </ul>
                            </div>
                        </div>
                        <div class="mine-detail-content">
                            <ul>
                                <li><Link to={`/user/commodity/list`}><div class="goods"></div><span>我的物品</span><img src={rightIcon} alt=""/></Link></li>
                                <li><Link to={`/user/collection`}><div class="collect"></div><span>我的收藏</span><img src={rightIcon} alt=""/></Link></li>
                                <li><Link to={`/user/draft`}><div class="draft"></div><span>草稿箱</span><img src={rightIcon} alt=""/></Link></li>
                                <li><Link to={`/user/message`}><div class="msg"></div><span>我的消息</span><img src={rightIcon} alt=""/></Link></li>
                                <li><Link to={`/`}><div class="aboutCity"></div><span>关于城市网</span><img src={rightIcon} alt=""/></Link></li>
                                <li><Link to={`/user/setting`}><div class="set"></div><span>设置</span><img src={rightIcon} alt=""/></Link></li>
                            </ul>
                        </div>
                    </div>
                </Tloader>
                <Nav/>
            </div>
        );
    }
}
