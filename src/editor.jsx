import React from 'react';
import { Editor, EditorState, RichUtils, CompositeDecorator } from 'draft-js';

import Base from './components/Base';

import Inline from './plugins/Inline';
import FontSize from './plugins/FontSize';
import FontFamily from './plugins/FontFamily';
import FontColor from './plugins/FontColor';
import FontBackground from './plugins/FontBackground';

import BlockType from './plugins/BlockType';
import TextAlign from './plugins/TextAlign';
import List from './plugins/List';
import Indent from './plugins/Indent';

import Link from './plugins/Link';

import 'muicss/dist/css/mui.css';
import './style.css';
import 'draft-js/dist/Draft.css';

import { INLINE_STYLES, CUSTOM_STYLE_MAP, TEXT_ALIGN_DIRECTIONS, LIST_TYPES, LIST_INDENTS } from './utils/constant';

import { ModalAction } from './handler/modal';
import { EditorStore } from './handler/editor';

import linkDecorator from './decorators/link';

export default class ShrEditor extends Base {

    static propTypes = {
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        const decorator = new CompositeDecorator([linkDecorator]);
        this.state = {
            editorState: this.createEditorState(decorator)
        };
    }

    componentDidMount() {
        this.listenTo(EditorStore, this.handleStoreChange.bind(this));
    }

    handleStoreChange(data, type) {
        switch (type) {
            case 'EditorFocus':
                this.editor.focus();
                break;
        }
    }

    /**
     * 初始化editorState
     * @param compositeDecorator
     * @returns {*}
     */
    createEditorState(compositeDecorator) {
        let editorState;
        //TODO 处理props中的editorState
        //
        if (!editorState) {
            editorState = EditorState.createEmpty(compositeDecorator);
        }
        return editorState;
    }

    /**
     * 内容发生变化
     * @param editorState
     */
    handleEditorChange(editorState) {

        this.setState({editorState});
        const { onChange } = this.props;
        onChange && onChange(editorState);
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
                    {LIST_TYPES.map((type, i) =>
                        <List key={i} editorState={editorState} onChange={this.handleEditorChange.bind(this)} type={type}/>
                    )}
                    {LIST_INDENTS.map((type, i) =>
                        <Indent key={i} editorState={editorState} onChange={this.handleEditorChange.bind(this)} type={type}/>
                    )}
                    <Link editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                </div>
                <div
                    class="shreditor-editor"
                    onFocus={this.handleEditorFocus.bind(this)}
                    onMouseDown={this.handleEditorMouseDown.bind(this)}>
                    <Editor
                        ref={(editor) => {this.editor = editor}}
                        customStyleMap={CUSTOM_STYLE_MAP}
                        editorState={editorState}
                        blockStyleFn={this.blockStyleFn}
                        onChange={this.handleEditorChange.bind(this)} />
                </div>
            </div>
        );
    }

}