import React, {Component} from 'react'
import {Link} from 'react-router'
import './index.css'

export default class MineHeader extends Component {
    render() {
        return (
            <header className="mineHeader">{this.props.title}</header>
        )
    }
}
