import React from 'react';

import Dropdown from '../../components/Dropdown';

import { Icon } from 'react-fa';

import Tabs from '../../components/Tabs';

import Upload from '../../components/Upload';

import { FormattedMessage } from 'react-intl';

import { EditorAction } from '../../handler/editor';

import { AtomicBlockUtils, EditorState } from 'draft-js';

import { getRemoteImageSize } from '../../utils';

export default class Image extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func,
        imageUploadAction: React.PropTypes.string.isRequired,  //图片上传请求地址
    };

    constructor(props) {
        super(props);
        this.state = {
            src: '',
            width: '',
            height: '',
            ratio: true,    //宽高等比例缩放
            originalWidth: 0,   //原始宽度
            originalHeight: 0,  //原始高度
            focusInput: undefined,  //正在编辑的input
        };
    }

    handleMouseDown(e) {
        e.preventDefault();
    }

    handleSrcChange(e) {
        const imgSrc = e.target.value;
        this.setImageSrc(imgSrc);
    }

    setImageSrc(imgSrc) {
        if (imgSrc !== this.state.src) {
            this.setState({
                src: imgSrc
            }, async () => {
                if (imgSrc) {
                    try {
                        const imgInfo = await getRemoteImageSize(imgSrc);
                        this.setState({
                            ...imgInfo,
                            originalWidth: imgInfo.width || 0,
                            originalHeight: imgInfo.height || 0
                        });
                    } catch (err) {
                        console.error(err.message);
                        this.setState({
                            width: 0,
                            height: 0,
                            originalWidth: 0,
                            originalHeight: 0
                        });
                    }
                }
            });
        }
    }

    handleWidthChange(e) {
        const { ratio, originalWidth, originalHeight } = this.state;
        const width = e.target.value || 0;
        const newState = {width};
        if (ratio && originalWidth > 0 && originalHeight > 0) {
            newState.height = Math.floor(width * originalHeight / originalWidth);
        }
        this.setState(newState);
    }

    handleHeightChange(e) {
        const { ratio, originalWidth, originalHeight } = this.state;
        const height = e.target.value || 0;
        const newState = {height};
        if (ratio && originalWidth > 0 && originalHeight > 0) {
            newState.width = Math.floor(height * originalWidth / originalHeight);
        }
        this.setState(newState);
    }

    /**
     * 点击新增按钮
     * @param e
     */
    handleAdd(e) {
        e.preventDefault();
        EditorAction.focus();
        this.addImage();
        this.dropdown.close();
    }

    /**
     * 点击取消按钮
     * @param e
     */
    handleCancel(e) {
        e.preventDefault();
        this.dropdown.close();
        EditorAction.focus();
    }

    /**
     * 等比例缩放按钮
     * @param e
     */
    handleRatioLock(e) {
        e.preventDefault();
        this.setState((state, props) => {
            return { ratio: !state.ratio };
        }, () => {
            const { ratio, width, height, originalHeight, originalWidth, focusInput } = this.state;
            if (ratio && originalHeight > 0 && originalWidth > 0) {
                //等比例缩放
                const newState = {};
                if (focusInput === 'width') {
                    //修改宽度
                    newState.width = Math.floor(height * originalWidth / originalHeight);
                } else {
                    //修改高度
                    newState.height = Math.floor(width * originalHeight / originalWidth);
                }
                this.setState(newState);
            }
        });
    }

    /**
     * input获得焦点
     * @param e
     */
    handleInputFocus(e) {
        this.setState({
            focusInput: e.target.name
        });
    }

    /**
     * 图片编辑窗口隐藏
     */
    handleImageFormHide() {
        this.setState({
            src: '',
            width: 0,
            height: 0,
            originWidth: 0,
            originHeight: 0,
            ratio: true,
            focusInput: undefined
        });
    }

    /**
     * 上传成功
     * @param result
     */
    handleUploadSuccess(result) {
        this.setImageSrc(result.path);
        this.tabs.switchTab(0);
    }

    handleUploadError(error) {

    }

    handleUploadProgress(event) {

    }

    /**
     * 添加图片
     */
    addImage() {
        const { editorState, onChange } = this.props;
        let { src, width, height } = this.state;
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity('IMAGE', 'IMMUTABLE', {
            src: src,
            height: height + "px",
            width: width + "px"
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
        onChange && onChange(newState);
    }

    render() {

        const { src, width, height, ratio } = this.state;
        const { imageUploadAction } = this.props;

        return (
            <Dropdown
                hideCaret
                ref={(dropdown) => {this.dropdown = dropdown}}
                label={<Icon name="image"/>}
                onHide={this.handleImageFormHide.bind(this)}
                customMenu={
                    <Tabs
                        ref={(tabs) => {this.tabs = tabs}}
                        wrapperStyle={{padding: '15px', width: '200px'}}>
                        <Tabs.Tab
                            label={<FormattedMessage id="Image Info" defaultMessage="Image Info"/>}
                            paneStyle={{marginTop: "10px"}}>
                            <form className="mui-form">
                                <div className="mui-textfield">
                                    <input onFocus={this.handleInputFocus.bind(this)} type="text" onChange={this.handleSrcChange.bind(this)} value={src}/>
                                    <label>
                                        <FormattedMessage id="Image Src" defaultMessage="Image Src"/>
                                    </label>
                                </div>
                                <div className="mui-row">
                                    <div className="mui-col-md-5">
                                        <div className="mui-textfield">
                                            <input
                                                name="width"
                                                onFocus={this.handleInputFocus.bind(this)}
                                                type="number"
                                                onChange={this.handleWidthChange.bind(this)}
                                                value={width}/>
                                            <label>
                                                <FormattedMessage id="Width" defaultMessage="Width"/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mui-col-md-2">
                                        <div className="mui-textfield">
                                            <a onClick={this.handleRatioLock.bind(this)}>
                                                <Icon name={ratio ? "lock" : "unlock"}/>
                                            </a>
                                            <label></label>
                                        </div>
                                    </div>
                                    <div className="mui-col-md-5">
                                        <div className="mui-textfield">
                                            <input
                                                name="height"
                                                onFocus={this.handleInputFocus.bind(this)}
                                                type="number"
                                                onChange={this.handleHeightChange.bind(this)}
                                                value={height}/>
                                            <label>
                                                <FormattedMessage id="Height" defaultMessage="Height"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mui-row">
                                    <div className="mui-col-md-6">
                                        <button
                                            disabled={ !src || !width || !height }
                                            onMouseDown={this.handleMouseDown}
                                            onClick={this.handleAdd.bind(this)}
                                            className="mui-btn mui-btn--small mui-btn--primary mui-btn--raised">
                                            <FormattedMessage id="Add" defaultMessage="Add"/>
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
                        </Tabs.Tab>
                        <Tabs.Tab
                            label={<FormattedMessage id="Image Upload" defaultMessage="Image Upload"/>}
                            paneStyle={{marginTop: "10px"}}>
                            <Upload
                                action={imageUploadAction}
                                onSuccess={this.handleUploadSuccess.bind(this)}
                                onError={this.handleUploadError.bind(this)}
                                onProgress={this.handleUploadProgress.bind(this)}>
                                <p style={{ textAlign: "center", color: "#2196F3" }}>
                                    <Icon name="upload"/>
                                </p>
                                <p style={{ textAlign: "center", color: "#BDBDBD" }}>
                                    <FormattedMessage id="Click Or Drag File To Upload" defaultMessage="Click Or Drag File To Uploads"/>
                                </p>
                            </Upload>
                        </Tabs.Tab>
                    </Tabs>
                }/>
        );

    }

}