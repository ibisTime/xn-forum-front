import React, {Component} from 'react';
import PostItem from '../PostItem';
import './index.scss';

export default class HeadLinePosts extends Component {
    render() {
        let {postData} = this.props;
        return (
            <div className="new-list">
                <ul>
                    {
                        postData.map((data, index) => (
                            <PostItem key={"post" + index} imgUrl={data.imgUrl} title={data.title} publishDatetime={data.publishDatetime} code={data.code} totalReadTimes={data.totalReadTimes}/>
                        ))
                    }
                </ul>
            </div>
        )
    }
}
