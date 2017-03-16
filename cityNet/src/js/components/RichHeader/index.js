import React, {Component} from 'react';
import className from 'classnames';
import {Link} from 'react-router';
import './index.scss';
const serachIcon = require('../../../images/搜索@2x.png');
const forumIcon = require('../../../images/发帖@2x.png');
const Util = require('../../util/util');

export default class RichHeader extends Component {
    handleClick(e){
        e.preventDefault();
        Util.goPath('/search');
    }
    render() {
        const {activeNavIndex, pFixed} = this.props;
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
                <img class="left" src={serachIcon} alt="" onClick={this.handleClick.bind(this)}/>
                <div>
                    <Link to={`/rich`}><p class={class0}>有料</p></Link>
                    <Link to={`/block`}><p class={class1}>论坛</p></Link>
                </div>
                <img class="right" src={forumIcon} alt=""/>
            </header>
        )
    }
}
