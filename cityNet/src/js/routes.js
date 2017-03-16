import React from 'react'
import {Route, IndexRoute} from 'react-router'

// import PostDetail from './components/PostDetail/post_detail';
const HeadLine = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/HeadLine/index').default)
    }, 'HeadLine');
};
const Rich = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/Rich/index').default)
    }, 'Rich');
};
const PostDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/PostDetail').default)
    }, 'PostDetail');
};
const Forum = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/Forum').default)
    }, 'Forum');
};
const ForumBlock = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/ForumBlock').default)
    }, 'ForumBlock');
};
const NotFoundPage = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/404').default)
    }, 'NotFoundPage');
};
const SearchUserAndPost = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/SearchUserAndPost').default)
    }, 'SearchUserAndPost');
};

export default(
    <div>
        <Route path="/" getComponent={HeadLine}></Route>
        <Route path="/rich">
            <IndexRoute getComponent={Rich}/>
        </Route>
        <Route path="/block" getComponent={Forum}/>
        <Route path="/post/:code" getComponent={PostDetail}/>
        <Route path="/forum/:code">
            <IndexRoute getComponent={ForumBlock}/>
        </Route>
        <Route path="/search" getComponent={SearchUserAndPost}/>
        <Route path="/user" getComponent={HeadLine}/>
        <Route path="*" getComponent={NotFoundPage}/>
    </div>
);
