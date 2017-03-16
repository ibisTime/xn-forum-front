import React, {Component} from 'react';
import './index.scss';

const serachIcon = require('../../../images/搜索@2x.png');
const locationIcon = require('../../../images/定位选择@2x.png');
const forumIcon = require('../../../images/发帖@2x.png');
const Util = require('../../util/util');

export default class HeadLineHeader extends Component {
    handleClick(e){
        e.preventDefault();
        Util.goPath('/search');
    }
    render() {
        const {title} = this.props;
        return (
            <header class="headerLineHeader">
                <img class="left" src={serachIcon} alt="" onClick={this.handleClick.bind(this)}/>
                <div><span>{title}</span> <img src={locationIcon} alt="下拉"/></div>
                <img class="right" src={forumIcon} alt=""/>
            </header>
        )
    }
}
