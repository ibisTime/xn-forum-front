import React, {Component} from 'react';
import className from 'classnames';
import {Link} from 'react-router';
import './index.scss';

const Util = require('../../../../util/util');
const backIcon = require('../../../../../images/返回@2x.png');

export default class CommentListHeader extends Component {
    goBack(){
        Util.goPath('/user/message');
    }
    render() {
        const {activeNavIndex} = this.props;

        let class0 = className({
            active: activeNavIndex == 1
        });
        let class1 = className({
            active: activeNavIndex == 2
        });

        return (
            <header class="commentListHeader">
                <img class="goback" onClick={this.goBack.bind(this)} src={backIcon} alt=""/>
                <div>
                    <Link to={`/user/comment/list/1`}><p class={class0}>发出的</p></Link>
                    <Link to={`/user/comment/list/2`}><p class={class1}>收到的</p></Link>
                </div>
            </header>
        )
    }
}
