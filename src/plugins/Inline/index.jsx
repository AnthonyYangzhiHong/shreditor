import React from 'react';
import Button from '../../components/Button';
import { Icon } from 'react-fa';
import { getSelectInlineStyle, toggleInlineStyle } from '../../utils/inline';
import { INLINE_STYLES } from '../../utils/constant';
export default class Inline extends React.Component {

    static propTypes = {
        pattern: React.PropTypes.oneOf(INLINE_STYLES),
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isCheck: false      //选中状态
        };
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const inlineStyle = getSelectInlineStyle(editorState);
            if (!this.state.isCheck && inlineStyle[this.props.pattern]) {
                this.setState({
                    isCheck: true
                });
            } else if (this.state.isCheck && !inlineStyle[this.props.pattern]) {
                this.setState({
                    isCheck: false
                });
            }
        }
    }

    /**
     * 点击切换状态
     */
    handleClick() {
        const { editorState, onChange, pattern } = this.props;
        onChange && onChange(toggleInlineStyle(editorState, pattern));
    }

    render() {
        const { pattern } = this.props;
        return (
            <Button color={this.state.isCheck ? 'primary' : undefined} onClick={this.handleClick.bind(this)}>
                <Icon name={pattern.toLowerCase()}/>
            </Button>
        );
    }

}