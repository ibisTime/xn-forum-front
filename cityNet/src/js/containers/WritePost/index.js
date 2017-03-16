import React, {Component} from 'react';
import {NormalHeader} from '../../components';

import './index.css';

export default class WritePost extends Component {
    constructor() {
        super();
        this.state = {

        }
    }
    componentWillMount() {
    }
    componentDidMount() {

    }

    render() {

        const loadingEl = (
            <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
                <ActivityIndicator size="small" />
            </div>
        );
        return (
            <div>

                <div>
                    {
                        firstLoad
                        ? loadingEl
                        : (
                            <Tloader initializing={initializing} onRefresh={this.handleRefresh.bind(this)} hasMore={hasMore} onLoadMore={this.handleLoadMore.bind(this)} autoLoadMore={autoLoadMore} className="tloader headline">
                                <div class="rich_list">
                                    <ul>{postItems}</ul>
                                </div>
                            </Tloader>
                        )
                    }
                </div>
                <Nav activeIndex={1}/>
            </div>
        )
    }
}
