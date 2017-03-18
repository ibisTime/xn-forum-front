import React, {Component} from 'react';
import {Link} from 'react-router';
import './index.scss';

export default class SearchUserBodyItem extends Component {

    render(){
        let {uData} = this.props;
        return (
                <li>
                    <img src={uData.photo} alt=""/>
                    <p class="userName">{uData.nickname}</p>
                    <p class="userFansNum">粉丝：{uData.totalFansNum}</p>
                </li>
        );
    }
}
