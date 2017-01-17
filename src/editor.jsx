import React from 'react';
import { Editor, EditorState } from 'draft-js';

import './editor.css';

import plugins from './plugins';

export default class Shreditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    handleEditorChange(editorState) {
        this.setState({editorState});
    }

    render() {

        const { wrapperStyle, toolbarStyle, language } = this.props;

        return (
            <div
                class="shreditor-wrapper"
                style={wrapperStyle}>
                <div
                    class="shreditor-toolbar"
                    style={toolbarStyle}>
                    {
                        React.createElement(plugins.fontSize)
                    }
                </div>
                <div class="shreditor-main">
                    <Editor editorState={this.state.editorState} onChange={this.handleEditorChange.bind(this)} />
                </div>
            </div>
        );
    }

}
