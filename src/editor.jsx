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
import Image from './plugins/Image';

import Undo from './plugins/Undo';
import Redo from './plugins/Redo';

import 'muicss/dist/css/mui.css';
import './style.css';
import 'draft-js/dist/Draft.css';

import { INLINE_STYLES, CUSTOM_STYLE_MAP, TEXT_ALIGN_DIRECTIONS, LIST_TYPES, LIST_INDENTS, HTML_INLINE_OPTIONS } from './utils/constant';

import { ModalAction } from './handler/modal';
import { EditorStore } from './handler/editor';

import linkDecorator from './decorators/Link';

import ImageBlock from './blocks/Image';

import { stateToHTML } from 'draft-js-export-html';

export default class ShrEditor extends Base {

    static propTypes = {
        onChange: React.PropTypes.func,
        imageUploadAction: React.PropTypes.string,  //图片上传请求地址
    };

    static defaultProps = {
        imageUploadAction: "/upload"
    };

    static draftToHtml(editorState) {
        if (editorState) {
            const contentState = editorState.getCurrentContent();
            return stateToHTML(contentState, {inlineStyles: HTML_INLINE_OPTIONS});
        }
        return "<p></p>";
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

    /**
     * 键盘处理 !重要
     * @param command
     * @returns {boolean}
     */
    handleKeyCommand(command) {
        const { editorState } = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.handleEditorChange(newState);
            return true;
        }
        return false;
    }

    blockStyleFn(block) {
        const align = block.getData() && block.getData().get('text-align');
        if (align) {
            return `shreditor-block-align-${align}`;
        } else {
            return '';
        }
    }

    blockRendererFn(block) {

        if (block.getType() === 'atomic') {
            const contentState = this.state.editorState.getCurrentContent();
            const entity = contentState.getEntity(block.getEntityAt(0));
            if (entity && entity.type === 'IMAGE') {
                return {
                    component: ImageBlock,
                    editable: false
                };
            }
        }
        return undefined;
    }

    render() {
        const { editorState } = this.state;
        const { imageUploadAction } = this.props;
        return (
            <div className="shreditor-wrapper">
                <div className="shreditor-toolbar">
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
                    <Image editorState={editorState} onChange={this.handleEditorChange.bind(this)} imageUploadAction={imageUploadAction}/>
                    <Undo editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                    <Redo editorState={editorState} onChange={this.handleEditorChange.bind(this)}/>
                </div>
                <div
                    className="shreditor-editor"
                    onFocus={this.handleEditorFocus.bind(this)}
                    onMouseDown={this.handleEditorMouseDown.bind(this)}>
                    <Editor
                        ref={(editor) => {this.editor = editor}}
                        customStyleMap={CUSTOM_STYLE_MAP}
                        editorState={editorState}
                        blockStyleFn={this.blockStyleFn}
                        blockRendererFn={this.blockRendererFn.bind(this)}
                        handleKeyCommand={this.handleKeyCommand.bind(this)}
                        onChange={this.handleEditorChange.bind(this)} />
                </div>
            </div>
        );
    }

}