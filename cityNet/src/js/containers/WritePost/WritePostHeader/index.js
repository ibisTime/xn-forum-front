import React, {Component} from 'react';
import './index.scss';

const backIcon = require('../../../../images/返回@2x.png');
const locationIcon = require('../../../../images/定位选择@2x.png');
const Util = require('../../../util/util');

export default class WritePostHeader extends Component {
    render() {
        let {handleSubmit} = this.props;
        return (
            <header class="headerLineHeader">
                <img class="left" src={backIcon} alt="" onClick={Util.historyBack}/>
                <div><span>选择板块</span> <img src={locationIcon} alt="下拉"/></div>
                <div class="right-apply" onClick={handleSubmit}>发布</div>
            </header>
        )
    }
}
