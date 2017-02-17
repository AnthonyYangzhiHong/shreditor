/**
 * 插件按钮
 */
import React from 'react';

import MButton from 'muicss/lib/react/button';

export default class Button extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        size: React.PropTypes.oneOf(['small', 'primary', 'large']),
        disabled: React.PropTypes.bool
    };

    static defaultProps = {
        size: 'small',
        disabled: false
    };

    handleMouseDown(e) {
        e.preventDefault();
        this.props.onMouseDown && this.props.onMouseDown(e);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onClick && this.props.onClick(e);
    }

    render() {

        const { size, children, color, disabled } = this.props;

        return (
            <MButton
                color={color}
                size={size}
                disabled={disabled}
                onMouseDown={this.handleMouseDown.bind(this)}
                onClick={this.handleClick.bind(this)}>
                {children}
            </MButton>
        );
    }

}