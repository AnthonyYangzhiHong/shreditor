import React from 'react';

import { Entity, Modifier, EditorState, RichUtils } from 'draft-js';

import Dropdown from '../components/Dropdown';
import Button from '../components/Button';

import { Icon } from 'react-fa';

import { EditorAction } from '../handler/editor';

import { getSelectEntityKey, getEntityRange } from '../utils/inline';

import { getSelectText } from '../utils/block';

import { CHANGE_TYPES } from '../utils/constant';

import { FormattedMessage } from 'react-intl';

export default class Link extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            link: '',
            title: '',
            currentEntityKey: undefined
        };
    }

    componentWillMount() {
        const { editorState } = this.props;
        if (editorState) {
            const entity = getSelectEntityKey(editorState);
            this.setState({
                currentEntityKey: entity
            });
        }
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            this.setState({
                currentEntityKey: getSelectEntityKey(editorState)
            });
        }
    }

    handleMouseDown(e) {
        e.preventDefault();
    }

    /**
     * 点击新增按钮
     * @param e
     */
    handleAdd(e) {
        e.preventDefault();
        EditorAction.focus();
        this.editLink();
        this.dropdown.close();

    }

    /**
     * 新增或编辑链接
     */
    editLink() {
        const { link, title, currentEntityKey } = this.state;
        const { editorState, onChange } = this.props;
        let selection = editorState.getSelection();
        let contentState = editorState.getCurrentContent();
        if (currentEntityKey) {
            const entityRange = getEntityRange(editorState, currentEntityKey);
            selection = selection.merge({
                anchorOffset: entityRange.start,
                focusOffset: entityRange.end
            });
        }

        const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
            url: link
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

        console.log(entityKey);

        contentState = Modifier.replaceText(contentState, selection, `${title}`, editorState.getCurrentInlineStyle(), entityKey);

        let newState = EditorState.push(editorState, contentState, CHANGE_TYPES.INSERT_CHARACTERS);

        //链接后面插入空格
        selection = newState.getSelection().merge({
            anchorOffset: selection.get('anchorOffset') + title.length,
            focusOffset: selection.get('anchorOffset') + title.length
        });
        newState = EditorState.acceptSelection(newState, selection);
        contentState = Modifier.insertText(newState.getCurrentContent(), selection, ' ', newState.getCurrentInlineStyle(), undefined);
        newState = EditorState.push(newState, contentState, CHANGE_TYPES.INSERT_CHARACTERS);

        onChange && onChange(newState);
    }

    removeLink() {

        const { editorState, onChange } = this.props;
        const { currentEntityKey } = this.state;
        let selection = editorState.getSelection();
        if (currentEntityKey) {
            const entityRange = getEntityRange(editorState, currentEntityKey);
            selection = selection.merge({
                anchorOffset: entityRange.start,
                focusOffset: entityRange.end
            });
            let newState = RichUtils.toggleLink(editorState, selection, null);
            onChange && onChange(newState);
        }

    }

    /**
     * 移除链接按钮
     * @param e
     */
    handleRemove(e) {
        this.removeLink();
    }

    /**
     * 链接窗口取消按钮
     * @param e
     */
    handleCancel(e) {
        e.preventDefault();
        this.dropdown.close();
        EditorAction.focus();
    }

    /**
     * 链接编辑窗口显示
     */
    handleLinkFormShow() {
        const { editorState } = this.props;
        const { currentEntityKey } = this.state;
        const contentState = editorState.getCurrentContent();
        const isLinkEntity = currentEntityKey && contentState.getEntity(currentEntityKey).getType() === 'LINK';
        if (isLinkEntity) {
            const entityRange = getEntityRange(editorState, currentEntityKey);
            const contentState = editorState.getCurrentContent();
            const { url } = contentState.getEntity(currentEntityKey).getData();
            this.setState({
                link: url,
                title: (entityRange && entityRange.text) || getSelectText(editorState)
            });
        } else {
            const text = getSelectText(editorState);
            this.setState({
                title: text,
                link: this.isUrl(text) ? text : ""
            });
        }
    }

    /**
     * 链接编辑窗口隐藏
     */
    handleLinkFormHide() {
        this.setState({
            link: '',
            title: ''
        });
    }

    handleTitleChange(e) {
        this.setState({
            title: e.target.value
        });
    }

    handleLinkChange(e) {
        this.setState({
            link: e.target.value
        });
    }

    isUrl(str) {
        const match = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
        return match.test(str);
    }

    render() {
        const { link, title, currentEntityKey } = this.state;
        const { editorState } = this.props;
        const isLinkEntity = currentEntityKey && editorState.getCurrentContent().getEntity(currentEntityKey).get('type') === 'LINK';
        return (
            <div style={{display: "inline-block"}}>
                <Dropdown
                    hideCaret
                    ref={(dropdown) => {this.dropdown = dropdown}}
                    label={<Icon name="link"/>}
                    onShow={this.handleLinkFormShow.bind(this)}
                    onHide={this.handleLinkFormHide.bind(this)}
                    customMenu={
                        <div style={{padding: '15px', width: '200px'}}>
                            <form className="mui-form">
                                <div className="mui-textfield">
                                    <input type="text" onChange={this.handleLinkChange.bind(this)} value={link}/>
                                    <label>
                                        <FormattedMessage id="Link" defaultMessage="Link"/>
                                    </label>
                                </div>
                                <div className="mui-textfield">
                                    <input type="text" onChange={this.handleTitleChange.bind(this)} value={title}/>
                                    <label>
                                        <FormattedMessage id="Title" defaultMessage="Title"/>
                                    </label>
                                </div>
                                <div className="mui-row">
                                    <div className="mui-col-md-6">
                                        <button
                                            onMouseDown={this.handleMouseDown}
                                            onClick={this.handleAdd.bind(this)}
                                            className="mui-btn mui-btn--small mui-btn--primary mui-btn--raised">
                                            {isLinkEntity ?
                                                <FormattedMessage id="Edit" defaultMessage="Edit"/> :
                                                <FormattedMessage id="Add" defaultMessage="Add"/>
                                            }
                                        </button>
                                    </div>
                                    <div className="mui-col-md-6">
                                        <button
                                            onMouseDown={this.handleMouseDown}
                                            onClick={this.handleCancel.bind(this)}
                                            className="mui-btn mui-btn--small mui-btn--raised">
                                            <FormattedMessage id="Cancel" defaultMessage="Cancel"/>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    }
                />
                <Button onClick={this.handleRemove.bind(this)} disabled={!isLinkEntity}>
                    <Icon name="unlink"/>
                </Button>
            </div>
        );
    }

}