/**
 * 字体
 */
import React from 'react';

import CustomInlineStylePlugin from './CustomInlineStylePlugin';

import Dropdown from '../components/Dropdown';

import { FONT_FAMILIES } from '../utils/constant';

import truncate from 'lodash/truncate';
import isObject from 'lodash/isObject';

export default class FontFamily extends CustomInlineStylePlugin {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func,
        label: React.PropTypes.element
    };

    static defaultProps = {
        label: <span style={{width: '60px', textAlign: 'left', display: 'inline-block'}}>字体</span>
    };

    init() {
        this.pattern = 'FONT_FAMILY';
    }

    handleSelect(fontFamily) {
        this.change(fontFamily);
    }

    render() {
        const fontFamilies = FONT_FAMILIES.map(fontFamily => {
            if (isObject(fontFamily)) {
                return {
                    value: fontFamily.name,
                    label: <span style={{fontFamily: fontFamily.fontFamily}}>{fontFamily.name}</span>
                }
            } else {
                return {
                    value: fontFamily,
                    label: <span style={{fontFamily}}>{fontFamily}</span>
                }
            }
        });
        const currentFontFamily = this.state.current;
        const labelStyle = {
            width: '60px',
            textAlign: 'left',
            display: 'inline-block'
        };
        const label = currentFontFamily ? <span style={labelStyle}>{truncate(currentFontFamily, {length: 10})}</span> : this.props.label;
        return (
            <Dropdown options={fontFamilies} onSelect={this.handleSelect.bind(this)} label={label}/>
        );
    }

}