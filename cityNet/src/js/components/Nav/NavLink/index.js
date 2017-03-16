import React, {Component} from 'react';
import {Link} from 'react-router';
import './index.css';

export default class NavLink extends Component {
    render() {
        const {pathUrl, active, icoUrl, linkName, imgClass} = this.props;
        let linkClass = 'nav-root';
        linkClass = linkClass + (active ? " active" : "");
        return (
            <Link to={pathUrl} className={linkClass}>
                <div>
                    {/* icoUrl */}
                    <img src={icoUrl} className={imgClass} alt="linkName"/>
                    <span>{linkName}</span>
                </div>
            </Link>
        )
    }
}
