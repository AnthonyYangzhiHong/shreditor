import React from 'react';
import { RichUtils} from 'draft-js';
import { getSelectBlocksType } from '../../utils/block';
import Dropdown from '../../components/Dropdown';

import { BLOCK_TYPES } from '../../utils/constant';

import { FormattedMessage } from 'react-intl';

import find from 'lodash/find';

import './style.css';

export default class BlockType extends React.Component {

    static propTypes = {
        editorState: React.PropTypes.object,
        onChange: React.PropTypes.func,
        label: React.PropTypes.element
    };

    static defaultProps = {
        label: (
            <span className="dropdown-label">
                <FormattedMessage id="Formats" defaultMessage="Formats"/>
            </span>)
    };

    constructor(props) {
        super(props);
        this.state = {
            current: 'unstyled'
        };
    }

    componentWillReceiveProps(newProps) {
        const editorState = newProps.editorState;
        if (editorState && this.props.editorState !== editorState) {
            const blockType = getSelectBlocksType(editorState);
            if (blockType !== this.state.current) {
                if (find(BLOCK_TYPES, ['style', blockType])) {
                    this.setState({
                        current: blockType
                    });
                } else {
                    this.setState({
                        current: undefined
                    });
                }
            }
        }
    }

    handleSelect(blockType) {
        const { editorState, onChange } = this.props;
        const newState = RichUtils.toggleBlockType(editorState, blockType);
        if (newState) {
            onChange && onChange(newState);
        }
    }

    render() {

        const options = BLOCK_TYPES.map(type => {
            return {
                value: type.style,
                //label: React.createElement(type.tag, {}, <FormattedMessage id={type.label} defaultMessage={type.label}/>)
                label: <FormattedMessage id={type.label} defaultMessage={type.label}/>
            }
        });

        const currentStyle = this.state.current;
        const currentBlockType = find(BLOCK_TYPES, ['style', currentStyle]);

        const label = currentStyle ?
            <span className="dropdown-label">
                <FormattedMessage id={currentBlockType.label} defaultMessage={currentBlockType.label}/>
            </span> :
            this.props.label;

        return (
            <Dropdown options={options} onSelect={this.handleSelect.bind(this)} label={label}/>
        );
    }

}