import React, {Component} from 'react';
import {
    Flex,
    ActivityIndicator,
    SearchBar
} from 'antd-mobile';
import AtUserListHeader from './AtUserListHeader';
import './index.scss';

export default class AtUserList extends Component {
    constructor(){
        super();
        this.state = {
            searchValue: "",
            userList: [
                {
                    "userId": "U2016112420345628049",
                    "loginName": "CSW15958430512",
                    "nickname": "丫丫",
                    "kind": "f1",
                    "level": "2",
                    "mobile": "18857117053",
                    "status": "0",
                    "updater": "橙袋科技",
                    "updateDatetime": "Nov 24, 2016 9:22:43 PM",
                    "photo": "http://wx.qlogo.cn/mmopen/et9q9FvjBBriciawxDqwxJj20XFUDCgLM3skIRY7AdKRGFibMIqnAT0bleF2triceUNw1TWIRX18lVPo91Ilicz8mIA/0"
                }, {
                    "userId": "U2016110418121697887",
                    "loginName": "CSW15158068891",
                    "nickname": "小妮子",
                    "kind": "f1",
                    "level": "2",
                    "mobile": "15158068891",
                    "status": "0",
                    "updater": "U2016110418121697887",
                    "updateDatetime": "Nov 4, 2016 6:12:16 PM",
                    "remark": "前端个人用户",
                    "photo": "http://114.55.179.135:8901/2016110418/2016113090614221199562.jpg"
                }
            ]
        };
    }
    /*
     * 点击头部关闭按钮时，清空搜索框数据，并调用props传入的方法关闭列表
     */
    handleClose(){
        this.setState({
            searchValue: ""
        });
        this.props.handleUserClose();
    }
    /*
     * 用户点击回车提交时，更新state里的值，并筛选用户列表数据
     * @param value    当前输入框的数据
     */
    handleSubmit(value){
        this.setState({
            searchValue: value
        });
    }
    /*
     * 用户输入数据时，更新state里的值，并筛选用户列表数据
     * @param value    当前输入框的数据
     */
    handleChange(value){
        this.setState({
            searchValue: value
        });
    }
    /*
     * 用户选中某位关注人时，清空搜索框数据，并调用props传入的选中事件方法
     * @param value    当前选中的用户的username
     */
    handleUserClick(nickname){
        this.setState({
            searchValue: ""
        });
        this.props.handleUserClick(nickname);
    }
    render() {
        let {userList, searchValue} = this.state;
        return (
            <div class="at-user-search-wrap">
                <AtUserListHeader handleUserClose={this.handleClose.bind(this)}/>
                <div style={{"height": "0.88rem"}}></div>
                <SearchBar
                    placeholder="请输入搜索关键词"
                    onSubmit={this.handleSubmit.bind(this)}
                    onChange={this.handleChange.bind(this)}
                />
                <ul class="b_e6_t">
                    {userList.length
                        ? userList.map((user, index) => {
                            if(user.nickname.indexOf(searchValue) != -1)
                                return (
                                    <li onClick={this.handleUserClick.bind(this, user.nickname)} key={`index${index}`} class="wp100 pr bg_fff">
                                        <div class="follow-img plr15 w70 h50"><img class="wp100" src={user.photo}/></div>
                                        <div class="follow-txt h50 b_e6_b pl70 wp100">{user.nickname}</div>
                                    </li>
                                );
                            else
                                return "";
                        })
                        : "暂无联系人"}
                </ul>
            </div>
        )
    }
}
