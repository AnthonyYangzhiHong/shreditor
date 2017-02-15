import React from 'react';
import Base from '../components/Base';

import Button from '../components/Button';

import { Icon } from 'react-fa';

import { EditorState } from 'draft-js';

export default class Redo extends Base {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        const { editorState } = this.props;
        this.state = {
            disabled: editorState && editorState.getRedoStack().size <= 0
        };
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            this.setState({
                disabled: editorState.getRedoStack().size <= 0
            });
        }
    }

    handleRedo() {
        const { editorState, onChange } = this.props;
        const newState = EditorState.redo(editorState);
        newState && onChange && onChange(newState);
    }

    render() {
        const { disabled } = this.state;
        return (
            <Button disabled={disabled} onClick={this.handleRedo.bind(this)}>
                <Icon name="repeat"/>
            </Button>
        );

    }

}