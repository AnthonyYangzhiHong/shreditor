import React from 'react';

import FontColorPicker from '../components/FontColorPicker';

import { Icon } from 'react-fa';

import { toggleCustomInlineStyle, getCustomSelectInlineStyle } from '../utils/inline';

export default class FontColor extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            currentFontColor: undefined
        };
        this.pattern = 'FONT_COLOR';
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const fontColorStyle = getCustomSelectInlineStyle(editorState, [this.pattern])[this.pattern];
            if (fontColorStyle) {
                const fontColor = fontColorStyle.substr(this.pattern.length + 1);
                if (this.state.currentFontColor != fontColor) {
                    this.setState({
                        currentFontColor: fontColor
                    });
                }
            } else if (this.state.currentFontColor) {
                this.setState({
                    currentFontColor: undefined
                });
            }
        }
    }

    handleChange(fontColor) {
        const { editorState, onChange } = this.props;
        onChange(toggleCustomInlineStyle(editorState, this.pattern, `${this.pattern}-${fontColor}`));
    }

    render() {

        const color = this.state.currentFontColor;

        const label = (
            <div>

            </div>
        );

        return (
            <FontColorPicker
                label={<span style={{color: color || '#000'}}><Icon name="tint"/></span>}
                onChange={this.handleChange.bind(this)}/>
        );
    }

}