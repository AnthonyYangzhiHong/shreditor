import React from 'react';

import RcUpload from 'rc-upload';

import assign from 'lodash/assign';

import Spinner from '../Spinner';

import './style.css';

export default class Upload extends React.Component {

    static propTypes = {
        name: React.PropTypes.string,       //文件参数名称
        disabled: React.PropTypes.bool,     //是否禁用
        multiple: React.PropTypes.bool,     //是否多个文件
        headers: React.PropTypes.object,    //上传文件请求头部信息
        action: React.PropTypes.string.isRequired,     //上传地址
        data: React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.func
        ]),                                 //上传附加参数
        accept: React.PropTypes.string,     //接收上传的文件类型
        onProgress: React.PropTypes.func,   //上传中进度变化
        onError: React.PropTypes.func,      //上传发生错误
        onSuccess: React.PropTypes.func,    //上传成功
    };

    static defaultProps = {
        name: "file",
        disabled: false,
        multiple: false
    };

    constructor(props) {
        super(props);
        this.state = {
            uploading: false,
            progress: 0
        };
    }

    /**
     * 开始上传
     * @param file
     */
    handleStart(file) {
        this.setState({
            uploading: true,
            progress: 0
        });
    }

    /**
     * 上传错误
     * @param err
     */
    handleError(err) {
        const { onError } = this.props;
        this.setState({
            uploading: false,
            progress: 0
        });
        onError && onError(err);
    }

    /**
     * 上传中
     * @param event
     * @param file
     */
    handleProgress(event, file) {
        const { onProgress} = this.props;
        this.setState({
            uploading: true,
            progress: event.percent
        });
        onProgress && onProgress(event);
    }

    /**
     * 上传成功
     * @param result
     */
    handleSuccess(result) {
        const { onSuccess} = this.props;
        this.setState({
            uploading: false,
            progress: 0
        });
        onSuccess && onSuccess(result);
    }

    render() {

        const { children } = this.props;

        const { uploading } = this.state;

        const uploadProps = assign({}, this.props, {
            onStart: this.handleStart.bind(this),
            onError: this.handleError.bind(this),
            onProgress: this.handleProgress.bind(this),
            onSuccess: this.handleSuccess.bind(this)
        });

        return (
            <span>
                <div>
                    <RcUpload { ...uploadProps }>
                        <div className="upload-container">
                            { uploading ? <Spinner/> : children}
                        </div>
                    </RcUpload>
                </div>
            </span>
        );
    }

}