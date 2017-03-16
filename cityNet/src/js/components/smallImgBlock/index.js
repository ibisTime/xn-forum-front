import React, {Component} from 'react'
import './index.css';

export default class SmallImgBlock extends Component {
    constructor() {
        super();
    }

    render() {
        let {imgName, imgUrl, pathUrl} = this.props;
        <li><Link to={pathUrl}><div><img src={imgUrl} alt={imgName}/></div><p>{imgName}</p></Link></li>
    }
}
