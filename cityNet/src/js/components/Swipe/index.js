import React, {Component} from 'react'
import {Carousel} from 'antd-mobile';
import {Link} from 'react-router';
import './index.scss';

export default class Swipe extends Component {
    isOutUrl(url) {
        if (/^(?:http:\/\/)|(?:https:\/\/)/.test(url)) {
            return true;
        } else {
            return false;
        }
    }
    getSwiperItem(item, key="") {
        return (item.url
            ? this.isOutUrl(item.url)
                ? <a href={item.url} key={key}>
                        <img src={item.pic} className="img-responsive"/>
                        <div class="swipe-item-bottom">{item.name}</div>
                    </a>
                : <Link to={item.url} key={key}>
                        <img src={item.pic} className="img-responsive"/>
                        <div class="swipe-item-bottom">{item.name}</div>
                    </Link>
            : <div key={key}>
                <img src={item.pic} className="img-responsive"/>
                <div class="swipe-item-bottom">{item.name}</div>
            </div>)
    }
    render() {
        const {data} = this.props;
        /*如果接收到一张图片就单纯展示，如果是多张，就用Carousel组件展示*/
        let list;
        if (data.length === 1) {
            list = this.getSwiperItem(data[0]);
        } else {
            list = <Carousel dots={false}>
                {data.map((item, index) => (this.getSwiperItem(item, `index${index}`)))}
            </Carousel>
        }
        return (
            <div>
                {list}
            </div>
        )
    }
}
