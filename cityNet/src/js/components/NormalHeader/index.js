import React, {Component} from 'react';
import className from 'classnames';
import './index.scss';

const Util = require('../../util/util.js');
const backIcon = require('../../../images/返回@2x.png');

export default class NormalHeader extends Component {
    handleIconClick(e){
        e.preventDefault();
        const {handleClick} = this.props;
        if(handleClick)
            handleClick();
    }
    handleBack(e){
        e.preventDefault();
        const {goBack} = this.props;
        if(goBack)
            goBack();
        else
            Util.historyBack();
    }
    render(){
        let {hideBack, title, rightIcon} = this.props;
        let goBackClass = className({
            goback: true,
            hidden: hideBack
        });
        return (
            <header class="normal-header">
                <img class={goBackClass} onClick={this.handleBack.bind(this)} src={backIcon} alt=""/>{title}
                {
                    rightIcon ? <img src={rightIcon} class="head-right-icon" onClick={this.handleIconClick.bind(this)}/> : ""
                }
            </header>
        );
    }
}
