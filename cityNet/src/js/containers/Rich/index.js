import React, {Component} from 'react';
import {RichHeader, Nav, NormalPostItem} from '../../components';
// import Forum from '../../components/Forum';
import {ActivityIndicator} from 'antd-mobile';
import './index.css';

import {HeadLinePosts} from '../../components';
import Tloader from 'react-touch-loader';
import {Ajax} from '../App';

export default class Rich extends Component {
    constructor() {
        super();
        this.state = {
            limit: 10,
            start: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            firstLoad: 1,

            postData: [
                {
                    "code": "TZ2017022810574186353",
                    "title": "瑶岙,二月二龙抬头.",
                    "content": "二月二 龙抬头",
                    "publisher": "UHQ170547",
                    "publishDatetime": "Feb 28, 2017 10:57:41 AM",
                    "status": "B",
                    "location": "C",
                    "plateCode": "BKHQ001",
                    "validDatetimeStart": "Mar 1, 2017 12:11:28 PM",
                    "validDatetimeEnd": "Apr 1, 2017 12:00:00 AM",
                    "loginName": "雷大叔",
                    "nickname": "雷大叔",
                    "photo": "http://114.55.179.135:8901/2017030109/2017036009393356821555.jpg",
                    "isDZ": "0",
                    "isSC": "0",
                    "totalLikeNum": 7.0,
                    "totalCommNum": 4.0,
                    "totalReadTimes": 72.0,
                    "picArr": ["http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg","http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg","http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg","http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg"],
                    "commentList": [
                        {
                            commer: "U2016112810232666457",
                            content: "好看！",
                            nickname: "柯"
                        }
                    ],
                    "likeList": [
                        {
                            "code": "JL2017030109081895872",
                            "type": "1",
                            "postCode": "TZ2017022810574186353",
                            "talker": "U2016122617082993977",
                            "nickname": "学无止境"
                        }
                    ]
                }
            ]
        }
    }
    componentWillMount() {
        Ajax.globalInfo.arr.push(3);
        console.log(Ajax.globalInfo.arr.length);
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                firstLoad: 0
            });
        }, 1e3);
    }
    handleLoadMore(resolve) {
        setTimeout(() => {
            var {start, postData} = this.state;
            this.setState({
                start: ++start
            });
            let flag = postData[0];
            postData.push(flag);
            postData.push(flag);
            this.setState({postData: postData});
            resolve();
        }, 2e3);
    }
    handleRefresh(resolve) {
        setTimeout(() => {
            let {postData} = this.state;
            this.setState({start: 1, hasMore: 1, initializing: 2});
            let flag = postData[0];
            this.setState({
                postData: [flag, flag]
            });
            resolve();
        }, 2e3);
    }
    render() {
        let {hasMore, initializing, refreshedAt, postData, firstLoad} = this.state;
        let autoLoadMore = true;
        let postItems = postData.map((data, index) => (
            <NormalPostItem key={`item${index}`} pData={data} showComment={true}/>
        ));
        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="small" />
            </div>
        );
        return (
            <div>
                <RichHeader activeNavIndex={0}/>
                <div>
                    {
                        firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={autoLoadMore} className="tloader headline">
                                <div class="rich_list">
                                    <ul>{postItems}</ul>
                                </div>
                            </Tloader>
                        )
                    }
                </div>
                <Nav activeIndex={1}/>
            </div>
        )
    }
}
