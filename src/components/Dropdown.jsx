/**
 * 下拉框
 */
import React from 'react';
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

    handleSelect(e) {
        e.preventDefault();
        this.close();
        this.props.onSelect && this.props.onSelect(e.target.getAttribute('data-value'));
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
                            <a data-value={option.value} href="javascript:" onClick={this.handleSelect.bind(this)} onMouseDown={this.handleMouseDown}>
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
                    {this.props.label}
                </button>
                {this.state.opened ?
                    menu :
                    null
                }
            </div>
        );
    }

}