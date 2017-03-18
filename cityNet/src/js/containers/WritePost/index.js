import React, {Component} from 'react';
import WritePostHeader from './WritePostHeader';
import {WhiteSpace, List, TextareaItem, InputItem} from 'antd-mobile';
import { createForm } from 'rc-form';
import { Upload, Icon, Modal } from 'antd';

import './index.scss';

class WritePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
            token: 'Dc0pMP8ImFm78-uk4iGsOPpB2-vHc64D07OsOQVi:hKEO21vcgX3rQSZut7EEAW9reXQ\u003d:eyJzY29wZSI6ImIyY29zcyIsImRlYWRsaW5lIjoxNDg5NjYwMDI3fQ\u003d\u003d'
        }
    }
    handleCancel (){
        this.setState({ previewVisible: false });
    }
    handlePreview (file){
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    handleChange ({ fileList }) {
        this.setState({ fileList });
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
        // this.props.form.getFieldsValue
        // this.props.handleOk()
    }

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const { previewVisible, previewImage, token, fileList } = this.state;
        const uploadButton = (
            <div>
                <Icon type="plus" />
            </div>
        );

        const uploadOpt = {
            action: "http://up-z2.qiniu.com/",
            listType: "picture-card",
            fileList: fileList,
            onPreview: this.handlePreview.bind(this),
            onChange: this.handleChange.bind(this),
            showUploadList: {
                showPreviewIcon: false,
                showRemoveIcon: false
            },
            data: {"token": token},
            multiple: true
        }

        return (
            <div>
                <WritePostHeader handleSubmit={this.handleSubmit.bind(this)}/>
                <div style={{height: "0.44rem"}}></div>
                <WhiteSpace size="sm" />
                <div className="write-post-form">
                    <List className="pop-over-write-comment-content write-post-list">
                        <InputItem
                            {...getFieldProps('title', {
                                rules: [{required: true}]
                            })}
                            clear
                            placeholder="标题"
                            autoFocus
                        />
                        {getFieldError('title') ? <span class="comment-error-tip">标题不能为空</span> : null}
                    </List>
                    <List className="pop-over-write-comment-content write-post-no-bottom">
                        <TextareaItem
                            {...getFieldProps('content', {
                              rules: [{required: true}]
                            })}
                            rows={4}
                            count={100}
                            placeholder="评论内容"
                        />
                        {getFieldError('content') ? <span class="comment-error-tip">评论不能为空</span> : null}
                    </List>
                    <div className="clearfix">
                        <Upload {...uploadOpt}>
                          {uploadButton}
                        </Upload>
                        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </div>
                </div>
            </div>
        )
    }
}
export default createForm()(WritePost);
