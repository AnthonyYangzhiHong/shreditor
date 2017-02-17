import React from 'react';
import Base from '../../components/Base';

import Button from '../../components/Button';

import { Icon } from 'react-fa';

import { EditorState } from 'draft-js';

export default class Undo extends Base {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        const { editorState } = this.props;
        this.state = {
            disabled: editorState && editorState.getUndoStack().size <= 0
        };
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            this.setState({
                disabled: editorState.getUndoStack().size <= 0
            });
        }
    }

    handleUndo() {
        const { editorState, onChange } = this.props;
        const newState = EditorState.undo(editorState);
        newState && onChange && onChange(newState);
    }

    render() {
        const { disabled } = this.state;
        return (
            <Button disabled={disabled} onClick={this.handleUndo.bind(this)}>
                <Icon name="undo"/>
            </Button>
        );

    }

}