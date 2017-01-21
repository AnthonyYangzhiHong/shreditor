import React from 'react';

import MButton from 'muicss/lib/react/button';

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
            opened: false,
            menuTop: 0
        };
    }

    handleClick(e) {
        e.preventDefault();
        if (this.state.opened) {
            this.close();
        } else {
            this.open();
        }

    }

    open() {
        let wrapperRect = this.refs.wrapper.getBoundingClientRect();
        let toggleRect = this.refs.button.getBoundingClientRect();
        this.setState({
            opened: true,
            menuTop: toggleRect.top - wrapperRect.top + toggleRect.height
        });
    }

    close() {
        this.setState({
            opened: false
        });
    }

    handleMouseDown(e) {
        e.preventDefault();
        this.props.onMouseDown && this.props.onMouseDown(e);
    }

    render() {

        return (
            <div className="mui-dropdown" ref="wrapper">
                <button ref="button" className="mui-btn mui-btn--small" onClick={this.handleClick.bind(this)} onMouseDown={this.handleMouseDown.bind(this)}>
                    {this.props.label}
                </button>
                {this.state.opened ?
                    <div ref="selectEl" style={{top: this.state.menuTop}} className="mui-dropdown__menu mui--is-open">
                        <ColorPicker {...this.props} />
                    </div> :
                    null
                }
            </div>
        );

    }

}