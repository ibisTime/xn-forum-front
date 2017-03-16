import React, {Component} from 'react';
import {Link} from 'react-router';
import './index.scss';
import Tloader from 'react-touch-loader';
import className from 'classnames';
import {RichHeader, Nav} from '../../components';
import {ActivityIndicator} from 'antd-mobile';


const commentIcon = require('../../../images/评论－无边框@2x.png');
const DZIcon = require('../../../images/点赞无边框@2x.png');
const loadingEl = (
    <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
    </div>
);

export default class Forum extends Component {
    constructor(){
        super();
        this.state = {
            activeIndex: 0,
            leftNavData: [{
                name: "城市生活",
                code: "FL2016112511021235885"
            }, {
                name: "便民中心",
                code: "FL201610000000000000187"
            }],
            rightBlockData: [{
                pic: "http://114.55.179.135:8901/2016112511/20161133011032067720607.jpg",
                plCount: 48,
                dzCount: 7,
                code: 'BK2016112511032035926'
            }],
            leftLoad: 1,
            rightLoad: 1
        }
    }
    componentWillMount(){
        //
        setTimeout(() => {
            this.setState({
                leftLoad: 0,
                rightLoad: 0
            });
        }, 2e3);
    }
    handleLeftNavClick(index){
        let {activeIndex, leftNavData} = this.state;
        if(activeIndex != index){
            this.setState({
                activeIndex: index,
                rightLoad: 1
            });
            // ajax
            setTimeout(() => {
                this.setState({
                    rightLoad: 0
                });
            }, 2e3);
        }
    }
    render(){
        // let img = require('../../../images/帖子图片-2.png');
        let {leftNavData, rightBlockData, activeIndex, leftLoad, rightLoad} = this.state;
        return (
            <div>
                <RichHeader pFixed={true} activeNavIndex={1}/>
                <div>
                    {
                        leftLoad
                        ? loadingEl
                        : (
                            <div>
                                <div style={{height: "0.44rem"}}></div>
                                <div class="classify" style={{marginBottom: "0"}}>
                                    <ul class="classify-url" style={{overflow: "auto", display: "inline-block"}}>
                                        {
                                            leftNavData && leftNavData.map((nav, index) => (

                                                <li key={`left${index}`} class={
                                                    className({
                                                        "active": activeIndex == index
                                                    })
                                                } onClick={this.handleLeftNavClick.bind(this, index)}>{nav.name}</li>
                                            ))
                                        }
                                    </ul>
                                    <div class="classify-list">
                                        {
                                            rightLoad
                                            ? loadingEl
                                            : (
                                                <div class="moudleList">
                                                    <ul>
                                                        {
                                                            rightBlockData && rightBlockData.map((block, index) => (
                                                                <li key={`right${index}`}>
                                                                    <Link to={`/forum/${block.code}`}>
                                                                        <div class="moudleImg"><img src={block.pic} alt=""/></div>
                                                                        <p>{block.name}</p>
                                                                        <div class="moudle-ion">
                                                                            <div><img src={commentIcon} alt=""/> <span>10</span></div>
                                                                            <div><img src={DZIcon} alt=""/> <span>10</span></div>
                                                                        </div>
                                                                        <p class="moudle-enter">进入</p>
                                                                    </Link>
                                                                </li>
                                                            ))
                                                        }
                                                    </ul>
                                                </div>
                                            )
                                        }
                                        <div style={{"height": "0.5rem"}}></div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <Nav activeIndex={1}/>
            </div>
        );
    }
}
