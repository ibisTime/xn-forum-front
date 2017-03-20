import React, {Component} from 'react';
import {
    WhiteSpace,
    List,
    TextareaItem,
    InputItem,
    Flex,
    Toast
} from 'antd-mobile';
import {createForm} from 'rc-form';
// import Qiniu from 'react-qiniu';
import ReactQiniu from '../../components/Qiniu';
import WritePostHeader from './WritePostHeader';
import ChoseBlock from './ChoseBlock';
import EmojiGrid from './EmojiGrid';
import AtUserList from './AtUserList';
import './index.scss';

const Item = Flex.Item;

class WritePost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            start: 0,
            end: 0,
            files: [],
            token: 'Dc0pMP8ImFm78-uk4iGsOPpB2-vHc64D07OsOQVi:Uj83ZUABt7fP0GZqU-pU3aH5_iI\u003d:eyJzY29wZSI6ImIyY29zcyIsImRlYWRsaW5lIjoxNDg5OTk0NzYwfQ\u003d\u003d',
            showEmoji: false,
            showUserList: false,
            title: "",
            showChoseBlock: false,
            blockCode: "",
            blockData: [
                {
                    "code": "BK2016112511032035926",
                    "name": "同城活动",
                    "pic": "http://114.55.179.135:8901/2016112511/20161133011032067720607.jpg"
                }, {
                    "code": "BK2016110419395495728",
                    "name": "招聘模块",
                    "pic": "http://114.55.179.135:8901/2016110419/20161130907395422730336.png"
                }, {
                    "code": "BK2016112510572655296",
                    "name": "二手咸鱼",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010572699046477.jpg"
                }, {
                    "code": "BK2016112510482091254",
                    "name": "吃货聚集地",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010482054851384.jpg"
                }, {
                    "code": "BK2016112510502571649",
                    "name": "情感故事",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010502597525634.jpg"
                }, {
                    "code": "BK2016112510520292436",
                    "name": "车友俱乐部",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010520239353311.jpg"
                }, {
                    "code": "BK2016112510532734965",
                    "name": "便名服务",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010532762201600.jpg"
                }, {
                    "code": "BK2016112510583786080",
                    "name": "出租板块",
                    "pic": "http://114.55.179.135:8901/2016112510/2016113301058373365888.jpg"
                }, {
                    "code": "BK2016112510543756118",
                    "name": "求助板块",
                    "pic": "http://114.55.179.135:8901/2016112510/20161133010543719075038.gif"
                }
            ]
        }
    }
    /*
     * 点击页面头部的选择板块
     */
    handleChoseClick() {
        let {showChoseBlock} = this.state;
        this.setState({
            showChoseBlock: !showChoseBlock
        });
    }
    /*
     * 隐藏选择板块列表
     */
    hideChoseBlock() {
        this.setState({showChoseBlock: false});
    }
    /*
     * 处理选择板块的事件
     * @param index    选择的板块在blockData中的数组下标
     */
    handleBlockClick(index) {
        const {blockData} = this.state;
        this.setState({blockCode: blockData[index].code, title: blockData[index].name, showChoseBlock: false});
    }
    /*
     * 发布帖子
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((error, value) => {
            console.log(error, value);
        });
        // this.props.form.getFieldsValue
        // this.props.handleOk()
    }
    /*
     * 处理图片上传前的事件
     * @param files    上传图片
     */
    onUpload(files) {
        // set onprogress function before uploading
        files.map(function(f) {
            f.onprogress = function(e) {
                console.log(e.percent);
            };
        });
    }
    /*
     * 处理添加图片事件，把新加入的图片拼到state的files数组里
     * @param new_files    新加入的图片
     */
    onDrop(new_files) {
        let {files} = this.state;
        files = [].concat.call(files, new_files);
        this.setState({files: files, showEmoji: false});
    }
    /*
     * 处理图片上传错误事件
     * @param error 错误信息
     */
    onUploadError(error) {
        console.log(error.body.error);
        Toast.info(error.body.error, 1.5);
    }
    /*
     * 处理图片关闭按钮的点击事件
     * @param index 点击的图片在数组中的下标
     */
    handleImgClose(index) {
        let {files} = this.state;
        [].splice.call(files, index, 1);
        this.setState({files: files});
    }
    /*
     * 处理输入框获取焦点事件,并隐藏表情
     */
    handleTextFocus() {
        this.setState({showEmoji: false});
    }
    /*
     * 处理textarea失去焦点事件,并保存最后一次的焦点位置
     */
    handleTextBlur(){
        const {getFieldInstance} = this.props.form;
        let _context = getFieldInstance("content");
        this.savePos(_context.refs.textarea);
    }
    /*
     * 点击表情图标，弹出表情轮播图
     */
    handleEmojiIconClick() {
        let {showEmoji} = this.state;
        this.setState({
            showEmoji: !showEmoji
        });
    }
    /*
     * 处理轮播图里的表情点击事件,并把表情加入textarea中
     * @param el    点击的表情
     * @param index 点击的表情在数组中的下标
     */
    handleEmojiClick(el, index) {
        this.setTextAreaValue(el.text);
    }
    /*
     * 关闭用户选择列表
     */
    handleUserClose(){
        this.setState({
            showUserList: false
        });
    }
    /*
     * 处理联系人列表点击事件,并把选中的用户名加入textarea中
     * @param username    选中的用户名
     */
    handleUserClick(username){
        this.setState({
            showUserList: false
        });
        this.setTextAreaValue("@" + username + " ");
    }
    /*
     * 在最后一次保存的textarea的光标处加入文本内容
     * @param text    文本内容
     */
    setTextAreaValue(text){
        const {setFieldsValue, getFieldValue} = this.props.form;
        let content = getFieldValue("content") || "";
        let {start, end} = this.state;
        let prev = content.substr(0, start),
            suffix = content.substr(end);
        setFieldsValue({
            "content": prev + text + suffix
        });
        if(start != end){
            end = start;
        }
        this.setState({
            start: start + text.length,
            end: end + text.length
        });
    }
    /*
     * 获取并保存textarea光标的位置
     * @param textBox    点击的表情
     */
    savePos(textBox) {
        let start, end;
        //如果是Firefox(1.5)的话，方法很简单
        if (typeof(textBox.selectionStart) == "number") {
            start = textBox.selectionStart;
            end = textBox.selectionEnd;
            end = textBox.//下面是IE(6.0)的方法，麻烦得很，还要计算上'/n'
            selectionEnd;
        } else if (document.selection) {
            var range = document.selection.createRange();
            if (range.parentElement().id == textBox.id) {
                // create a selection of the whole textarea
                var range_all = document.body.createTextRange();
                range_all.moveToElementText(textBox);
                //两个range，一个是已经选择的text(range)，一个是整个textarea(range_all)
                //range_all.compareEndPoints() 比较两个端点，如果range_all比range更往左(further to the left)，则                //返回小于0的值，则range_all往右移一点，直到两个range的start相同。
                // calculate selection start point by moving beginning of range_all to beginning of range
                for (start = 0; range_all.compareEndPoints("StartToStart", range) < 0; start++)
                    range_all.moveStart('character', 1);

                // get number of line breaks from textarea start to selection start and add them to start
                // 计算一下/n
                for (var i = 0; i <= start; i++) {
                    if (textBox.value.charAt(i) == '/n')
                        start++;
                    }
                // create a selection of the whole textarea
                var range_all = document.body.createTextRange();
                range_all.moveToElementText(textBox);
                // calculate selection end point by moving beginning of range_all to end of range
                for (end = 0; range_all.compareEndPoints('StartToEnd', range) < 0; end++)
                    range_all.moveStart('character', 1);

                // get number of line breaks from textarea start to selection end and add them to end
                for (var i = 0; i <= end; i++) {
                    if (textBox.value.charAt(i) == '/n')
                        end++;
                    }
                }
        }
        this.setState({
            start: start,
            end: end
        });
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;
        let {showEmoji, files, title, blockData, showChoseBlock, showUserList} = this.state;
        const QiNiuOpt = {
            onDrop: this.onDrop.bind(this),
            token: this.state.token,
            uploadUrl: "http://up-z2.qiniu.com",
            onUpload: this.onUpload.bind(this),
            onError: this.onUploadError.bind(this)
        }
        return (
            <div>
                <WritePostHeader title={title} handleChoseClick={this.handleChoseClick.bind(this)} handleSubmit={this.handleSubmit.bind(this)}/>
                <div style={{
                    height: "0.88rem"
                }}></div>
                <WhiteSpace size="sm"/>
                <div className="write-post-form">
                    <List className="pop-over-write-comment-content write-post-list">
                        <InputItem {...getFieldProps('title', { rules: [{required: true}] })} clear placeholder="标题" onFocus={this.handleTextFocus.bind(this)} autoFocus/> {getFieldError('title')
                            ? <span class="comment-error-tip">标题不能为空</span>
                            : null}
                    </List>
                    <List className="pop-over-write-comment-content write-post-no-bottom">
                        <TextareaItem
                            {...getFieldProps('content', { rules: [{required: true}] })}
                            rows={4}
                            count={100}
                            placeholder="评论内容"
                            onFocus={this.handleTextFocus.bind(this)}
                            onBlur={this.handleTextBlur.bind(this)}
                        /> {getFieldError('content')
                            ? <span class="comment-error-tip">评论不能为空</span>
                            : null}
                    </List>
                    <List className="pop-over-write-comment-content">
                        <Flex className="comment-flex">
                            <Item className="comment-flex-item">
                                <ReactQiniu {...QiNiuOpt}>
                                    <div class="photo-icon"></div>
                                </ReactQiniu>
                            </Item>
                            <Item onClick={()=>{this.setState({showUserList: true})}} className="comment-flex-item">
                                <div class="at-icon"></div>
                            </Item>
                            <Item className="comment-flex-item" onClick={this.handleEmojiIconClick.bind(this)}>
                                <div class="emoji-icon"></div>
                            </Item>
                        </Flex>
                    </List>
                    {showEmoji
                        ? <EmojiGrid handleEmojiClick={this.handleEmojiClick.bind(this)}/>
                        : ""}
                    {files.length
                        ? <Flex class="write-post-img-wrap" wrap="wrap">
                                {files.map((file, index) => (
                                    <div key={`index${index}`} class="write-post-img">
                                        <div class="write-post-img-div">
                                            <img src={file.preview}/>
                                            <i class="img-close" onClick={this.handleImgClose.bind(this, index)}></i>
                                        </div>
                                    </div>
                                ))}
                                <ReactQiniu className="write-post-img-upload" {...QiNiuOpt}>
                                    <div class="photo-add-icon"></div>
                                </ReactQiniu>
                            </Flex>
                        : ""}
                </div>
                {showChoseBlock
                    ? <ChoseBlock hideChoseBlock={this.hideChoseBlock.bind(this)} handleBlockClick={this.handleBlockClick.bind(this)} blockData={blockData}/>
                    : ""}
                {showUserList
                    ? <AtUserList handleUserClick={this.handleUserClick.bind(this)} handleUserClose={this.handleUserClose.bind(this)}/>
                    : ""}
            </div>
        )
    }
}
export default createForm()(WritePost);
