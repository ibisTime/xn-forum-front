import React, {Component} from 'react';
import {Link} from 'react-router';
import Tloader from 'react-touch-loader';
import {ActivityIndicator, Button} from 'antd-mobile';
import './index.scss';

export default class CommodityDetail extends Component {

    render() {
        let {code} = this.props.params;
        return (
            <div>
                <div class="wp100 over-hide fs0"><img class="wp100" src="http://114.55.179.135:8901/2017022816/2017025904073755448081.jpg"/></div>
                <div class="wp100 mt10 bg_fff plr10 ptb10 border-box">
        			<div class="wp100 fs16 lh150">德国黑胶晴雨两用小黑伞 雨伞折叠三折伞 男女防晒防紫外线太阳伞</div>
        		</div>
                <div class="wp100 plr10 mt10 ptb10 fs14 bg_fff lh180 border-box t_999"><span class="t_red">提示：</span>兑换的物品需要您自行提取，兑换成功后会提示您收货地址。您也可以去个人中心 我的物品栏 进行查看。</div>
                <div class="wp100 mt10"></div>
                <div class="commodityDetailBottom">
                    <span class="t_999">价格：</span><span class="t_red">33赏金</span><Button inline type="small" className="commodityDetailBuy">立即兑换</Button>
                </div>
            </div>
        );
    }
}
