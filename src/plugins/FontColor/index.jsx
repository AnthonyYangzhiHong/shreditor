import React from 'react';

import CustomInlineStylePlugin from '../CustomInlineStylePlugin';

import FontColorPicker from '../../components/FontColorPicker';

import { Icon } from 'react-fa';

import './style.css';

export default class FontColor extends CustomInlineStylePlugin {

    init() {
        this.pattern = 'FONT_COLOR';
    }

    handleChange(fontColor) {
        this.change(fontColor);
    }

    render() {

        const color = this.state.current || '#000000';

        const labelStyle = {
            color: '#000',
            borderColor: color
        };

        return (
            <FontColorPicker
                label={
                    <div className="font-color-picker-label" style={labelStyle}>
                        <Icon name="font"/>
                    </div>
                }
                onChange={this.handleChange.bind(this)}
                defaultColor={color}/>
        );
    }

}