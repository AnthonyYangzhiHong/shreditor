import { RichUtils, Modifier, EditorState } from 'draft-js';

import { Map } from 'immutable';

import { CHANGE_TYPES } from './constant';

export function getSelectBlockMap(editorState) {

    const selection = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const start = selection.getStartKey();
    const end = selection.getEndKey();
    const blockMap = content.getBlockMap();
    return blockMap.toSeq().skipUntil((p, c) => c === start).takeUntil((p, c) => c === end).concat([[end, blockMap.get(end)]]);

}

/**
 * 获取块
 * @param editorState
 * @returns {*}
 */
export function getSelectBlockList(editorState) {
    return getSelectBlockMap(editorState).toList();
}

/**
 * 获取块格式
 * @param editorState
 * @returns {undefined}
 */
export function getSelectBlocksType(editorState) {
    const blocks = getSelectBlockList(editorState);
    const isMultiple = blocks.some(block => block.type !== blocks.get(0).type);
    if (!isMultiple) {
        return blocks.get(0).type;
    }
    return undefined;
}

export function setBlockData(editorState, data) {
    const newState = Modifier.setBlockData(editorState.getCurrentContent(), editorState.getSelection(), data);
    return EditorState.push(editorState, newState, CHANGE_TYPES.CHANGE_BLOCK_DATA);
}

/**
 * 获取块的meta data
 * @param editorState
 */
export function getSelectBlocksMetaData(editorState) {
    let metaData = new Map({});
    const blocks = getSelectBlockList(editorState);
    if (blocks && blocks.size > 0) {
        for (let i = 0; i < blocks.size; i++) {
            const data = blocks.get(i).getData();
            if (!data || data.size === 0) {
                metaData = metaData.clear();
                break;
            }
            if (i === 0) {
                metaData = data;
            } else {
                metaData.forEach((value, key) => {
                    if (!data.get(key) || data.get(key) !== value) {
                        metaData = metaData.delete(key);
                    }
                });
                if (metaData.size === 0) {
                    metaData = metaData.clear();
                    break;
                }
            }
        }
    }
    return metaData;
}