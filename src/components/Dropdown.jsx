import React from 'react';
import MDropdown from 'muicss/lib/react/dropdown';
import MDropdownItem from 'muicss/lib/react/dropdown-item';

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

        return (
            <MDropdown size={size} onMouseDown={this.handleMouseDown.bind(this)} onSelect={onSelect} label={children}>
                {options.map(option =>
                    <MDropdownItem key={option.value} value={option.value}>{option.label || option.value}</MDropdownItem>
                )}
            </MDropdown>
        );
    }

}