import React, {Component} from 'react';
import {Link} from 'react-router';
import Tloader from 'react-touch-loader';
import {ActivityIndicator} from 'antd-mobile';
import './index.scss';

export default class CommodityItem extends Component {

    render() {
        return (
            <li class="plr5 wp50 mtb5 fl border-box">
                <Link to="/mall/detail/123456" class="wp100 inline_block over-hide">
                    <div class="wp100 h130 over-hide border-box"><img class="wp100" src="http://114.55.179.135:8901/2017022810/2017025910574069055453.jpg"/></div>
                    <div class="wp100 p10 commodity-title t_es">小黑伞</div>
                    <div class="wp100 commodity-cont t_es">价格：<span class="commodity-price">24赏金</span></div>
                </Link>
            </li>
        );
    }
}
