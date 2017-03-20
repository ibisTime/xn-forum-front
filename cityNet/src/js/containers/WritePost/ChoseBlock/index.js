import React, {Component} from 'react';
import {WhiteSpace, Flex} from 'antd-mobile';
import './index.scss';

export default class ChoseBlock extends Component {
    handleBlockClick(index, e){
        e.preventDefault();
        this.props.handleBlockClick(index);
    }
    render() {
        const {blockData} = this.props;
        return (
            <div class="chose-block">
                <div style={{height: "0.88rem"}}></div>
                <WhiteSpace size="sm" />
                <Flex wrap="wrap" align="start">
                    {
                        blockData.length && blockData.map((data, index) => (
                            <div class="chose-block-item" key={`index${index}`} onClick={this.handleBlockClick.bind(this, index)}>
                                <img src={data.pic}/>
                                <div>{data.name}</div>
                            </div>
                        ))
                    }
                </Flex>
                <div onClick={this.props.hideChoseBlock} class="close-chose-block"><div></div></div>
                <div class="chose-block-mask"></div>
            </div>
        )
    }
}
