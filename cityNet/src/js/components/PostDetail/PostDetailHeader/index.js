import React, {Component} from 'react';
import {Card, Button, ActionSheet} from 'antd-mobile';
import './index.scss';
const commentIcon = require('../../../../images/评论－无边框@2x.png');
const likeIcon = require('../../../../images/点赞无边框@2x.png');
const moreIcon = require('../../../../images/更多操作@2x.png');
const readIcon = require('../../../../images/浏览@2x.png');
// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
// let wrapProps;
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }
export default class PostDetailHeader extends Component {
    constructor() {
        super();
        // this.state = {
        //     visible: true,
        //     selected: '',
        // };
    }
    handleClick(toUser) {
        // toUser
    }
    showActionSheet() {
        const BUTTONS = ['举报', '收藏', '取消'];
        ActionSheet.showActionSheetWithOptions({
            options: BUTTONS,
            cancelButtonIndex: BUTTONS.length - 1,
            // title: '标题',
            message: '操作',
            maskClosable: true,
            'data-seed': 'logId',
            // wrapProps
        }, (buttonIndex) => {
            this.handleOptionClick(buttonIndex);
            // this.setState({clicked: BUTTONS[buttonIndex]});
        });
    }
    handleOptionClick(index){

    }
    render() {
        // http://114.55.179.135:8901/2016110418/2016113090614221199562.jpg
        let {
            picArr,
            photo,
            nickname,
            title,
            content,
            isDZ,
            isSC,
            totalCommNum,
            totalLikeNum,
            totalReadTimes,
            publisher
        } = this.props.pData;
        let offsetX = -10; // just for pc demo
        if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
            offsetX = -26;
        }
        return (
            <div>
                <Card className="post-card" full>
                    <Card.Header title={nickname} thumb={photo} extra={< Button className = "small-btn" inline onClick = {
                        this.handleClick.bind(this, publisher)
                    } >+ 关注 < /Button>}/>
                    <Card.Body className="normal-post-body">
                        <div class="normal-post-top">
                            <span class="post-body-title">{title}</span>{content}</div>
                        <div class="normal-post-imgs">
                            {picArr && picArr.map((img, index) => {
                                return <img key={`pic${index}`} src={img} alt=""/>
                            })
}
                        </div>
                        <div class="post-body-bottom">
                            <div class="post-body-bottom-img-wrap"><img class="post-body-bottom-img" src={readIcon}/>100</div>
                            <div class="post-body-bottom-img-wrap"><img class="post-body-bottom-img" src={likeIcon}/>100</div>
                            <div class="post-body-bottom-img-wrap"><img class="post-body-bottom-img" src={commentIcon}/>100</div>
                            <div class="post-body-bottom-img-wrap fr" onClick={this.showActionSheet.bind(this)}>
                                <img class="post-body-bottom-img-more" src={moreIcon}/>
                            </div>
                        </div>
                        <div class="post-body-bottom-date">1小时前</div>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
