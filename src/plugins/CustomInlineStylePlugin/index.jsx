/**
 * 自定义内联样式组件父类
 */
import React from 'react';

import { toggleCustomInlineStyle, getCustomSelectInlineStyle } from '../../utils/inline';

export default class CustomInlineStylePlugin extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            current: undefined
        };
        this.init();
    }

    init() {
        this.pattern = 'CUSTOM_INLINE_STYLE';   //自定义样式类别
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const style = getCustomSelectInlineStyle(editorState, [this.pattern])[this.pattern];
            if (style) {
                const value = style.substr(this.pattern.length + 1);
                if (this.state.current != value) {
                    this.setState({
                        current: value
                    });
                }
            } else if (this.state.current) {
                this.setState({
                    current: undefined
                });
            }
        }
    }

    change(value) {
        const { editorState, onChange } = this.props;
        onChange(toggleCustomInlineStyle(editorState, this.pattern, `${this.pattern}-${value}`));
    }
}