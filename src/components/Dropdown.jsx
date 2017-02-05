/**
 * 下拉框
 */
import React from 'react';
import { decorate as mixin } from 'react-mixin';
import { ListenerMixin } from 'reflux';

import { ModalAction, ModalStore } from '../handler/modal';

import uuid from 'node-uuid';
import crypto from 'crypto';

@mixin(ListenerMixin)
export default class Dropdown extends React.Component {

    static propTypes = {
        customMenu: React.PropTypes.element,
        label: React.PropTypes.element,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func
    };

    static defaultProps = {
        label: <span>button</span>
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: false,      //下拉显示
            menuTop: 0          //下拉菜单顶部位置
        };
        this.uid = this.generateUniqueId();
    }

    generateUniqueId() {
        const key = uuid();
        return crypto.createHash('sha256').update(key).digest('hex').substr(0, 6);
    }

    componentDidMount() {
        this.listenTo(ModalStore, this.handleStoreChange.bind(this));
    }

    handleStoreChange(data, type) {
        switch (type) {
            case 'ShowModal':
                if (this.uid !== data) {
                    this.close();
                }
                break;
            case 'HideAll':
                this.close();
                break;
        }
    }

    /**
     * 按钮点击
     * @param e
     */
    handleClick(e) {
        e.preventDefault();
        if (this.state.opened) {
            this.close();
        } else {
            this.open();
        }

    }

    handleMouseDown(e) {
        e.preventDefault();
    }

    /**
     * 选择
     * @param value
     * @param e
     */
    handleSelect(value, e) {
        e.preventDefault();
        this.close();
        this.props.onSelect && this.props.onSelect(value);
    }

    /**
     * 显示下拉菜单
     */
    open() {
        let wrapperRect = this.refs.wrapper.getBoundingClientRect();
        let toggleRect = this.refs.button.getBoundingClientRect();
        this.setState({
            opened: true,
            menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
        });
        ModalAction.show(this.uid);
    }

    /**
     * 隐藏下拉菜单
     */
    close() {
        if (this.state.opened) {
            this.setState({
                opened: false
            });
        }
    }

    render() {

        let menu;

        if (this.props.customMenu) {
            menu = (
                <div ref="selectEl" style={{top: this.state.menuTop}} className="mui-dropdown__menu mui--is-open">
                    {this.props.customMenu}
                </div>
            );
        } else {
            menu = (
                <ul ref="selectEl" style={{top: this.state.menuTop}} className="mui-dropdown__menu mui--is-open">
                    {this.props.options.map((option, i) =>
                        <li key={i}>
                            <a href="javascript:" onClick={this.handleSelect.bind(this, option.value)} onMouseDown={this.handleMouseDown}>
                                {option.label || option.value}
                            </a>
                        </li>
                    )}
                </ul>
            );
        }

        return (
            <div className="mui-dropdown" ref="wrapper">
                <button ref="button" className="mui-btn mui-btn--small" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown}>
                    {this.props.label} <span class="mui-caret"></span>
                </button>
                {this.state.opened ?
                    menu :
                    null
                }
            </div>
        );
    }

}