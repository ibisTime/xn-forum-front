import React, {Component} from 'react';
import {Link} from 'react-router';
import {HeadLineHeader, Nav} from '../../components';
import './index.css';
import {SmallImgBlocks, HeadLinePosts, Swipe} from '../../components';
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
            smallImgsData: [
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
            ],
            swiperData: [{
                pic: "http://114.55.179.135:8901/2017030111/2017036011472342816883.jpg",
                name: "虹桥门户网爆料奖现金红包",
                url: "http://mp.weixin.qq.com/s/6kNrumIGyuBjTfPKt0OT5g"
            }, {
                pic: "http://114.55.179.135:8901/2017030111/2017036011192795601562.jpg",
                name: "虹桥这家汽修店太壕了，免费洗车！",
                url: "http://www.baidu.com"
            }]
        }
    }
    componentWillMount() {
        console.log("headwill");
    }
    componentDidMount() {
        // setTimeout(()=>{
        //     var limit = this.state.limit;
        //     this.setState({
        //         hasMore: 1,
        //         initializing: 2
        //     });
        // }, 1e3);
        console.log("headdid");
    }
    componentWillUnmount() {
        console.log("headUnmount");
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
        let {hasMore, initializing, refreshedAt, postData, swiperData, smallImgsData} = this.state;

        let autoLoadMore = true;

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
                            <Swipe data={swiperData}/>
                        </div>
                        <div className="headerLine-nav">
                            <div className="headerLine-nav-header">
                                <p className="integral"><Link to='/mall/list'>积分商城</Link></p>
                                <p className="signOn">每日签到</p>
                                <p className="cityWide">同城活动</p>
                            </div>
                            <SmallImgBlocks imgsData={smallImgsData}/>
                            <HeadLinePosts postData={postData}/>
                        </div>
                    </div>
                </Tloader>
                <Nav activeIndex={0}/>
            </div>
        )
    }
}
