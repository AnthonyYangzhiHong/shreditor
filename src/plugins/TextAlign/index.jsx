/**
 * 对齐方式
 */
import React from 'react';

import { TEXT_ALIGN_DIRECTIONS } from '../../utils/constant';

import { getSelectBlocksMetaData, setBlockData } from '../../utils/block';

import { Icon } from 'react-fa';
import Button from '../../components/Button';

export default class TextAlign extends React.Component {

    static propTypes = {
        align: React.PropTypes.oneOf(TEXT_ALIGN_DIRECTIONS),
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            isCheck: false
        };
        this.value = this.props.align.substr(5).toLowerCase();
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const align = getSelectBlocksMetaData(editorState).get('text-align');
            if (this.state.isCheck && align !== this.value) {
                this.setState({
                    isCheck: false
                });
            } else if (!this.state.isCheck && align === this.value) {
                this.setState({
                    isCheck: true
                });
            }
        }
    }

    /**
     * 点击切换状态
     */
    handleClick() {
        const { editorState, onChange } = this.props;
        if (!this.state.isCheck) {
            onChange && onChange(setBlockData(editorState, {'text-align': this.value}));
        } else {
            onChange && onChange(setBlockData(editorState, {'text-align': undefined}));
        }
    }

    render() {
        return (
            <Button color={this.state.isCheck ? 'primary' : undefined} onClick={this.handleClick.bind(this)}>
                <Icon name={'align-' + this.value}/>
            </Button>
        );

    }

}