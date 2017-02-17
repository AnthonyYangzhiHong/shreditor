import React from 'react';
import { COLORS } from '../../utils/constant';
import startsWith from 'lodash/startsWith';

class ColorBlock extends React.Component {

    static propTypes = {
        onChange: React.PropTypes.func,
        color: React.PropTypes.string
    };

    static defaultProps = {
        color: '#fff'
    };

    handleClick(e) {
        e.preventDefault();
        this.props.onChange && this.props.onChange(this.props.color);
    }

    render() {

        const { color } = this.props;

        const style = {
            background: color,
            width: '20px',
            height: '20px',
            margin: '0 6px 6px 0',
            borderRadius: '4px',
            cursor: 'pointer'
        };

        return (
            <div className="mui-col-md-1" style={style} onMouseDown={ e => e.preventDefault() } onClick={this.handleClick.bind(this)} />
        );
    }

}

export default class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            color: this.props.defaultColor
        };
    }

    static propTypes = {
        colors: React.PropTypes.array,
        onChange: React.PropTypes.func,
        defaultColor: React.PropTypes.string
    };

    static defaultProps = {
        colors: COLORS,
        defaultColor: '#fff'
    };

    handleSelect(color) {
        this.setState({
            color
        });
        this.props.onChange && this.props.onChange(color);
    }

    handleChange(e) {
        e.preventDefault();
        let hex = e.target.value;
        if (!startsWith(hex, '#')) {
            hex = '#' + hex;
        }
        this.setState({
            color: hex
        });
        this.props.onChange && this.props.onChange(hex);
    }

    render() {

        const { colors } = this.props;

        const containerStyle = {
            background: '#fff',
            width: '232px'
        };

        const selectBodyStyle = {
            padding: '10px 6px 0px 10px'
        };

        const customBodyStyle = {
            padding: '0px 10px 0px 10px'
        };

        return (

            <div style={containerStyle} className="mui-container-fluid">
                <div style={selectBodyStyle} className="mui-row">
                {colors.map((color, i) =>
                    <ColorBlock color={color} key={i} onChange={this.handleSelect.bind(this)}/>
                )}
                </div>
                {/*<div style={customBodyStyle} className="mui-row">
                    <div className="mui-textfield">
                        <input
                            type="text"
                            placeholder="HEX"
                            onChange={this.handleChange.bind(this)}
                            value={this.state.color}/>
                    </div>
                </div>*/}
            </div>
        );
    }

}