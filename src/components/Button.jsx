/**
 * 插件按钮
 */
import React from 'react';

import MButton from 'muicss/lib/react/button';

export default class Button extends React.Component {

    static propTypes = {
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        size: React.PropTypes.oneOf(['small', 'primary', 'large'])
    };

    static defaultProps = {
        size: 'small'
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

        const { size, children, color } = this.props;

        return (
            <MButton color={color} size={size} onMouseDown={this.handleMouseDown.bind(this)} onClick={this.handleClick.bind(this)}>
                {children}
            </MButton>
        );
    }

}