import React, {Component} from 'react';
import {Link} from 'react-router';
import NormalHeader from '../../../components/NormalHeader';
import {Nav} from '../../../components';
import Tloader from 'react-touch-loader';
import {ActivityIndicator} from 'antd-mobile';
import './index.scss';

const userAvatar = require('../../../../images/头像@2x.png');
// const rightIcon = require('../../../images/_pic.png');
export default class FansOrAttention extends Component {
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
    render() {
        let {type} = this.props.params;
        let {hasMore, initializing, refreshedAt, userList, firstLoad} = this.state;
        let title = type == "1"
            ? "粉丝"
            : "关注";
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
                <li>
                    <div class="attention-headerPic"><img src={user.photo}/></div>
                    <p class="attention-name">{user.nickname}</p>
                </li>
            ))
            : "暂无粉丝";
        return (
            <div>
                <NormalHeader title={title}/>
                <div>
                    {firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="tloader headNoBottom">
                                <div class="myAttention">
                                    <p class="whole">全部关注</p>
                                    <ul>{list}</ul>
                                </div>
                            </Tloader>
                        )
}
                </div>
            </div>
        );
    }
}
