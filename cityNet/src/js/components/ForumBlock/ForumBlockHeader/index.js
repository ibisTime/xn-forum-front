import React, {Component} from 'react';
import {ActivityIndicator} from 'antd-mobile';
import Tloader from 'react-touch-loader';
import './index.scss';

const backIcon = require('../../../../images/返回@2x.png');
const searchIcon = require('../../../../images/搜索@2x.png');
const wirteIcon = require('../../../../images/发帖@2x.png');
const Util = require('../../../util/util');

export default class ForumBlockHeader extends Component {

    render(){
        return (
            <header class="modellistHeader">
                <img class="goback" onClick={Util.historyBack} src={backIcon} alt=""/>
                <img class="search" src={searchIcon} alt=""/>
                <img class="write" src={wirteIcon} alt=""/>
                {this.props.title}
            </header>
        );
    }
}
