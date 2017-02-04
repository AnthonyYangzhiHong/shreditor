import React from 'react';

import FontColorPicker from '../components/FontColorPicker';

import { Icon } from 'react-fa';

import Color from 'color';

import { toggleCustomInlineStyle, getCustomSelectInlineStyle } from '../utils/inline';

export default class FontBackground extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            currentFontBackground: undefined
        };
        this.pattern = 'FONT_BACKGROUND';
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const fontBackgroundStyle = getCustomSelectInlineStyle(editorState, [this.pattern])[this.pattern];
            if (fontBackgroundStyle) {
                const backgroundColor = fontBackgroundStyle.substr(this.pattern.length + 1);
                if (this.state.currentFontBackground != backgroundColor) {
                    this.setState({
                        currentFontBackground: backgroundColor
                    });
                }
            } else if (this.state.currentFontBackground) {
                this.setState({
                    currentFontBackground: undefined
                });
            }
        }
    }

    handleChange(backgroundColor) {
        const { editorState, onChange } = this.props;
        onChange(toggleCustomInlineStyle(editorState, this.pattern, `${this.pattern}-${backgroundColor}`));
    }

    render() {

        const color = this.state.currentFontBackground || '#fff';

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