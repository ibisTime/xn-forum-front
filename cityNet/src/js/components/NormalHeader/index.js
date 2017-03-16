import React, {Component} from 'react';
import './index.scss';
const Util = require('../../util/util.js');
const backIcon = require('../../../images/返回@2x.png');
export default class NormalHeader extends Component {
    render(){
        return (
            <header class="normal-header"><img class="goback" onClick={Util.historyBack} src={backIcon} alt=""/>{this.props.title}</header>
        );
    }
}
