import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import Tloader from 'react-touch-loader';
import {ActivityIndicator} from 'antd-mobile';
import './index.scss';

export default class DraftBox extends Component {
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
                <NormalHeader title="草稿箱"/>
                <div class="draftWrap">
                    {firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="tloader headNoBottom">
                                <div class="wp100 bg_fff p10 b_e6_tb mb10 pr border-box">
                        			<div>
                        				<div class="fs14 pb10">存稿时间：1天前</div>
                        				<input type="button" value="重发" class="btn-sendOut" />
                        			</div>
                        			<div class="fs14">标题：摇一摇</div>
                        			<div class="fs14 pt10 draft-cont">内容：fffffffffffff啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                        		</div>

                        		<div class="wp100 bg_fff p10 b_e6_tb mb10 pr border-box">
                        			<div>
                        				<div class="fs14 pb10">存稿时间：1天前</div>
                        				<input type="button" value="重发" class="btn-sendOut" />
                        			</div>
                        			<div class="fs14">标题：摇一摇</div>
                        			<div class="fs14 pt10 draft-cont">内容：fffffffffffff啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                        		</div>
                            </Tloader>
                        )
                    }
                </div>
            </div>
        );
    }
}
