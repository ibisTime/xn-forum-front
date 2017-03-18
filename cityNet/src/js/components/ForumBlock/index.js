import React, {Component} from 'react';
import {Link} from 'react-router';
import Tloader from 'react-touch-loader';
import className from 'classnames';
import {Nav} from '../../components';
import NormalPostItems from './NormalPostItems';
import ForumBlockHeader from './ForumBlockHeader';
import {ActivityIndicator, Tabs} from 'antd-mobile';
import './index.scss';

const TabPane = Tabs.TabPane;
const loadingEl = (
    <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
    </div>
);

export default class ForumBlock extends Component {
    constructor(){
        super();
        this.state = {
            limit: 10,
            start: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            firstLoad: 1,
            title: '板块详情'
        }
    }
    componentWillMount(){
        setTimeout(() => {
            this.setState({
                firstLoad: 0
            });
        }, 2e3);
    }
    render(){
        let {firstLoad, title} = this.state;
        let img = require('../../../images/demo.jpg');
        return (
            <div>
                <ForumBlockHeader title={title}/>
                {
                    firstLoad
                    ? loadingEl
                    : (
                        <div>
                            <div style={{height: "0.88rem"}}></div>
                            <div class="themeHeader">
                                <div class="themePic"><img src={img} alt=""/></div>
                                <p class="themeTopic">板块名称</p>
                                <p class="themeNums">主题：<span class="themeNum">0</span> 今日：<span class="todayNum">0</span></p>
                            </div>
                            <Tabs defaultActiveKey="0" animated={false}>
                                <TabPane tab="全部" key="0">
                                    <NormalPostItems />
                                </TabPane>
                                <TabPane tab="最新" key="1">
                                    <NormalPostItems />
                                </TabPane>
                                <TabPane tab="精华" key="2">
                                    <NormalPostItems />
                                </TabPane>
                            </Tabs>
                        </div>
                    )
                }
            </div>
        );
    }
}
