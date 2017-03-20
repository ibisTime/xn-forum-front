import React, {Component} from 'react';
import {Link} from 'react-router';
import {Flex} from 'antd-mobile';
import './index.scss';

const Item = Flex.Item;

export default class CommentListItem extends Component {
    constructor() {
        super();
    }
    componentDidMount() {

    }
    render(){
        let {isLike} = this.props;
        return (
            <Flex className="b_e6_b comment-list-item" align="top">
                <div class="w50 c-list-img-wrap"><img src="http://114.55.179.135:8901/2016110418/2016113090614221199562.jpg"/></div>
                <div class="pl10 flex1 pt5">
                    <div class="wp100">
                        <div class="fs17 lh110">电饭锅</div>
                        <div class="fs13 t_b4 pt5">3月8日 13:54</div>
                    </div>
                    <div class=" bg_f5 p10 mt10 t_999" style={{"borderRadius": "4px"}}>
                        <a href="#" class="wp100 inline_block over-hide">
                            <div class="wp100 fs14 lh110 t_999">@电饭锅</div>
                            <div class="wp100 fs13 lh150 t_999">饭饭饭</div>
                        </a>
                    </div>
                    <div class="wp100 mt10">
                        <div class="wp100 fs15 lh150">{
                            isLike ? "赞了你的帖子" : "吃吃吃"
                        }</div>
                    </div>
                </div>
            </Flex>
        );
    }
}
