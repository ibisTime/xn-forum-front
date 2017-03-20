import React, {Component} from 'react';
import className from 'classnames';
import './index.scss';

const Util = require('../../../../util/util.js');

export default class AtUserListHeader extends Component {

    render(){
        return (
            <header class="at-userlist-header">
                <div onClick={this.props.handleUserClose} class="goback">关闭</div>联系人
            </header>
        );
    }
}
