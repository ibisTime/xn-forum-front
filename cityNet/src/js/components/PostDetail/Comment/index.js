import React, {Component} from 'react';
import {WingBlank, List, TextareaItem, Button} from 'antd-mobile';
import { createForm } from 'rc-form';

import './index.scss';

class Comment extends Component {
    constructor(){
        super();

    }
    componentWillMount(){

    }
    handleSubmit(){
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
        // this.props.form.getFieldsValue
        // this.props.handleOk()
    }

    render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <div class="pop-over-write-comment">
                <header>
                        <div class="pop-over-write-comment-header-cont">
                            <Button inline className="pop-over-write-comment-btn fl" onClick={this.props.handleCancel}>取消</Button>
                            <span>发布评论</span>
                            <Button inline className="pop-over-write-comment-btn fr" onClick={this.handleSubmit.bind(this)}>发布</Button>
                        </div>
                </header>
                <List className="pop-over-write-comment-content">
                    <WingBlank size="sm">
                        <TextareaItem
                            {...getFieldProps('count', {
                              rules: [{required: true}]
                            })}
                            rows={5}
                            count={100}
                            placeholder="评论内容"
                        />
                        {(errors = getFieldError('count')) ? <span class="comment-error-tip">评论不能为空</span> : null}

                    </WingBlank>
                </List>
            </div>
        )
    }
}
export default createForm()(Comment);
