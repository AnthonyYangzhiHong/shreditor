import React from 'react';


export default class ColorBlock extends React.Component {

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
            <div className="mui-col-md-1" style={style} onMouseDown={e=>e.preventDefault()} onClick={this.handleClick.bind(this)} />
        );
    }

}