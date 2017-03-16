import React, {Component} from 'react';
import './index.css';
import SmallImgBlock from './SmallImgBlock';

export default class SmallImgBlocks extends Component {
    constructor() {
        super();
    }

    render() {
        let {imgsData} = this.props;

        return (
            <div className="headerLine-nav-footer">
                <ul>
                    {
                        imgsData.map((imgData, index) => (
                            <SmallImgBlock key={"small"+index} pathUrl={imgData.pathUrl} imgUrl={imgData.imgUrl} imgName={imgData.imgName}/>
                        ))
                    }
                </ul>
            </div>
        );
    }
}
