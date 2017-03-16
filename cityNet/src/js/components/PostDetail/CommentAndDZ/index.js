import React, {Component} from 'react';
import className from 'classnames';
import CommentOrDZItem from '../CommentOrDZItem';
import './index.scss';

export default class CommentAndDZ extends Component {
    handleClick(index){
        this.props.handleChange(index);
    }
    render(){
        let {commentList, likeList} = this.props.pData,
            {code, activeNavIndex} = this.props;
        let tabInkBarClass = className({
            'am-tabs-ink-bar': true,
            'am-tabs-bar-left': activeNavIndex == "0",
            'am-tabs-bar-right': activeNavIndex == "1"
        });
        let tabBarClass1 = className({
            "am-tabs-tab-active": activeNavIndex == "0",
            "am-tabs-tab": true
        });
        let tabBarClass2 = className({
            "am-tabs-tab-active": activeNavIndex == "1",
            "am-tabs-tab": true
        });
        let tabContClass1 = className({
            "post-tabpane-active": activeNavIndex == "0",
            "post-tabpane": true
        });
        let tabContClass2 = className({
            "post-tabpane-active": activeNavIndex == "1",
            "post-tabpane": true
        });
        return (
            <div class="am-tabs am-tabs-top post-detail-bottom-tabs">
                <div role="tablist" class="am-tabs-bar">
                    <div class={tabInkBarClass}></div>
                    <div className={tabBarClass1} onClick={this.handleClick.bind(this, 0)}>评价</div>
                    <div className={tabBarClass2} onClick={this.handleClick.bind(this, 1)}>点赞</div>
                </div>
                <div class="post-tabs-content">
                    <div className={tabContClass1}>
                        {
                            commentList && commentList.map((item, index) => (
                                <CommentOrDZItem key={`comment${index}`} itemData={item} />
                            ))
                        }
                    </div>
                    <div className={tabContClass2}>
                        {
                            likeList && likeList.map((item, index) => (
                                <CommentOrDZItem key={`dz${index}`} itemData={item} />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}
CommentAndDZ.PropTypes = {
    activeNavIndex: React.PropTypes.string
}
