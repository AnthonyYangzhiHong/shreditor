import React from 'react';

export default class Image extends React.Component {

    render() {
        const { block, contentState } = this.props;
        let { src, alt, height, width } = contentState.getEntity(block.getEntityAt(0)).getData();
        const style = {
            height: height || "100%",
            width: width || "100%"
        };
        return (
            <img src={src} alt={alt} role="presentation" style={style}/>
        );
    }

}