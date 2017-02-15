import { RichUtils, Modifier, EditorState } from 'draft-js';

import { getSelectBlock, getSelectBlockList } from './block';
import { INLINE_STYLES, CUSTOM_INLINE_STYLES, CHANGE_TYPES } from './constant';

/**
 * 获取内联样式
 * @param editorState
 */
export function getSelectInlineStyle(editorState) {

    const selection = editorState.getSelection();
    const start = selection.getStartOffset();
    const end = selection.getEndOffset();
    const blockList = getSelectBlockList(editorState);
    const inlineStyles = {};
    if (blockList.size > 0) {
        for (let i = 0; i < blockList.size; i++) {
            const block = blockList.get(i);
            let blockStart = i === 0 ? start : 0;
            let blockEnd = i === (blockList.size - 1) ? end : block.getText().length;
            if (blockStart == blockEnd) {
                if (blockStart === 0) {
                    blockStart = 1;
                    blockEnd = 2;
                } else {
                    blockStart -= 1;
                }
            }
            for (let j = blockStart; j < blockEnd; j++) {
                const inlineStylesAtOffset = block.getInlineStyleAt(j);
                INLINE_STYLES.forEach(style => {
                    if (inlineStylesAtOffset.get(style)) {
                        inlineStyles[style] = true;
                    }
                });
            }
        }
    }
    return inlineStyles;
}

/**
 * 设置内置内联样式
 * @param editorState
 * @param style
 * @returns {EditorState}
 */
export function toggleInlineStyle(editorState, style) {
    let newState = RichUtils.toggleInlineStyle(editorState, style);
    if (['SUPERSCRIPT', 'SUBSCRIPT'].indexOf(style) >= 0) {
        const removeStyle =  style === 'SUPERSCRIPT' ? 'SUBSCRIPT' : 'SUPERSCRIPT';
        const contentState = Modifier.removeInlineStyle(newState.getCurrentContent(), newState.getSelection(), removeStyle);
        newState = EditorState.push(newState, contentState, CHANGE_TYPES.CHANGE_INLINE_STYLE);
    }
    return newState;
}

/**
 * 获取自定义内联样式
 * @param editorState
 * @param styles
 * @returns {{}}
 */
export function getCustomSelectInlineStyle(editorState, styles) {
    const selection = editorState.getSelection();
    const start = selection.getStartOffset();
    const end = selection.getEndOffset();
    const blockList = getSelectBlockList(editorState);
    const inlineStyles = {};
    if (blockList.size > 0 && styles.length > 0) {
        for (let i = 0; i < blockList.size; i++) {
            const block = blockList.get(i);
            let blockStart = i === 0 ? start : 0;
            let blockEnd = i === (blockList.size - 1) ? end : block.getText().length;
            if (blockStart == blockEnd) {
                if (blockStart === 0) {
                    blockStart = 1;
                    blockEnd = 2;
                } else {
                    blockStart -= 1;
                }
            }
            for (let j = blockStart; j < blockEnd; j++) {
                if (j === blockStart) {
                    styles.forEach(style => {
                        inlineStyles[style] = getStyleAtOffset(block, style, j);
                    });
                } else {
                    styles.forEach(style => {
                        if (inlineStyles[style] && inlineStyles[style] !== getStyleAtOffset(block, style, j)) {
                            inlineStyles[style] = undefined;
                        }
                    });
                }
            }
        }
    }
    return inlineStyles;
}

function getStyleAtOffset(block, stylePrefix, offset) {
    const inlineStyles = block.getInlineStyleAt(offset).toList();
    const inlineStyle = inlineStyles.filter(style => style.startsWith(stylePrefix));
    if (inlineStyle && inlineStyle.size > 0) {
        return inlineStyle.get(0);
    } else {
        return undefined;
    }
}

/**
 * 设置自定义内联样式
 * @param editorState
 * @param type
 * @param style
 * @returns {EditorState}
 */
export function toggleCustomInlineStyle(editorState, type, style) {

    const selection = editorState.getSelection();
    const newContentState = Object.keys(CUSTOM_INLINE_STYLES[type]).reduce((contentState, style) => {
        return Modifier.removeInlineStyle(contentState, selection, style)
    }, editorState.getCurrentContent());
    let newEditorState = EditorState.push(editorState, newContentState, CHANGE_TYPES.CHANGE_INLINE_STYLE);
    const currentStyle = editorState.getCurrentInlineStyle();
    if (selection.isCollapsed()) {
        newEditorState = currentStyle.reduce((state, style) => RichUtils.toggleInlineStyle(state, style), newEditorState);
    }
    if (!currentStyle.has(style)) {
        newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
    }
    return newEditorState;
}

/**
 * 获取选中实体
 * @param editorState
 * @returns {*}
 */
export function getSelectEntityKey(editorState) {
    let entityKey;
    const selection = editorState.getSelection();
    let start = selection.getStartOffset();
    let end = selection.getEndOffset();
    if (start === end && start === 0) {
        end = 1;
    } else if (start === end) {
        start -= 1;
    }
    const block = getSelectBlock(editorState);
    for (let i = start; i < end; i ++ ) {
        const currentEntityKey = block.getEntityAt(i);
        if (!currentEntityKey) {
            entityKey = undefined;
            break;
        }
        if (i === start) {
            entityKey = currentEntityKey;
        } else if (entityKey !== currentEntityKey) {
            entityKey = undefined;
            break;
        }
    }
    return entityKey;
}

/**
 * 获取实体对象范围
 * @param editorState
 * @param entityKey
 * @returns {*}
 */
export function getEntityRange(editorState, entityKey) {
    const block = getSelectBlock(editorState);
    let entityRange;
    block.findEntityRanges(value => value.get('entity') === entityKey, (start, end) => {
        entityRange = {
            start,
            end,
            text: block.get('text').slice(start, end)
        };
    });
    return entityRange;
}