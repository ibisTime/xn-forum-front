import React, {Component} from 'react';
import './index.scss';

const backIcon = require('../../../../images/返回@2x.png');
const locationIcon = require('../../../../images/定位选择@2x.png');
const Util = require('../../../util/util');

export default class WritePostHeader extends Component {
    render() {
        let {handleSubmit, title, handleChoseClick} = this.props;
        return (
            <header class="headerLineHeader">
                <img class="goback" src={backIcon} alt="" onClick={Util.historyBack}/>
                <div class="inline_block" onClick={this.props.handleChoseClick}><span>{title || "选择板块"}</span> <img src={locationIcon} alt="下拉"/></div>
                <div class="right-apply" onClick={handleSubmit}>发布</div>
            </header>
        )
    }
}
