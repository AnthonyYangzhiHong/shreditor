import React from 'react';

class Tab extends React.Component {

    static propTypes = {
        label: React.PropTypes.node,
        onActive: React.PropTypes.func,
        paneStyle: React.PropTypes.object
    };

    static defaultProps = {
        label: ''
    };

    render() {
        return null;
    }

}

export default class Tabs extends React.Component {

    static Tab = Tab;

    static propTypes = {
        wrapperStyle: React.PropTypes.object,
        justified: React.PropTypes.bool,
        defaultActiveKey: React.PropTypes.number,
        onChange: React.PropTypes.func
    };

    static defaultProps = {
        justified: false,
        defaultActiveKey: 0
    };

    constructor(props) {
        super(props);
        this.state = {
            currentActiveKey: props.defaultActiveKey
        };
    }

    handleTabClick(key, tab, e) {
        e.preventDefault();

        const { onChange } = this.props;
        const { onActive } = tab.props;

        this.setState({
            currentActiveKey: key
        }, () => {
            onActive && onActive();
            onChange && onChange(key);
        });
    }

    handleMouseDown(e) {
        e.preventDefault();
    }

    render() {

        const { children, wrapperStyle, justified } = this.props;

        const { currentActiveKey } = this.state;

        let tabs = React.Children.toArray(children);

        let tabHeaders = [];
        let tabPanes = [];

        tabs.forEach((tab, i) => {
            tabHeaders.push(
                <li onMouseDown={this.handleMouseDown} key={i} className={currentActiveKey === i ? "mui--is-active" : ""}>
                    <a onClick={this.handleTabClick.bind(this, i, tab)}>
                        {tab.props.label}
                    </a>
                </li>
            );
            let paneClass = "mui-tabs__pane";
            if (currentActiveKey === i) {
                paneClass += " mui--is-active";
            }
            tabPanes.push(
                <div key={i} className={paneClass} style={tab.props.paneStyle}>
                    {tab.props.children}
                </div>
            );
        });

        let ulClass = "mui-tabs__bar";
        if (justified) {
            ulClass += " mui-tabs__bar--justified";
        }

        return (
            <div style={wrapperStyle}>
                <ul className={ulClass} >
                    {tabHeaders}
                    {tabPanes}
                </ul>
            </div>
        );

    }

}