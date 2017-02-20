/**
 * 文字颜色下拉选择
 */
import React from 'react';
import Dropdown from '../Dropdown';
import { Icon } from 'react-fa';

import ColorPicker from '../ColorPicker';
import { COLORS } from '../../utils/constant';
export default class FontColorPicker extends React.Component {

    static propTypes = {
        defaultColor: React.PropTypes.string,
        colors: React.PropTypes.array,
        onChange: React.PropTypes.func,
        label: React.PropTypes.element
    };

    static defaultProps = {
        colors: COLORS,
        label: <Icon name="tint"/>,
        defaultColor: '#000000'
    };

    /**
     * 颜色发生改变
     * @param color
     */
    handleChange(color) {
        this.dropdown.close(); //关闭下拉菜单
        this.props.onChange && this.props.onChange(color);
    }

    render() {

        const { label, defaultColor, colors } = this.props;

        return (
            <Dropdown
                ref={(dropdown) => {this.dropdown = dropdown}}
                label={label}
                customMenu={
                    <ColorPicker
                        defaultColor={defaultColor}
                        colors={colors}
                        onChange={this.handleChange.bind(this)} />
                }
            />
        );

    }

}