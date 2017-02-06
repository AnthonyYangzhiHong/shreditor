/**
 * 列表
 */
import React from 'react';
import { RichUtils} from 'draft-js';
import { getSelectBlocksType } from '../utils/block';

import { LIST_TYPES } from '../utils/constant';

import Button from '../components/Button';

import { Icon } from 'react-fa';

export default class List extends React.Component {

    static propTypes = {
        type: React.PropTypes.oneOf(LIST_TYPES),
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isCheck: false
        };
        this.value = this.props.type.substr(4).toLowerCase();
        this.blockType = this.value === 'ol' ? 'ordered-list-item' : 'unordered-list-item';
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const blockType = getSelectBlocksType(editorState);
            if (this.state.isCheck && blockType !== this.blockType) {
                this.setState({
                    isCheck: false
                });
            } else if (!this.state.isCheck && blockType === this.blockType) {
                this.setState({
                    isCheck: true
                });
            }
        }
    }

    handleClick() {
        const { editorState, onChange } = this.props;
        const newState = RichUtils.toggleBlockType(editorState, this.blockType);
        if (newState) {
            onChange && onChange(newState);
        }
    }

    render() {
        return (
            <Button color={this.state.isCheck ? 'primary' : undefined} onClick={this.handleClick.bind(this)}>
                <Icon name={'list-' + this.value}/>
            </Button>
        );
    }

}