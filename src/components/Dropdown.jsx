import React from 'react';
import MDropdown from 'muicss/lib/react/dropdown';
import MDropdownItem from 'muicss/lib/react/dropdown-item';
import Caret from 'muicss/lib/react/caret';

import isString from 'lodash/isString';

export default class Dropdown extends React.Component {

    static propTypes = {
        onSelect: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        size: React.PropTypes.string,
        options: React.PropTypes.array
    };

    static defaultProps = {
        size: 'small'
    };

    handleMouseDown(e) {
        e.preventDefault();
        this.props.onMouseDown && this.props.onMouseDown(e);
    }

    render() {

        const { size, children, onSelect, options } = this.props;

        let label = children;

        if (isString(children)) {
            label = (
                <span>{label} <Caret/></span>
            );
        }

        return (
            <MDropdown size={size} onMouseDown={this.handleMouseDown.bind(this)} onSelect={onSelect} label={label}>
                {options.map(option =>
                    <MDropdownItem key={option.value} value={option.value}>{option.label || option.value}</MDropdownItem>
                )}
            </MDropdown>
        );
    }

}