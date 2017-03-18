import React, {Component} from 'react';
import {Link} from 'react-router';
import {FormatDate} from '../../components';
import className from 'classnames';
import './index.scss';

const commentIcon = require('../../../images/评论－无边框@2x.png');
const likeIcon = require('../../../images/点赞无边框@2x.png');
export default class NormalPostItem extends Component {
    render() {
        // "imgs/帖子压缩图@2x.png"
        let {photo, nickname, publishDatetime,
            category, title, content, picArr,
            totalCommNum, totalLikeNum, likeList,
            commentList, code} = this.props.pData;
        let {showComment} = this.props;

        let commentListDOM = showComment && commentList
            ? (
                <div class="commontDetail">
                    <div class="clickBest">
                        <div>
                            <img src={likeIcon} alt=""/>
                            <span class="comment-total-like">{totalLikeNum}</span>
                            <span class="names">{
                                likeList && likeList.map((like, index) => (
                                    <span key={`index${index}`}>{like.nickname}</span>
                                ))
                            }</span>
                        </div>
                    </div>
                    <div class="comment-list">
                        {
                            commentList.map((comment, index) => (
                                <div key={`comment${index}`}><span class="name">{comment.nickname}：</span><span class="comment-item-cont">{comment.content}</span></div>
                            ))
                        }
                        {
                            commentList.length > 5 ? <div class="watchAll">查看全部评论回复>></div> : ""
                        }
                    </div>
                </div>
            )
            : "";
        return (

                <li>
                    <Link to={`/post/${code}`}>
                        <div class="rich-listPic"><img src={photo} alt=""/></div>
                        <div class="rich-wrap">
                            <p class="rich-listTopic t-3dot">{nickname}</p>
                            <p class="rich-listData"><FormatDate date={publishDatetime} format="MM月dd日 hh:mm"/></p>
                            <div class="rich-listFrom"><span class="rich-come-title">来自</span>&nbsp;<span class="rich-come-cont">{category}</span></div>
                        </div>
                        <div class="rich-list-content">
                            <p class="rich-list-title">{title}</p>
                            <p>{
                                content.substr(0, 100)
                            }</p>
                            {
                                content.length > 100 ? <span class="watchAll">查看全文</span> : ""
                            }
                            <div class="rich-list-img">
                                {
                                    picArr && picArr.map((img, index) => {
                                        return <img key={`pic${index}`} class={
                                            className({
                                                'plr005rem': (index%3 == 1) ? true : false
                                            })
                                        } src={img} alt=""/>
                                    })
                                }
                            </div>
                            <div class="ionPic">
                                <div><img src={commentIcon} alt=""/><span>{totalCommNum}</span></div>
                                <div><img src={likeIcon} alt=""/><span>{totalLikeNum}</span></div>
                            </div>
                            {commentListDOM}
                        </div>
                    </Link>
                </li>
        );
    }
}
