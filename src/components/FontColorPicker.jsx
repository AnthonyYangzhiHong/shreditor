/**
 * 文字颜色下拉选择
 */
import React from 'react';

import { Icon } from 'react-fa';

import ColorPicker from './ColorPicker';
import { COLORS } from '../utils/constant';
export default class FontColorPicker extends React.Component {

    static propTypes = {
        colors: React.PropTypes.array,
        onChange: React.PropTypes.func,
        label: React.PropTypes.element
    };

    static defaultProps = {
        colors: COLORS,
        label: <Icon name="tint"/>
    };

    constructor(props) {
        super(props);
        this.state = {
            opened: false,      //下拉显示
            menuTop: 0          //下拉菜单顶部位置
        };
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
    }

    /**
     * 隐藏下拉菜单
     */
    close() {
        this.setState({
            opened: false
        });
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.props.onMouseDown && this.props.onMouseDown(e);
    }

    /**
     * 颜色发生改变
     * @param color
     */
    handleChange(color) {
        this.close();   //关闭下拉菜单
        this.props.onChange && this.props.onChange(color);
    }

    render() {

        return (
            <div className="mui-dropdown" ref="wrapper">
                <button ref="button" className="mui-btn mui-btn--small" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
                    {this.props.label}
                </button>
                {this.state.opened ?
                    <div ref="selectEl" style={{top: this.state.menuTop}} className="mui-dropdown__menu mui--is-open">
                        <ColorPicker {...this.props} onChange={this.handleChange.bind(this)} />
                    </div> :
                    null
                }
            </div>
        );

    }

}