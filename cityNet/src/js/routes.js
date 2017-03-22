import React from 'react';
import {Route, IndexRoute} from 'react-router';
import App from './containers/App';

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
const UserReward = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/UserReward').default)
    }, 'UserReward');
};
const DraftBox = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/DraftBox').default)
    }, 'DraftBox');
};
const MyCommodityList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/MyCommodityList').default)
    }, 'MyCommodityList');
};
const CommodityList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/CommodityList').default)
    }, 'CommodityList');
};
const CommodityDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/CommodityList/CommodityDetail').default)
    }, 'CommodityDetail');
};
const MyCollection = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/MyCollection').default)
    }, 'MyCollection');
};
const Message = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/Message').default)
    }, 'Message');
};
const CommentList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/CommentList').default)
    }, 'CommentList');
};
const LikeList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/LikeList').default)
    }, 'LikeList');
};
const MentionMyPostList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/MentionMyPostList').default)
    }, 'MentionMyPostList');
};
const AttentionUserList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/Message/AttentionUserList').default)
    }, 'AttentionUserList');
};
const Login = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/Login').default)
    }, 'Login');
};
const Register = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/User/Register').default)
    }, 'Register');
};
export default(
    <div>
        <Route path="/" component={App}>
            <IndexRoute getComponent={HeadLine}/>

            <Route path="rich">
                <IndexRoute getComponent={Rich}/>
            </Route>
            <Route path="block" getComponent={Forum}/>
            <Route path="post/:code" getComponent={PostDetail}/>
            <Route path="forum/:code">
                <IndexRoute getComponent={ForumBlock}/>
            </Route>

            <Route path="write" getComponent={WritePost}/>

            <Route path="search" getComponent={SearchUserAndPost}/>

            <Route path="user">
                <IndexRoute getComponent={User}/>
                <Route path="post/list" getComponent={UserPostList}/>
                <Route path="fansOrAttention/:type" getComponent={FansOrAttention}/>
                <Route path="setting" getComponent={UserSetting}/>
                <Route path="reward" getComponent={UserReward}/>
                <Route path="draft" getComponent={DraftBox}/>
                <Route path="commodity/list" getComponent={MyCommodityList}/>
                <Route path="collection" getComponent={MyCollection}/>
                <Route path="message" getComponent={Message}/>
                <Route path="comment/list/:type" getComponent={CommentList}/>
                <Route path="like/list" getComponent={LikeList}/>
                <Route path="mention/list" getComponent={MentionMyPostList}/>
                <Route path="attention/list" getComponent={AttentionUserList}/>
                <Route path="login" getComponent={Login}/>
                <Route path="register" getComponent={Register}/>
            </Route>
            <Route path="mall">
                <Route path="list" getComponent={CommodityList}/>
                <Route path="detail/:code" getComponent={CommodityDetail}/>
            </Route>

            <Route path="*" getComponent={NotFoundPage}/>
        </Route>
    </div>
);
