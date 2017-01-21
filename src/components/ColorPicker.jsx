import React from 'react';
import ColorBlock from './ColorBlock';
import { COLORS } from '../utils/constant';
export default class ColorPicker extends React.Component {

    static propTypes = {
        colors: React.PropTypes.array,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        colors: COLORS
    };

    handleChange(color) {
        this.props.onChange && this.props.onChange(color);
    }

    render() {

        const { colors } = this.props;

        const containerStyle = {
            background: '#fff',
            width: '232px'
        };

        const bodyStyle = {
            padding: '10px 6px 6px 10px'
        };

        return (

            <div style={containerStyle} className="mui-container-fluid">
                <div style={bodyStyle} className="mui-row">
                {colors.map((color, i) =>
                    <ColorBlock color={color} key={i} onChange={this.handleChange.bind(this)}/>
                )}
                </div>
            </div>
        );
    }

}