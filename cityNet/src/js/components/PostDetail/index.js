import React, {Component} from 'react';
import { WhiteSpace } from 'antd-mobile';
import PostDetailHeader from './PostDetailHeader';
import CommentAndDZ from './CommentAndDZ';
import NormalHeader from '../NormalHeader';
import CommentBottom from './CommentBottom';
import Tloader from 'react-touch-loader';

import './index.scss';

export default class PostDetail extends Component {
    constructor(){
        super();
        this.state = {
            limit: 10,
            start0: 1,
            hasMore0: 1,
            start1: 1,
            hasMore1: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),

            activeNavIndex: "0",
            postData: {
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
        }
    }
    componentWillMount(){
        let {code} = this.props.params;
    }
    handleChange(key){
        this.setState({
            activeNavIndex: key
        });
        if(this.state.activeNavIndex == "0"){ //  评价
            if(this.state.start0 == 1){

                this.setState({
                    hasMore0: 1,
                    hasMore: 1
                });
                // ajax
            }
        }else{  // 点赞
            if(this.state.start1 == "1"){
                this.setState({
                    hasMore1: 1,
                    hasMore: 1
                });
                // ajax
            }
        }
    }
    handleRefresh(resolve){
        this.setState({
            start0: 1,
            start1: 1
        });
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    handleLoadMore(resolve){
        let {activeNavIndex, hasMore0, hasMore1} = this.state;
        if(activeNavIndex == "0" && !hasMore0){
            setTimeout(() => {
                resolve();
            }, 2e3);
        }else if(activeNavIndex == "1" && !hasMore1){
            setTimeout(() => {
                resolve();
            }, 2e3);
        }
    }
    render() {
        let {activeNavIndex, postData, initializing, hasMore, title} = this.state;
        return (
            <div>
                <NormalHeader title={title}/>
                <Tloader
                    initializing={initializing}
                    onRefresh={this.handleRefresh.bind(this)}
                    hasMore={hasMore}
                    onLoadMore={this.handleLoadMore.bind(this)}
                    autoLoadMore={true}
                    className="tloader headline">

                    <PostDetailHeader pData={postData}/>
                    <WhiteSpace size="sm" />
                    <CommentAndDZ handleChange={this.handleChange.bind(this)} activeNavIndex={activeNavIndex} pData={postData}/>
                </Tloader>
                <CommentBottom code={this.props.params.code}/>
            </div>
        )
    }
}
