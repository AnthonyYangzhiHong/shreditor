/**
 * 下拉框
 */
import React from 'react';

import Base from '../Base';

import { ModalAction, ModalStore } from '../../handler/modal';

import uuid from 'node-uuid';
import crypto from 'crypto';

export default class Dropdown extends Base {

    static propTypes = {
        customMenu: React.PropTypes.element,
        label: React.PropTypes.element,
        options: React.PropTypes.array,
        onSelect: React.PropTypes.func,
        hideCaret: React.PropTypes.bool,
        onShow: React.PropTypes.func,       //下拉菜单显示
        onHide: React.PropTypes.func,       //下拉菜单隐藏
        align: React.PropTypes.oneOf(['auto', 'right', 'left']),    //菜单对齐方向，默认左对齐
    };

    static defaultProps = {
        label: <span>button</span>,
        hideCaret: false,
        align: "auto"
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: false,      //下拉显示
            menuTop: 0,         //下拉菜单顶部位置
            align: "left"
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
        let wrapperRect = this.wrapper.getBoundingClientRect();
        let toggleRect = this.button.getBoundingClientRect();
        let align = this.props.align;
        if (align === 'auto') {
            //自动变化菜单对齐方向
            align = wrapperRect.left < (window.innerWidth/2) ? 'left' : 'right';
        }
        this.setState({
            opened: true,
            menuTop: toggleRect.top - wrapperRect.top + toggleRect.height,
            align: align
        }, () => {
            ModalAction.show(this.uid);
            const { onShow } = this.props;
            onShow && onShow();
        });
    }

    /**
     * 隐藏下拉菜单
     */
    close() {
        if (this.state.opened) {
            this.setState({
                opened: false
            }, () => {
                const { onHide } = this.props;
                onHide && onHide();
            });
        }
    }

    render() {

        const { label, options, customMenu, hideCaret } = this.props;

        const { menuTop, opened, align } = this.state;

        let menu;

        const menuStyle = {
            top: menuTop,
            zIndex: 2
        };

        let menuClass = "mui-dropdown__menu mui--is-open";

        if (align === "right") {
            menuClass += " mui-dropdown__menu--right";
        }

        if (customMenu) {
            menu = (
                <div ref="selectEl" style={menuStyle} className={menuClass}>
                    {customMenu}
                </div>
            );
        } else {
            menu = (
                <ul ref="selectEl" style={menuStyle} className={menuClass}>
                    {options.map((option, i) =>
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
            <div className="mui-dropdown" ref={(wrapper) => {this.wrapper = wrapper}}>
                <button ref={button => {this.button = button}} className="mui-btn mui-btn--small" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown}>
                    {label} {hideCaret ? null : <span class="mui-caret"></span>}
                </button>
                {opened ?
                    menu :
                    null
                }
            </div>
        );
    }

}