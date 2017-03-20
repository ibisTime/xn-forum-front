import React, {Component} from 'react';
export default class App extends Component {
    componentWillMount() {
        console.log("appwill");
    }
    componentDidMount() {
        console.log("appdid");
    }
    render() {
        const {children} = this.props;
        return children
    }
}
let Ajax = {
    globalInfo: {
        arr: [1,2]
    }
};
export {Ajax};
