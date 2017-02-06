import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

import Inline from './plugins/Inline';
import FontSize from './plugins/FontSize';
import FontFamily from './plugins/FontFamily';
import FontColor from './plugins/FontColor';
import FontBackground from './plugins/FontBackground';

import BlockType from './plugins/BlockType';
import TextAlign from './plugins/TextAlign';

import 'muicss/dist/css/mui.css';
import './style.css';
import 'draft-js/dist/Draft.css';

import { INLINE_STYLES, CUSTOM_STYLE_MAP, TEXT_ALIGN_DIRECTIONS } from './utils/constant';

import { ModalAction } from './handler/modal';

export default class ShrEditor extends React.Component {

    static propTypes = {

    };

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    /**
     * 内容发生变化
     * @param editorState
     */
    handleEditorChange(editorState) {
        this.setState({editorState});
    }

    /**
     * 编辑区域获得焦点
     * @param e
     */
    handleEditorFocus(e) {

    }

    /**
     * 点击编辑区域
     * @param e
     */
    handleEditorMouseDown(e) {
        ModalAction.hideAll();
    }

    blockStyleFn(block) {
        const align = block.getData() && block.getData().get('text-align');
        if (align) {
            return `shreditor-block-align-${align}`;
        } else {
            return '';
        }
    }

    render() {
        const editorState = this.state.editorState;
        return (
            <div class="shreditor-wrapper">
                <div class="shreditor-toolbar">
                    <BlockType editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                    {INLINE_STYLES.map((style, i) =>
                        <Inline key={i} editorState={editorState} onChange={this.handleEditorChange.bind(this)} pattern={style}/>
                    )}
                    <FontSize editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                    <FontFamily editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                    <FontColor editorState={editorState} onChange={this.handleEditorChange.bind(this)} />
                    <FontBackground editorState={editorState} onChange={this.handleEditorChange.bind(this)} />
                    {TEXT_ALIGN_DIRECTIONS.map((align, i) =>
                        <TextAlign key={i} editorState={editorState} onChange={this.handleEditorChange.bind(this)} align={align}/>
                    )}
                </div>
                <div
                    class="shreditor-editor"
                    onFocus={this.handleEditorFocus.bind(this)}
                    onMouseDown={this.handleEditorMouseDown.bind(this)}>
                    <Editor
                        customStyleMap={CUSTOM_STYLE_MAP}
                        editorState={editorState}
                        blockStyleFn={this.blockStyleFn}
                        onChange={this.handleEditorChange.bind(this)} />
                </div>
            </div>
        );
    }

}