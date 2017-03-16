import React, {Component} from 'react';
import className from 'classnames';
import {Link} from 'react-router';
import './index.scss';

const backIcon = require('../../../../images/返回@2x.png');
const Util = require('../../../util/util');

export default class SearchHeader extends Component {
    constructor(){
        super();
        this.state = {
            activeNavIndex: 0
        }
    }
    handleClick(index){
        this.setState({
            activeNavIndex: index
        });
        this.props.handleNavChange(index);
    }
    render() {
        const {pFixed} = this.props;
        const {activeNavIndex} = this.state;
        let class0 = className({
            active: activeNavIndex == 0
        });
        let class1 = className({
            forum: true,
            active: activeNavIndex == 1
        });
        let headerClass = className({
            richHeader: true,
            "p-fixed": pFixed
        });
        return (
            <header class={headerClass}>
                <div>
                    <img class="goback" onClick={Util.historyBack} src={backIcon} alt=""/>
                    <p class={class0} onClick={this.handleClick.bind(this, 0)}>用户</p>
                    <p class={class1} onClick={this.handleClick.bind(this, 1)}>帖子</p>
                </div>
            </header>
        )
    }
}
