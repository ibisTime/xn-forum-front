import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import Tloader from 'react-touch-loader';
import {ActivityIndicator} from 'antd-mobile';
import './index.scss';

const demoIcon = require('../../../../images/人@2x.png');
export default class UserReward extends Component {
    constructor() {
        super();
        this.state = {
            start: 1,
            limit: 10,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            firstLoad: 1,
            rewardList: [
            ]
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({firstLoad: 0});
        }, 1e3);
    }
    handleLoadMore(resolve) {
        setTimeout(() => {
            var {start, userList} = this.state;
            this.setState({
                start: ++start
            });
            this.setState({userList: userList});
            resolve();
        }, 2e3);
    }
    handleRefresh(resolve) {
        setTimeout(() => {
            let {userList} = this.state;
            this.setState({start: 1, hasMore: 1, initializing: 2});
            resolve();
        }, 2e3);
    }
    render() {
        let {hasMore, initializing, refreshedAt, rewardList, firstLoad} = this.state;
        const loadingEl = (
            <div style={{
                width: '100%',
                height: document.documentElement.clientHeight * 0.6,
                display: 'flex',
                justifyContent: 'center'
            }}>
                <ActivityIndicator size="small"/>
            </div>
        );
        return (
            <div>
                <NormalHeader title="赏金详情"/>
                <div style={{height: "0.88rem"}}></div>
                <div class="wp100 reward-nav-wrap">
        			<div class="reward-nav fl"><Link><img src={demoIcon}/>赏金商城</Link></div>
        			<div class="reward-nav fr"><Link><img src={demoIcon}/>如何赚赏金</Link></div>
        		</div>
                <div>
                    {firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="rewardLoader tloader headNoBottom">
                                <div class="wp100 bg_fff">
                                    <div class="wp100 reward-list b_e6_b">
                        				<div>发布帖子</div>
                        				<div class="tc"><samp>+2</samp>赏金</div>
                        				<div class="tr">3月10日 9:37</div>
                        			</div>
                        			<div class="wp100 reward-list b_e6_b">
                        				<div>发布帖子</div>
                        				<div class="tc"><samp>+2</samp>赏金</div>
                        				<div class="tr">3月10日 9:37</div>
                        			</div>
                        		</div>
                            </Tloader>
                        )
                    }
                </div>
            </div>
        );
    }
}
