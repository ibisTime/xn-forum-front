import React from 'react'
import {Route, IndexRoute} from 'react-router'

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
const WritePost = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/WritePost').default)
    }, 'WritePost');
};
const User = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./containers/User').default)
    }, 'User');
};
const UserPostList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/UserPostList').default)
    }, 'UserPostList');
};
const FansOrAttention = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/FansOrAttention').default)
    }, 'FansOrAttention');
};
const UserSetting = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/UserSetting').default)
    }, 'UserSetting');
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

        <Route path="/write" getComponent={WritePost}/>

        <Route path="/search" getComponent={SearchUserAndPost}/>

        <Route path="/user" getComponent={User}/>
        <Route path="/user/post/list" getComponent={UserPostList}/>
        <Route path="/user/fansOrAttention/:type" getComponent={FansOrAttention}/>
        <Route path="/user/setting" getComponent={UserSetting}/>

        <Route path="*" getComponent={NotFoundPage}/>
    </div>
);
