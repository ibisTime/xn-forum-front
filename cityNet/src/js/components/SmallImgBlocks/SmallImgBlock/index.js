import React, {Component} from 'react'
import {Link} from 'react-router';

export default class SmallImgBlock extends Component {
    constructor() {
        super();
    }

    render() {
        let {imgName, imgUrl, pathUrl} = this.props;
        return (
            <li><Link to={pathUrl}><div><img src={imgUrl} alt={imgName}/></div><p>{imgName}</p></Link></li>
        );
    }
}
