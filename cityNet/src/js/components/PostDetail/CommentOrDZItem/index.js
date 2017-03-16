import React, {Component} from 'react';
import './index.scss';

export default class CommentOrDZItem extends Component {
    handleClick(index){
        this.props.handleChange(index);
    }
    render(){
        let {code, content, commer, nickname, photo} = this.props.itemData;

        return (
            <div class="post-comment-item">
                <span class="post-comment-item-title">ppap：</span>
                <div class="post-comment-item-cont">ppapppapppapppapppapppapppapppapppapppapppapppapppapppap</div>
            </div>
        );
    }
}
