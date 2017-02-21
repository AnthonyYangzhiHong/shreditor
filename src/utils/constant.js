
import isObject from 'lodash/isObject';

/**
 * 块样式
 * @type {[*]}
 */
export const BLOCK_TYPES = [{
    label: 'Heading 1',
    style: 'header-one',
    tag: 'h1'
}, {
    label: 'Heading 2',
    style: 'header-two',
    tag: 'h2'
}, {
    label: 'Heading 3',
    style: 'header-three',
    tag: 'h3'
}, {
    label: 'Heading 4',
    style: 'header-four',
    tag: 'h4'
}, {
    label: 'Heading 5',
    style: 'header-five',
    tag: 'h5'
}, {
    label: 'Heading 6',
    style: 'header-six',
    tag: 'h6'
}, {
    label: 'Blockquote',
    style: 'blockquote',
    tag: 'blockquote'
}, {
    label: 'Code',
    style: 'code-block',
    tag: 'pre'
}, {
    label: 'Normal',
    style: 'unstyled',
    tag: 'div'
}];

/**
 * 对齐方向
 * @type {[*]}
 */
export const TEXT_ALIGN_DIRECTIONS = ['AlignLeft', 'AlignRight', 'AlignCenter', 'AlignJustify'];

/**
 * 列表类型
 * @type {[*]}
 */
export const LIST_TYPES = ['ListOL', 'ListUL'];

/**
 * 列表缩进
 * @type {[*]}
 */
export const LIST_INDENTS = ['INDENT', 'DEDENT'];

/**
 * 内敛样式
 * @type {[*]}
 */
export const INLINE_STYLES = [
    'BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE', 'SUPERSCRIPT', 'SUBSCRIPT'
];

export const FONT_SIZES = [8, 9, 10, 11, 12, 14, 18, 24, 30, 36, 48, 60, 72, 96];

export const FONT_FAMILIES = [
    'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana',
    {
        name: '微软雅黑',
        fontFamily: '"Microsoft YaHei", "微软雅黑", "STXihei"'
    }, {
        name: '黑体',
        fontFamily: '"SimHei", "黑体", "STHeiti"'
    }, {
        name: '宋体',
        fontFamily: '"SimSun", "宋体", "STSong"'
    }, {
        name: '楷体',
        fontFamily: '"KaiTi", "楷体", "STKaiti"'
    }, {
        name: '仿宋',
        fontFamily: '"FangSong", "仿宋", "STFangsong"'
    }
];

export const COLORS = [
    '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4',
    '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107',
    '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B', '#000000', '#FFFFFF'
];

/**
 * 自定义内联样式
 * @type {{*}}
 */
export const CUSTOM_INLINE_STYLES = {
    FONT_SIZE: {},
    FONT_FAMILY: {},
    FONT_COLOR: {},
    FONT_BACKGROUND: {}
};

/**
 * 转换为HTML时的映射
 * @type {{}}
 */
export const HTML_INLINE_OPTIONS = {};

FONT_SIZES.forEach(fontSize => {
   CUSTOM_INLINE_STYLES.FONT_SIZE[`FONT_SIZE-${fontSize}`] = {fontSize};
   HTML_INLINE_OPTIONS[`FONT_SIZE-${fontSize}`] = { style: { fontSize } };
});

FONT_FAMILIES.forEach(fontFamily => {
    if (isObject(fontFamily)) {
        CUSTOM_INLINE_STYLES.FONT_FAMILY[`FONT_FAMILY-${fontFamily.name}`] = {fontFamily: fontFamily.fontFamily};
        HTML_INLINE_OPTIONS[`FONT_FAMILY-${fontFamily.name}`] = { style: {fontFamily: fontFamily.fontFamily}};
    } else {
        CUSTOM_INLINE_STYLES.FONT_FAMILY[`FONT_FAMILY-${fontFamily}`] = {fontFamily};
        HTML_INLINE_OPTIONS[`FONT_FAMILY-${fontFamily}`] = { style: {fontFamily}};
    }
});

COLORS.forEach(color => {
    CUSTOM_INLINE_STYLES.FONT_COLOR[`FONT_COLOR-${color}`] = {color};
    CUSTOM_INLINE_STYLES.FONT_BACKGROUND[`FONT_BACKGROUND-${color}`] = {background: color};
    HTML_INLINE_OPTIONS[`FONT_COLOR-${color}`] = { style: {color} };
    HTML_INLINE_OPTIONS[`FONT_BACKGROUND-${color}`] = { style: {background: color} };
});



/**
 * custom style map
 * @type {{}}
 */
export const CUSTOM_STYLE_MAP = {
    ...CUSTOM_INLINE_STYLES.FONT_SIZE,
    ...CUSTOM_INLINE_STYLES.FONT_FAMILY,
    ...CUSTOM_INLINE_STYLES.FONT_COLOR,
    ...CUSTOM_INLINE_STYLES.FONT_BACKGROUND,
    SUPERSCRIPT: {
        fontSize: 11,
        position: 'relative',
        top: -8,
        display: 'inline-flex',
    },
    SUBSCRIPT: {
        fontSize: 11,
        position: 'relative',
        bottom: -8,
        display: 'inline-flex',
    }
};

/**
 * EditorChangeTypes
 * @type {{*}}
 */
export const CHANGE_TYPES = {
    ADJUST_DEPTH: 'adjust-depth',
    APPLY_ENTITY: 'apply-entity',
    BACKSPACE_CHARACTER: 'backspace-character',
    CHANGE_BLOCK_DATA: 'change-block-data',
    CHANGE_BLOCK_TYPE: 'change-block-type',
    CHANGE_INLINE_STYLE: 'change-inline-style',
    MOVE_BLOCK: 'move-block',
    DELETE_CHARACTER: 'delete-character',
    INSERT_CHARACTERS: 'insert-characters',
    INSERT_FRAGMENT: 'insert-fragment',
    REDO: 'redo',
    REMOVE_RANGE: 'remove-range',
    SPELLCHECK_CHANGE: 'spellcheck-change',
    SPLIT_BLOCK: 'split-block',
    UNDO: 'undo'
};