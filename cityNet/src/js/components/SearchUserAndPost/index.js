import React, {Component} from 'react';
import SearchHeader from './SearchHeader';
import SearchBody from './SearchBody';

export default class SearchUserAndPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            activeIndex: 0
        };
    }
    componentWillMount(){
        // ajax
    }

    handleNavChange(index){
        this.setState({
            activeIndex: index
        });
    }

    render(){
        let {activeIndex} = this.state;
        return (
            <div>
                <SearchHeader pFixed={true} handleNavChange={this.handleNavChange.bind(this)}/>
                <div>
                    <div style={{height: "0.44rem"}}></div>
                    {
                        <div>
                            <div style={{display: activeIndex == 0 ? "block" : "none"}}>
                                <SearchBody searchType={0}/>
                            </div>
                            <div style={{display: activeIndex == 1 ? "block" : "none"}}>
                                <SearchBody searchType={1}/>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}
