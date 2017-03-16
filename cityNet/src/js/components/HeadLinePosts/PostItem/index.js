import React, {Component} from 'react';
import {FormatDate} from '../../FormatDate';
const readIcon = require('../../../images/浏览数@2x.png');
export default class PostItem extends Component {
    render() {
        let {imgUrl, title, publishDatetime, code, totalReadTimes} = this.props;
        return (
            <li>
                <Link to={`/rich/detail/${code}`}>
                    <div className="new-listPic"><img src={imgUrl} alt=""/></div>
                    <p className="new-listTopic">{title}</p>
                        <p className="new-listData"><FormatDate date={publishDatetime} format="MM月dd日 hh:mm"/></p>
                    <div className="new-listSee"><img src={readIcon} alt="阅读"/><span>{totalReadTimes}</span></div>
                </Link>
            </li>
        )
    }
}
