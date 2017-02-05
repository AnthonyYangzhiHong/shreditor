import React from 'react';

import CustomInlineStylePlugin from './CustomInlineStylePlugin';

import FontColorPicker from '../components/FontColorPicker';

import { Icon } from 'react-fa';

export default class FontColor extends CustomInlineStylePlugin {

    init() {
        this.pattern = 'FONT_COLOR';
    }

    handleChange(fontColor) {
        this.change(fontColor);
    }

    render() {

        const color = this.state.current || '#000';

        return (
            <FontColorPicker
                label={<span style={{color: color}}><Icon name="tint"/></span>}
                onChange={this.handleChange.bind(this)}
                defaultColor={color}/>
        );
    }

}