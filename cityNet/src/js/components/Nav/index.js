import React, {Component} from 'react';
import NavLink from './NavLink';
import './index.css';

export default class Nav extends Component {
    render() {
        let activeIdx = this.props.activeIndex;
        let imgs = [
            require('../../../images/m-icon.png'),
            require('../../../images/m-icon.png'),
            require('../../../images/tab-bar-xiaomi.png'),
            require('../../../images/m-icon.png'),
            require('../../../images/m-icon.png')
        ];
        return (
            <div>
                <ul class="nav">
                    <NavLink key="nav0" pathUrl="/" icoUrl={imgs[0]} active={activeIdx == "0" ? true : false} linkName="头条"/>
                    <NavLink key="nav1" pathUrl="/rich" icoUrl={imgs[1]} active={activeIdx == "1" ? true : false} linkName="有料"/>
                    <NavLink key="nav2" pathUrl="/bee" icoUrl={imgs[2]} imgClass="bee" active={activeIdx == "2" ? true : false} linkName=""/>
                    <NavLink key="nav3" pathUrl="/video" icoUrl={imgs[3]} active={activeIdx == "3" ? true : false} linkName="视频"/>
                    <NavLink key="nav4" pathUrl="/mine" icoUrl={imgs[4]} active={activeIdx == "4" ? true : false} linkName="我的"/>
                </ul>
            </div>
        )
    }
}
