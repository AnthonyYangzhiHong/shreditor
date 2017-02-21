import React from 'react';

import CustomInlineStylePlugin from '../CustomInlineStylePlugin';

import FontColorPicker from '../../components/FontColorPicker';

import { Icon } from 'react-fa';

import Color from 'color';

import './style.css';

export default class FontBackground extends CustomInlineStylePlugin {

    init() {
        this.pattern = 'FONT_BACKGROUND';
    }

    handleChange(backgroundColor) {
        this.change(backgroundColor);
    }

    render() {

        const color = this.state.current || '#FFFFFF';

        const labelStyle = {
            borderColor: '#bdbdbd',
            background: color,
            color: Color(color).light() ? "#000" : "#fff"
        };

        return (
            <FontColorPicker
                label={
                    <div className="background-color-picker-label" style={labelStyle}>
                        <Icon name="font"/>
                    </div>
                }
                onChange={this.handleChange.bind(this)}
                defaultColor={color}/>
        );
    }

}