import React from 'react';

import CustomInlineStylePlugin from './CustomInlineStylePlugin';

import FontColorPicker from '../components/FontColorPicker';

import { Icon } from 'react-fa';

import Color from 'color';

export default class FontBackground extends CustomInlineStylePlugin {

    init() {
        this.pattern = 'FONT_BACKGROUND';
    }

    handleChange(backgroundColor) {
        this.change(backgroundColor);
    }

    render() {

        const color = this.state.current || '#fff';

        return (
            <FontColorPicker
                label={
                    <span style={{border: '#bdbdbd solid thin', background: color, color: Color(color).light() ? '#000' : '#fff'}}>
                        <Icon name="font"/>
                    </span>
                }
                onChange={this.handleChange.bind(this)}
                defaultColor={color}/>
        );
    }

}