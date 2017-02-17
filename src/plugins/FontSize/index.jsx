/**
 * 设置字体大小
 */
import React from 'react';

import CustomInlineStylePlugin from '../CustomInlineStylePlugin';

import Dropdown from '../../components/Dropdown';

import { FONT_SIZES } from '../../utils/constant';

export default class FontSize extends CustomInlineStylePlugin {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func,
        label: React.PropTypes.element
    };

    static defaultProps = {
        label: <span style={{width: '20px', textAlign: 'left', display: 'inline-block'}}>T</span>
    };

    init() {
        this.pattern = 'FONT_SIZE';
    }

    handleSelect(fontSize) {
        this.change(fontSize);
    }

    render() {
        const fontSizes = FONT_SIZES.map(fontSize => {return {value: fontSize}});
        const currentFontSize = this.state.current;
        const labelStyle = {
            width: '20px',
            textAlign: 'left',
            display: 'inline-block'
        };
        const label = currentFontSize ? <span style={labelStyle}>{currentFontSize}</span> : this.props.label;
        return (
            <Dropdown options={fontSizes} onSelect={this.handleSelect.bind(this)} label={label}/>
        );
    }

}