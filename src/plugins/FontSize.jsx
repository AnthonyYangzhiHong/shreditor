import React from 'react';

import Dropdown from '../components/Dropdown';
import { Icon } from 'react-fa';

import { FONT_SIZES } from '../utils/constant';

import { toggleCustomInlineStyle, getCustomSelectInlineStyle } from '../utils/inline';

export default class FontSize extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            currentFontSize: undefined
        };
        this.pattern = 'FONT_SIZE';
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const fontSizeStyle = getCustomSelectInlineStyle(editorState, [this.pattern])[this.pattern];
            if (fontSizeStyle) {
                const fontSize = fontSizeStyle.substr(this.pattern.length + 1);
                if (this.state.currentFontSize != fontSize) {
                    this.setState({
                        currentFontSize: fontSize
                    });
                }
            } else if (this.state.currentFontSize) {
                this.setState({
                    currentFontSize: undefined
                });
            }
        }
    }

    handleSelect(fontSize) {
        const { editorState, onChange } = this.props;
        onChange(toggleCustomInlineStyle(editorState, this.pattern, `${this.pattern}-${fontSize}`));
    }

    render() {
        const fontSizes = FONT_SIZES.map(fontSize => {return {value: fontSize}});
        const currentFontSize = this.state.currentFontSize;
        return (
            <Dropdown options={fontSizes} onSelect={this.handleSelect.bind(this)}>
                {currentFontSize || 'T'}
            </Dropdown>
        );
    }

}