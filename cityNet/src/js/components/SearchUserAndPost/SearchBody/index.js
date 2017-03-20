import React, {Component} from 'react';
import {Link} from 'react-router';
import Tloader from 'react-touch-loader';
import className from 'classnames';
import {ActivityIndicator, SearchBar} from 'antd-mobile';
import SearchUserBodyItem from './SearchUserBodyItem';
import NormalPostItem from '../../NormalPostItem';
import './index.scss';

const loadingEl = (
    <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
    </div>
);

export default class SearchBody extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: 10,
            start: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),

            firstLoad: 1,
            searchData: [
                {
                    "code": "TZ2017022810574186353",
                    "title": "瑶岙,二月二龙抬头.",
                    "content": "二月二 龙抬头",
                    "publisher": "UHQ170547",
                    "publishDatetime": "Feb 28, 2017 10:57:41 AM",
                    "status": "B",
                    "location": "C",
                    "plateCode": "BKHQ001",
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
            ],
            searchData1: [{
                "userId": "UHQ170547",
                "nickname": "雷大叔",
                "photo": "http://114.55.179.135:8901/2017030109/2017036009393356821555.jpg",
                "totalFansNum": 40
            }]
        };
    }
    componentDidMount(){
        setTimeout(() => {
            this.setState({
                firstLoad: 0
            });
        }, 2e3);
    }
    handleSubmit(){
        let {searchType} = this.props;
    }
    handleRefresh(resolve){
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    handleLoadMore(resolve){
        setTimeout(() => {
            resolve();
        }, 2e3);
    }

    render(){
        let {searchType} = this.props;
        let {searchData, searchData1, hasMore, initializing, firstLoad} = this.state;
        return (
            <div class="search-bar-wrap">
                <SearchBar
                    placeholder="请输入搜索关键词"
                    onSubmit={this.handleSubmit.bind(this)}
                />
                <div>
                    <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="tloader searchLoader">
                    {
                        firstLoad ? loadingEl :
                        (
                            searchType == "0"
                            ?
                            <div class="search_user_list">
                                <ul>
                                    {
                                        searchData1.map((data, index) => (
                                            <SearchUserBodyItem key={`item${index}`} uData={data}/>
                                        ))
                                    }
                                </ul>
                            </div>
                            :
                            <div class="rich_list">
                                <ul>
                                    {
                                        searchData.map((data, index) => (
                                            <NormalPostItem key={`item${index}`} pData={data}/>
                                        ))
                                    }
                                </ul>
                            </div>
                        )
                    }
                    </Tloader>
                </div>
            </div>
        );
    }
}
