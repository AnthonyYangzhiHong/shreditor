import React from 'react';

class Link extends React.Component {

    render() {
        const { url } = this.props.contentState.getEntity(this.props.entityKey).getData();
        return (
            <a href={url} target="_blank">{this.props.children}</a>
        );
    }
}

function findLinkEntities(block, callback, contentState) {
    block.findEntityRanges(character => {
        const entityKey = character.getEntity();
        return (entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK');
    }, callback);
}

export default {
    component: Link,
    strategy: findLinkEntities
}