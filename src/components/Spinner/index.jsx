import React from 'react';

import './style.css';

import { Icon } from 'react-fa';

export default class Spinner extends React.Component {

    static propTypes = {
        size: React.PropTypes.string,   //大小
        color: React.PropTypes.string,  //颜色
    };

    static defaultProps = {
        size: "40px",
        color: "#03A9F4"
    };

    render() {

        const { size, color } = this.props;

        const style = {
            width: "100%",
            height: size,
            lineHeight: size,
            fontSize: size,
            color: color
        };

        return (
            <div className="spinner" style={style}>
                <Icon name="spinner" />
            </div>
        );

    }

}