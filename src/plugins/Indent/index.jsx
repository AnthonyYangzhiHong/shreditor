/**
 * 列表缩进
 */
import React from 'react';
import { getSelectBlocksType } from '../../utils/block';
import Button from '../../components/Button';

import { Icon } from 'react-fa';

import { LIST_INDENTS } from '../../utils/constant';

import { indent, dedent } from '../../utils/list';

export default class Indent extends React.Component {

    static propTypes = {
        type: React.PropTypes.oneOf(LIST_INDENTS),
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isCheck: false,
            disabled: true
        };
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const blockType = getSelectBlocksType(editorState);
            if (['ordered-list-item', 'unordered-list-item'].indexOf(blockType) >= 0) {
                this.setState({
                    disabled: false
                });
            } else {
                this.setState({
                    disabled: true
                });
            }
        }
    }

    handleClick() {
        const { editorState, onChange, type } = this.props;
        let newState;
        if (type === 'INDENT') {
            newState = indent(editorState);
        } else if (type === 'DEDENT') {
            newState = dedent(editorState);
        }
        if (newState) {
            onChange && onChange(newState);
        }
    }

    render() {
        return (
            <Button disabled={this.state.disabled} color={this.state.isCheck ? 'primary' : undefined} onClick={this.handleClick.bind(this)}>
                <Icon name={this.props.type.toLowerCase()}/>
            </Button>
        );
    }

}