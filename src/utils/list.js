
import { EditorState } from 'draft-js';

import {getSelectBlockMap} from './block';

import { CHANGE_TYPES } from './constant';

function changeBlocksDepth(editorState, depth, maxDepth) {
    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    let blockMap = content.getBlockMap();
    const blocks = getSelectBlockMap(editorState).map(block => {
        let newDepth = block.getDepth() + depth;
        newDepth = Math.max(0, Math.min(newDepth, maxDepth));
        return block.set('depth', newDepth);
    });
    blockMap = blockMap.merge(blocks);
    return content.merge({
        blockMap,
        selectionBefore: selection,
        selectionAfter: selection
    });
}

/**
 * 改变列表深度
 * @param editorState
 * @param depth
 */
export function changeDepth(editorState, depth, maxDepth) {

    const selection = editorState.getSelection();
    let key;
    if (selection.getIsBackward()) {
        key = selection.getFocusKey();
    } else {
        key = selection.getAnchorKey();
    }
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(key);
    const type = block.getType();
    if (['ordered-list-item', 'unordered-list-item'].indexOf(type) < 0) {
        return editorState;
    }
    const blockAbove = content.getBlockBefore(key);
    if (!blockAbove) {
        return editorState;
    }
    if (blockAbove.getType() !== type) {
        return editorState;
    }
    const blockDepth = block.getDepth();
    if (depth === 1 && blockDepth >= maxDepth) {
        return editorState;
    }
    const adjustedMaxDepth = Math.min(blockAbove.getDepth() + 1, maxDepth);
    const newContent = changeBlocksDepth(editorState, depth, adjustedMaxDepth);
    return EditorState.push(editorState, newContent, CHANGE_TYPES.ADJUST_DEPTH);
}

/**
 * 增加缩进，最多四级缩进
 * @param editorState
 * @returns {*}
 */
export function indent(editorState) {
    return changeDepth(editorState, 1, 4);
}

/**
 * 减少缩进
 * @param editorState
 * @returns {*}
 */
export function dedent(editorState) {
    return changeDepth(editorState, -1, 4);
}