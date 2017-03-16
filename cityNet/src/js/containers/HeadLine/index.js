import React, {Component} from 'react';
import {HeadLineHeader, Nav} from '../../components';
import './index.css';
import {SmallImgBlocks} from '../../components';
import {HeadLinePosts} from '../../components';
// import { RefreshControl, ListView } from 'antd-mobile';
import Tloader from 'react-touch-loader';

export default class HeadLine extends Component {
    constructor() {
        super();
        this.state = {
            limit: 10,
            start: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            postData: [{
                imgUrl: "http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg",
                title: "测试",
                publishDatetime: "Feb 28, 2017 10:57:41 AM",
                code: "123456789965",
                totalReadTimes: 30
            }, {
                imgUrl: "http://114.55.179.135:8901/2016110419/20161130907415918624258.jpg",
                title: "测试",
                publishDatetime: "Feb 28, 2017 10:57:41 AM",
                code: "123456789965",
                totalReadTimes: 30
            }],
            
        }
    }
    componentWillMount() {}
    componentDidMount() {
        // setTimeout(()=>{
        //     var limit = this.state.limit;
        //     this.setState({
        //         hasMore: 1,
        //         initializing: 2
        //     });
        // }, 1e3);
    }
    handleLoadMore(resolve){
        setTimeout(()=>{
            var {start, postData} = this.state;
            this.setState({
                start: ++start
            });
            postData.push({
                imgUrl: require('../../../images/m-icon.png'),
                title: "测试",
                publishDatetime: "Feb 28, 2017 10:57:41 AM",
                code: "123456789965",
                totalReadTimes: 30
            });
            postData.push({
                imgUrl: require('../../../images/m-icon.png'),
                title: "测试",
                publishDatetime: "Feb 28, 2017 10:57:41 AM",
                code: "123456789965",
                totalReadTimes: 30
            });
            this.setState({
                postData: postData
            })
            resolve();
        }, 2e3);
    }
    handleRefresh(resolve){
        setTimeout(()=>{
            this.setState({
                start: 1,
                hasMore: 1,
                initializing: 2
            });
            let {postData} = this.state;
            postData.push(postData[0]);
            postData.push(postData[0]);
            this.setState({
                postData: postData
            })
            resolve();
        }, 2e3);
    }
    render() {
        let {hasMore, initializing, refreshedAt, postData} = this.state;

        let autoLoadMore = true;
        let SmallImgsData = [
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            },
            {
                pathUrl: "/",
                imgUrl: require('../../../images/求助@2x.png'),
                imgName: "爆 料"
            }
        ];

        return (
            <div ref="box" className="box">
                <HeadLineHeader title="头条"/>
                <Tloader
                    initializing={initializing}
                    onRefresh={this.handleRefresh.bind(this)}
                    hasMore={hasMore}
                    onLoadMore={this.handleLoadMore.bind(this)}
                    autoLoadMore={autoLoadMore}
                    className="tloader headline">
                    <div className="headerLine-detail">
                        <div className="sliderPic">

                        </div>
                        <div className="headerLine-nav">
                            <div className="headerLine-nav-header">
                                <p className="integral">积分商城</p>
                                <p className="signOn">每日签到</p>
                                <p className="cityWide">同城活动</p>
                            </div>
                            <SmallImgBlocks imgsData={SmallImgsData}/>
                            <HeadLinePosts postData={postData}/>
                        </div>
                    </div>
                </Tloader>
                <Nav activeIndex={0}/>
            </div>
        )
    }
}
