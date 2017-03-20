import React, {Component} from 'react';
import {Link} from 'react-router';
import {ActivityIndicator} from 'antd-mobile';
import Tloader from 'react-touch-loader';
import CommentListHeader from './CommentListHeader';
import CommentListItem from './CommentListItem';
import './index.scss';

const loadingEl = (
    <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="small" />
    </div>
);

export default class CommentList extends Component {
    constructor() {
        super();
        this.state = {
            limit: 10,
            start: 1,
            hasMore: 1,
            initializing: 2,
            refreshedAt: Date.now(),
            firstLoad: 1
        }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                firstLoad: 0
            });
        }, 1e3);
    }
    handleLoadMore(resolve) {
        setTimeout(() => {
            resolve();
        }, 2e3);
    }
    handleRefresh(resolve) {
        setTimeout(() => {
            resolve();
        }, 2e3);
    }

    render(){
        let {hasMore, initializing, refreshedAt, firstLoad} = this.state;
        let {type} = this.props.params;
        return (
            <div>
                <CommentListHeader activeNavIndex={type}/>
                <div>
                    {
                        firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={true} className="tloader headline">
                                <div class="wp100">
                                    <CommentListItem />
                                    <CommentListItem />
                                </div>
                            </Tloader>
                        )
                    }
                </div>
            </div>
        );
    }
}
