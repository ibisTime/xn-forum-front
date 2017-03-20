import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../NormalHeader';
import Tloader from 'react-touch-loader';
import {ActivityIndicator, SearchBar} from 'antd-mobile';
import './index.scss';

const rightIcon = require('../../../../../images/_pic.png');

export default class AttentionUserList extends Component {
    constructor() {
        super();
        this.state = {
            start: 1,
            limit: 10,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            firstLoad: 1,
            userList: [
                {
                    "userId": "U2016112420345628049",
                    "loginName": "CSW15958430512",
                    "nickname": "丫丫",
                    "kind": "f1",
                    "level": "2",
                    "mobile": "18857117053",
                    "status": "0",
                    "updater": "橙袋科技",
                    "updateDatetime": "Nov 24, 2016 9:22:43 PM",
                    "photo": "http://wx.qlogo.cn/mmopen/et9q9FvjBBriciawxDqwxJj20XFUDCgLM3skIRY7AdKRGFibMIqnAT0bleF2triceUNw1TWIRX18lVPo91Ilicz8mIA/0"
                }, {
                    "userId": "U2016110418121697887",
                    "loginName": "CSW15158068891",
                    "nickname": "小妮子",
                    "kind": "f1",
                    "level": "2",
                    "mobile": "15158068891",
                    "status": "0",
                    "updater": "U2016110418121697887",
                    "updateDatetime": "Nov 4, 2016 6:12:16 PM",
                    "remark": "前端个人用户",
                    "photo": "http://114.55.179.135:8901/2016110418/2016113090614221199562.jpg"
                }
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
            let flag = userList[0];
            userList.push(flag);
            userList.push(flag);
            this.setState({userList: userList});
            resolve();
        }, 2e3);
    }
    handleRefresh(resolve) {
        setTimeout(() => {
            let {userList} = this.state;
            this.setState({start: 1, hasMore: 1, initializing: 2});
            let flag = userList[0];
            this.setState({
                userList: [flag, flag]
            });
            resolve();
        }, 2e3);
    }
    handleSubmit(){}
    render() {
        let {hasMore, initializing, refreshedAt, userList, firstLoad} = this.state;
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
        const list = userList.length
            ? userList.map((user, index) => (
                <Link to="/" key={`index${index}`} class="wp100 pr">
                    <div class="follow-img plr15 w70 h50 bg_fff"><img class="wp100" src={user.photo}/></div>
                    <div class="follow-txt h50 b_e6_b pl70 wp100">{user.nickname}<img class="follow-l" src={rightIcon}/></div>
                </Link>
            ))
            : "暂无关注的人";
        return (
            <div>
                <NormalHeader title="发起聊天"/>
                <div style={{height: "0.88rem"}}></div>
                <div class="search-bar-wrap">
                    <SearchBar
                        placeholder="请输入搜索关键词"
                        onSubmit={this.handleSubmit.bind(this)}
                    />
                </div>
                <div>
                    {firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="tloader searchLoader">
                                <div class="wp100 bg_fff follow-list b_e6_b">
                                    {list}
                        		</div>
                            </Tloader>
                        )
}
                </div>
            </div>
        );
    }
}
