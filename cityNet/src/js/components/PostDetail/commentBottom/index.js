import React, {Component} from 'react';
import Comment from '../Comment';
import './index.scss';
const imgUrl = require("../../../../images/dshang.png");
export default class CommentBottom extends Component {
    constructor(){
        super();
        this.state = {
            showComment: 0
        };
    }
    handleInputClick(){
        // this.props.code
        this.setState({
            showComment: 1
        });
    }
    handleCancel(){
        this.setState({
            showComment: 0
        });
    }
    handleOk(){
        
    }
    handleImgClick(){

    }
    render(){
        let {showComment} = this.state;
        return (
            <div>
                <div class="post-comment-bottom">
                    <div class="post-comment-input" onClick={this.handleInputClick.bind(this)}>回个话鼓励下楼主</div>
                    <div class="post-comment-img-wrap">
                        <img src={imgUrl} onClick={this.handleImgClick.bind(this)} class="post-comment-img"/>
                    </div>
                </div>
                {
                    showComment ? <Comment handleCancel={this.handleCancel.bind(this)} handleOk={this.handleOk.bind(this)}/> : ""
                }
            </div>
        );
    }
}
