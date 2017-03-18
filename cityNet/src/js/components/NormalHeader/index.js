import React, {Component} from 'react';
import className from 'classnames';
import './index.scss';
const Util = require('../../util/util.js');
const backIcon = require('../../../images/返回@2x.png');
export default class NormalHeader extends Component {
    render(){
        let {hideBack, title} = this.props;
        let goBackClass = className({
            goback: true,
            hidden: hideBack
        });
        return (
            <header class="normal-header">
                <img class={goBackClass} onClick={Util.historyBack} src={backIcon} alt=""/>{title}
            </header>
        );
    }
}
