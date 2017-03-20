import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../NormalHeader';
import Tloader from 'react-touch-loader';
import {ActivityIndicator} from 'antd-mobile';
import CommodityItem from './CommodityItem';
import './index.scss';

export default class CommodityList extends Component {
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
                <NormalHeader title="积分商城"/>
                <div>
                    {firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="user-commodity tloader headNoBottom">
                                <div class="wp100 ptb10 commodity-user-list">
                        			<ul class="wp100 over-hide plr5 border-box">
                        				<CommodityItem />
                        			</ul>
                        		</div>
                            </Tloader>
                        )
                    }
                </div>
            </div>
        );
    }
}
