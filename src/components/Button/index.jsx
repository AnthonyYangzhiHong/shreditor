/**
 * 插件按钮
 */
import React from 'react';

import assign from 'lodash/assign';

export default class Button extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        size: React.PropTypes.oneOf(['small', 'primary', 'large']),
        color: React.PropTypes.oneOf(['primary', 'danger', 'accent']),
        disabled: React.PropTypes.bool,
        style: React.PropTypes.object,
    };

    static defaultProps = {
        size: 'small',
        color: undefined,
        disabled: false
    };

    handleMouseDown(e) {
        e.preventDefault();
        const { onMouseDown } = this.props;
        onMouseDown && onMouseDown(e);
    }

    handleClick(e) {
        e.preventDefault();
        const { onClick } = this.props;
        onClick && onClick(e);
    }

    getBoundingClientRect() {
        return this.button.getBoundingClientRect();
    }

    render() {

        const { size, children, color, disabled, style } = this.props;

        let className = "mui-btn";
        if (color) {
            className += " mui-btn--" + color;
        }

        if (size) {
            className += " mui-btn--" + size;
        }

        const customStyle = assign({
            padding: "0 10px",
            //border: "1px solid #9E9E9E",
            marginLeft: "2px"
        }, style);

        return (
            <button
                ref={(button) => {this.button = button}}
                className={className}
                style={customStyle}
                disabled={disabled}
                onMouseDown={this.handleMouseDown.bind(this)}
                onClick={this.handleClick.bind(this)}>
                {children}
            </button>
        );
    }

}