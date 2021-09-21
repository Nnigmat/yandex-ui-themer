/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../html-to-figma/build/figma/dropOffset.js":
/*!*****************************************************!*\
  !*** ../../html-to-figma/build/figma/dropOffset.js ***!
  \*****************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDropOffset": function() { return /* binding */ getDropOffset; }
/* harmony export */ });
function getDropOffset(payload) {
    const { dropPosition, windowSize, offset } = payload;
    const { bounds, zoom } = figma.viewport;
    const hasUI = Math.abs((bounds.width * zoom) / windowSize.width) < 0.99;
    const leftPaneWidth = windowSize.width - bounds.width * zoom - 240;
    const xFromCanvas = hasUI
        ? dropPosition.clientX - leftPaneWidth
        : dropPosition.clientX;
    const yFromCanvas = hasUI ? dropPosition.clientY - 40 : dropPosition.clientY;
    return {
        x: bounds.x + xFromCanvas / zoom - offset.x,
        y: bounds.y + yFromCanvas / zoom - offset.y
    };
}


/***/ }),

/***/ "../../html-to-figma/build/figma/getFont.js":
/*!**************************************************!*\
  !*** ../../html-to-figma/build/figma/getFont.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultFont": function() { return /* binding */ defaultFont; },
/* harmony export */   "getMatchingFont": function() { return /* binding */ getMatchingFont; }
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fontCache = {};
const normalizeName = (str) => str.toLowerCase().replace(/[^a-z]/gi, '');
const defaultFont = { family: 'Roboto', style: 'Regular' };
let cachedAvailableFonts = null;
const getAvailableFontNames = () => __awaiter(void 0, void 0, void 0, function* () {
    if (cachedAvailableFonts) {
        return cachedAvailableFonts;
    }
    else {
        return (yield figma.listAvailableFontsAsync()).filter((font) => font.fontName.style === 'Regular');
    }
});
// TODO: keep list of fonts not found
function getMatchingFont(fontStr) {
    return __awaiter(this, void 0, void 0, function* () {
        const cached = fontCache[fontStr];
        if (cached) {
            return cached;
        }
        const availableFonts = yield getAvailableFontNames();
        const familySplit = fontStr.split(/\s*,\s*/);
        for (const family of familySplit) {
            const normalized = normalizeName(family);
            for (const availableFont of availableFonts) {
                const normalizedAvailable = normalizeName(availableFont.fontName.family);
                if (normalizedAvailable === normalized) {
                    const cached = fontCache[normalizedAvailable];
                    if (cached) {
                        return cached;
                    }
                    yield figma.loadFontAsync(availableFont.fontName);
                    fontCache[fontStr] = availableFont.fontName;
                    fontCache[normalizedAvailable] = availableFont.fontName;
                    return availableFont.fontName;
                }
            }
        }
        return defaultFont;
    });
}


/***/ }),

/***/ "../../html-to-figma/build/figma/helpers.js":
/*!**************************************************!*\
  !*** ../../html-to-figma/build/figma/helpers.js ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "assign": function() { return /* binding */ assign; },
/* harmony export */   "cloneObject": function() { return /* binding */ cloneObject; }
/* harmony export */ });
const allPropertyNames = [
    'id',
    'width',
    'height',
    'currentPage',
    'cancel',
    'origin',
    'onmessage',
    'center',
    'zoom',
    'fontName',
    'name',
    'visible',
    'locked',
    'constraints',
    'relativeTransform',
    'x',
    'y',
    'rotation',
    'constrainProportions',
    'layoutAlign',
    'layoutGrow',
    'opacity',
    'blendMode',
    'isMask',
    'effects',
    'effectStyleId',
    'expanded',
    'backgrounds',
    'backgroundStyleId',
    'fills',
    'strokes',
    'strokeWeight',
    'strokeMiterLimit',
    'strokeAlign',
    'strokeCap',
    'strokeJoin',
    'dashPattern',
    'fillStyleId',
    'strokeStyleId',
    'cornerRadius',
    'cornerSmoothing',
    'topLeftRadius',
    'topRightRadius',
    'bottomLeftRadius',
    'bottomRightRadius',
    'exportSettings',
    'overflowDirection',
    'numberOfFixedChildren',
    'description',
    'layoutMode',
    'primaryAxisSizingMode',
    'counterAxisSizingMode',
    'primaryAxisAlignItems',
    'counterAxisAlignItems',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',
    'itemSpacing',
    'layoutGrids',
    'gridStyleId',
    'clipsContent',
    'guides',
    'guides',
    'selection',
    'selectedTextRange',
    'backgrounds',
    'arcData',
    'pointCount',
    'pointCount',
    'innerRadius',
    'vectorNetwork',
    'vectorPaths',
    'handleMirroring',
    'textAlignHorizontal',
    'textAlignVertical',
    'textAutoResize',
    'paragraphIndent',
    'paragraphSpacing',
    'autoRename',
    'textStyleId',
    'fontSize',
    'fontName',
    'textCase',
    'textDecoration',
    'letterSpacing',
    'lineHeight',
    'characters',
    'mainComponent',
    'scaleFactor',
    'booleanOperation',
    'expanded',
    'name',
    'type',
    'paints',
    'type',
    'fontSize',
    'textDecoration',
    'fontName',
    'letterSpacing',
    'lineHeight',
    'paragraphIndent',
    'paragraphSpacing',
    'textCase',
    'type',
    'effects',
    'type',
    'layoutGrids',
];
function assign(a, b) {
    for (const key in b) {
        const value = b[key];
        if (key === 'data' && value && typeof value === 'object') {
            const currentData = JSON.parse(a.getSharedPluginData('builder', 'data') || '{}') ||
                {};
            const newData = value;
            const mergedData = Object.assign({}, currentData, newData);
            // TODO merge plugin data
            a.setSharedPluginData('builder', 'data', JSON.stringify(mergedData));
        }
        else if (typeof value != 'undefined' &&
            ['width', 'height', 'type', 'ref', 'children', 'svg'].indexOf(key) === -1) {
            try {
                a[key] = b[key];
            }
            catch (err) {
                console.warn(`Assign error for property "${key}"`, a, b, err);
            }
        }
    }
}
// The Figma nodes are hard to inspect at a glance because almost all properties are non enumerable
// getters. This removes that wrapping for easier inspecting
const cloneObject = (obj, valuesSet = new Set()) => {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }
    const newObj = Array.isArray(obj) ? [] : {};
    for (const property of allPropertyNames) {
        const value = obj[property];
        if (value !== undefined && typeof value !== 'symbol') {
            newObj[property] = obj[property];
        }
    }
    return newObj;
};


/***/ }),

/***/ "../../html-to-figma/build/figma/images.js":
/*!*************************************************!*\
  !*** ../../html-to-figma/build/figma/images.js ***!
  \*************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processImages": function() { return /* binding */ processImages; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

function processImages(layer) {
    return __awaiter(this, void 0, void 0, function* () {
        const images = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getImageFills)(layer);
        return (images &&
            Promise.all(images.map((image) => __awaiter(this, void 0, void 0, function* () {
                if (image && image.intArr) {
                    image.imageHash = yield figma.createImage(image.intArr)
                        .hash;
                    delete image.intArr;
                }
            }))));
    });
}


/***/ }),

/***/ "../../html-to-figma/build/figma/index.js":
/*!************************************************!*\
  !*** ../../html-to-figma/build/figma/index.js ***!
  \************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLayersToFrame": function() { return /* binding */ addLayersToFrame; },
/* harmony export */   "defaultFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.defaultFont; },
/* harmony export */   "getMatchingFont": function() { return /* reexport safe */ _getFont__WEBPACK_IMPORTED_MODULE_2__.getMatchingFont; },
/* harmony export */   "getDropOffset": function() { return /* reexport safe */ _dropOffset__WEBPACK_IMPORTED_MODULE_3__.getDropOffset; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
/* harmony import */ var _processLayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./processLayer */ "../../html-to-figma/build/figma/processLayer.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "../../html-to-figma/build/figma/getFont.js");
/* harmony import */ var _dropOffset__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dropOffset */ "../../html-to-figma/build/figma/dropOffset.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


function addLayersToFrame(layers, baseFrame, onLayerProcess) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const rootLayer of layers) {
            yield (0,_utils__WEBPACK_IMPORTED_MODULE_0__.traverseAsync)(rootLayer, (layer, parent) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const node = yield (0,_processLayer__WEBPACK_IMPORTED_MODULE_1__.processLayer)(layer, parent, baseFrame);
                    onLayerProcess === null || onLayerProcess === void 0 ? void 0 : onLayerProcess({ node, layer, parent });
                }
                catch (err) {
                    console.warn('Error on layer:', layer, err);
                }
            }));
        }
    });
}




/***/ }),

/***/ "../../html-to-figma/build/figma/processLayer.js":
/*!*******************************************************!*\
  !*** ../../html-to-figma/build/figma/processLayer.js ***!
  \*******************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processLayer": function() { return /* binding */ processLayer; }
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "../../html-to-figma/build/utils.js");
/* harmony import */ var _images__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images */ "../../html-to-figma/build/figma/images.js");
/* harmony import */ var _getFont__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getFont */ "../../html-to-figma/build/figma/getFont.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "../../html-to-figma/build/figma/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const processDefaultElement = (layer, node) => {
    node.x = layer.x;
    node.y = layer.y;
    node.resize(layer.width || 1, layer.height || 1);
    (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.assign)(node, layer);
    // rects.push(frame);
    return node;
};
const createNodeFromLayer = (layer) => {
    if (layer.type === 'FRAME' || layer.type === 'GROUP') {
        return figma.createFrame();
    }
    if (layer.type === 'SVG' && layer.svg) {
        return figma.createNodeFromSvg(layer.svg);
    }
    if (layer.type === 'RECTANGLE') {
        return figma.createRectangle();
    }
    if (layer.type === 'TEXT') {
        return figma.createText();
    }
    if (layer.type === 'COMPONENT') {
        return figma.createComponent();
    }
};
const SIMPLE_TYPES = ['FRAME', 'GROUP', 'SVG', 'RECTANGLE', 'COMPONENT'];
const processLayer = (layer, parent, baseFrame) => __awaiter(void 0, void 0, void 0, function* () {
    const parentFrame = (parent === null || parent === void 0 ? void 0 : parent.ref) || baseFrame;
    if (typeof layer.x !== 'number' || typeof layer.y !== 'number') {
        throw Error('Layer coords not defined');
    }
    const node = createNodeFromLayer(layer);
    if (!node) {
        throw Error(`${layer.type} not implemented`);
    }
    if (SIMPLE_TYPES.includes(layer.type)) {
        parentFrame.appendChild(processDefaultElement(layer, node));
    }
    // @ts-expect-error
    layer.ref = node;
    if (layer.type === 'RECTANGLE') {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.getImageFills)(layer)) {
            yield (0,_images__WEBPACK_IMPORTED_MODULE_1__.processImages)(layer);
        }
    }
    if (layer.type === 'TEXT') {
        const text = node;
        if (layer.fontFamily) {
            text.fontName = yield (0,_getFont__WEBPACK_IMPORTED_MODULE_2__.getMatchingFont)(layer.fontFamily);
            delete layer.fontFamily;
        }
        (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.assign)(text, layer);
        text.resize(layer.width || 1, layer.height || 1);
        text.textAutoResize = 'HEIGHT';
        let adjustments = 0;
        if (layer.lineHeight) {
            text.lineHeight = layer.lineHeight;
        }
        // Adjust text width
        while (typeof layer.height === 'number' &&
            text.height > layer.height) {
            if (adjustments++ > 5) {
                console.warn('Too many font adjustments', text, layer);
                break;
            }
            try {
                text.resize(text.width + 1, text.height);
            }
            catch (err) {
                console.warn('Error on resize text:', layer, text, err);
            }
        }
        parentFrame.appendChild(text);
    }
    return node;
});


/***/ }),

/***/ "../../html-to-figma/build/utils.js":
/*!******************************************!*\
  !*** ../../html-to-figma/build/utils.js ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasChildren": function() { return /* binding */ hasChildren; },
/* harmony export */   "traverse": function() { return /* binding */ traverse; },
/* harmony export */   "traverseMap": function() { return /* binding */ traverseMap; },
/* harmony export */   "traverseAsync": function() { return /* binding */ traverseAsync; },
/* harmony export */   "size": function() { return /* binding */ size; },
/* harmony export */   "capitalize": function() { return /* binding */ capitalize; },
/* harmony export */   "getRgb": function() { return /* binding */ getRgb; },
/* harmony export */   "fastClone": function() { return /* binding */ fastClone; },
/* harmony export */   "toNum": function() { return /* binding */ toNum; },
/* harmony export */   "toPercent": function() { return /* binding */ toPercent; },
/* harmony export */   "parseUnits": function() { return /* binding */ parseUnits; },
/* harmony export */   "parseBoxShadowValue": function() { return /* binding */ parseBoxShadowValue; },
/* harmony export */   "getOpacity": function() { return /* binding */ getOpacity; },
/* harmony export */   "parseBoxShadowValues": function() { return /* binding */ parseBoxShadowValues; },
/* harmony export */   "getImageFills": function() { return /* binding */ getImageFills; },
/* harmony export */   "defaultPlaceholderColor": function() { return /* binding */ defaultPlaceholderColor; }
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const hasChildren = (node) => 
// @ts-expect-error
node && Array.isArray(node.children);
function traverse(layer, cb, parent = null) {
    if (layer) {
        cb(layer, parent);
        if (hasChildren(layer)) {
            // @ts-expect-error
            layer.children.forEach((child) => traverse(child, cb, layer));
        }
    }
}
function traverseMap(layer, cb, parent = null) {
    var _a;
    if (layer) {
        const newLayer = cb(layer, parent);
        // @ts-expect-error
        if ((_a = newLayer === null || newLayer === void 0 ? void 0 : newLayer.children) === null || _a === void 0 ? void 0 : _a.length) {
            // @ts-expect-error
            newLayer.children = newLayer.children.map((child) => traverseMap(child, cb, layer));
        }
        return newLayer;
    }
}
function traverseAsync(layer, cb, parent = null) {
    return __awaiter(this, void 0, void 0, function* () {
        if (layer) {
            yield cb(layer, parent);
            if (hasChildren(layer)) {
                // @ts-ignore
                for (let child of layer.children.reverse()) {
                    yield traverseAsync(child, cb, layer);
                }
            }
        }
    });
}
function size(obj) {
    return Object.keys(obj).length;
}
const capitalize = (str) => str[0].toUpperCase() + str.substring(1);
function getRgb(colorString) {
    if (!colorString) {
        return null;
    }
    const [_1, r, g, b, _2, a] = (colorString.match(/rgba?\(([\d\.]+), ([\d\.]+), ([\d\.]+)(, ([\d\.]+))?\)/) || []);
    const none = a && parseFloat(a) === 0;
    if (r && g && b && !none) {
        return {
            r: parseInt(r) / 255,
            g: parseInt(g) / 255,
            b: parseInt(b) / 255,
            a: a ? parseFloat(a) : 1,
        };
    }
    return null;
}
const fastClone = (data) => typeof data === 'symbol' ? null : JSON.parse(JSON.stringify(data));
const toNum = (v) => {
    // if (!/px$/.test(v) && v !== '0') return v;
    if (!/px$/.test(v) && v !== '0')
        return 0;
    const n = parseFloat(v);
    // return !isNaN(n) ? n : v;
    return !isNaN(n) ? n : 0;
};
const toPercent = (v) => {
    // if (!/px$/.test(v) && v !== '0') return v;
    if (!/%$/.test(v) && v !== '0')
        return 0;
    const n = parseInt(v);
    // return !isNaN(n) ? n : v;
    return !isNaN(n) ? n / 100 : 0;
};
const parseUnits = (str, relative) => {
    if (!str) {
        return null;
    }
    let value = toNum(str);
    if (relative && !value) {
        const percent = toPercent(str);
        if (!percent)
            return null;
        value = relative * percent;
    }
    // const match = str.match(/([\d\.]+)px/);
    // const val = match && match[1];
    if (value) {
        return {
            unit: 'PIXELS',
            value,
        };
    }
    return null;
};
const LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
const isLength = (v) => v === '0' || LENGTH_REG.test(v);
const parseMultipleCSSValues = (str) => {
    const parts = [];
    let lastSplitIndex = 0;
    let skobka = false;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ',' && !skobka) {
            parts.push(str.slice(lastSplitIndex, i));
            lastSplitIndex = i + 1;
        }
        else if (str[i] === '(') {
            skobka = true;
        }
        else if (str[i] === ')') {
            skobka = false;
        }
    }
    parts.push(str.slice(lastSplitIndex));
    return parts.map(s => s.trim());
};
const parseBoxShadowValue = (str) => {
    // TODO: this is broken for multiple box shadows
    if (str.startsWith('rgb')) {
        // Werid computed style thing that puts the color in the front not back
        const colorMatch = str.match(/(rgba?\(.+?\))(.+)/);
        if (colorMatch) {
            str = (colorMatch[2] + ' ' + colorMatch[1]).trim();
        }
    }
    const PARTS_REG = /\s(?![^(]*\))/;
    const parts = str.split(PARTS_REG);
    const inset = parts.includes('inset');
    const last = parts.slice(-1)[0];
    const color = !isLength(last) ? last : 'rgba(0, 0, 0, 1)';
    const nums = parts
        .filter((n) => n !== 'inset')
        .filter((n) => n !== color)
        .map(toNum);
    const [offsetX, offsetY, blurRadius, spreadRadius] = nums;
    const parsedColor = getRgb(color);
    if (!parsedColor) {
        console.error('Parse color error: ' + color);
    }
    return {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color: parsedColor || { r: 0, g: 0, b: 0, a: 1 },
    };
};
const getOpacity = (styles) => {
    return Number(styles.opacity);
};
const parseBoxShadowValues = (str) => {
    const values = parseMultipleCSSValues(str);
    return values.map(s => parseBoxShadowValue(s));
};
function getImageFills(layer) {
    const images = Array.isArray(layer.fills) &&
        layer.fills.filter((item) => item.type === 'IMAGE');
    return images;
}
const defaultPlaceholderColor = getRgb('rgba(178, 178, 178, 1)');


/***/ }),

/***/ "./src/helpers/colors.ts":
/*!*******************************!*\
  !*** ./src/helpers/colors.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "figmaRGBToWebRGB": function() { return /* binding */ figmaRGBToWebRGB; },
/* harmony export */   "figmaRGBToHex": function() { return /* binding */ figmaRGBToHex; },
/* harmony export */   "webRGBToFigmaRGB": function() { return /* binding */ webRGBToFigmaRGB; },
/* harmony export */   "hexToFigmaRGB": function() { return /* binding */ hexToFigmaRGB; },
/* harmony export */   "hexToRgb": function() { return /* binding */ hexToRgb; },
/* harmony export */   "RGBAToHexA": function() { return /* binding */ RGBAToHexA; },
/* harmony export */   "hslaToRgba": function() { return /* binding */ hslaToRgba; },
/* harmony export */   "convertToFigmaColor": function() { return /* binding */ convertToFigmaColor; }
/* harmony export */ });
// import {hexToFigmaRGB, webRGBToFigmaRGB} from '@figma-plugin/helpers';
const namesRGB = ['r', 'g', 'b'];
function figmaRGBToWebRGB(color) {
    const rgb = [];
    namesRGB.forEach((e, i) => {
        // @ts-expect-error
        rgb[i] = Math.round(color[e] * 255);
    });
    if (color['a'] !== undefined)
        rgb[3] = Math.round(color['a'] * 100) / 100;
    return rgb;
}
function figmaRGBToHex(color) {
    let hex = '#';
    const rgb = figmaRGBToWebRGB(color);
    hex += ((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1);
    if (rgb[3] !== undefined) {
        const a = Math.round(rgb[3] * 255).toString(16);
        if (a.length == 1) {
            hex += '0' + a;
        }
        else {
            if (a !== 'ff')
                hex += a;
        }
    }
    return hex;
}
function webRGBToFigmaRGB(color) {
    const rgb = { r: 0, g: 0, b: 0 };
    namesRGB.forEach((e, i) => {
        // @ts-expect-error
        rgb[e] = color[i] / 255;
    });
    if (color[3] !== undefined)
        rgb['a'] = color[3];
    return rgb;
}
function hexToFigmaRGB(color) {
    let opacity = '';
    color = color.toLowerCase();
    if (color[0] === '#')
        color = color.slice(1);
    if (color.length === 3) {
        color = color.replace(/(.)(.)(.)?/g, '$1$1$2$2$3$3');
    }
    else if (color.length === 8) {
        const arr = color.match(/(.{6})(.{2})/);
        // @ts-expect-error
        color = arr[1];
        // @ts-expect-error
        opacity = arr[2];
    }
    const num = parseInt(color, 16);
    const rgb = [num >> 16, (num >> 8) & 255, num & 255];
    if (opacity) {
        rgb.push(parseInt(opacity, 16) / 255);
        return webRGBToFigmaRGB(rgb);
    }
    else {
        return webRGBToFigmaRGB(rgb);
    }
}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        }
        : null;
}
function RGBAToHexA(red, green, blue, alpha) {
    const r = parseInt(red, 10);
    const g = parseInt(green, 10);
    const b = parseInt(blue, 10);
    const a = Number(parseFloat(alpha).toFixed(2));
    const outParts = [
        r.toString(16),
        g.toString(16),
        b.toString(16),
        Math.round(a * 255)
            .toString(16)
            .substring(0, 2),
    ];
    // Pad single-digit output values
    outParts.forEach((part, i) => {
        if (part.length === 1) {
            outParts[i] = `0${part}`;
        }
    });
    return `#${outParts.join('')}`;
}
function hslaToRgba(hslaValues) {
    const h = hslaValues[0];
    let s = hslaValues[1];
    let l = hslaValues[2];
    let a = 1;
    if (hslaValues[3]) {
        a = hslaValues[3];
    }
    // Must be fractions of 1
    s /= 100;
    l /= 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;
    if (h >= 0 && h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h >= 60 && h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h >= 120 && h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h >= 180 && h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h >= 240 && h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else if (h >= 300 && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);
    return [r, g, b, a];
}
function convertToFigmaColor(input) {
    let color;
    let opacity;
    if (input.startsWith('rgb')) {
        const rgbValues = input.replace(/^rgba?\(|\s+|\)$/g, '').split(',').map(n => Number(n));
        // @ts-ignore
        const { r, g, b, a = 1 } = webRGBToFigmaRGB(rgbValues);
        color = { r, g, b };
        opacity = Number(a);
    }
    else if (input.startsWith('hsl')) {
        const hslValues = input.replace(/^hsla?\(|\s+|%|\)$/g, '').split(',').map(n => Number(n));
        ;
        const rgbValues = hslaToRgba(hslValues);
        const { r, g, b, a = 1 } = webRGBToFigmaRGB(rgbValues);
        color = { r, g, b };
        opacity = Number(a);
    }
    else {
        const { r, g, b, a = 1 } = hexToFigmaRGB(input);
        color = { r, g, b };
        opacity = Number(a);
    }
    return {
        color,
        opacity,
    };
}


/***/ }),

/***/ "./src/helpers/gradients.ts":
/*!**********************************!*\
  !*** ./src/helpers/gradients.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMatrixForDegrees": function() { return /* binding */ getMatrixForDegrees; },
/* harmony export */   "getDegreesForMatrix": function() { return /* binding */ getDegreesForMatrix; },
/* harmony export */   "convertDegreeToNumber": function() { return /* binding */ convertDegreeToNumber; },
/* harmony export */   "convertFigmaGradientToString": function() { return /* binding */ convertFigmaGradientToString; },
/* harmony export */   "convertStringToFigmaGradient": function() { return /* binding */ convertStringToFigmaGradient; }
/* harmony export */ });
/* harmony import */ var _colors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./colors */ "./src/helpers/colors.ts");


function getTx(deg) {
    if (deg >= 120) {
        if (deg >= 180) {
            return 1;
        }
        return 0.5;
    }
    return 0;
}
// Gets a Matrix for a degree value
// If you read this and know math (unlike me), PLEASE fix this D:
function getMatrixForDegrees(deg) {
    const rad = parseFloat(deg) * (Math.PI / 180);
    const a = Math.round(Math.cos(rad) * 100) / 100;
    const b = Math.round(Math.sin(rad) * 100) / 100;
    const c = -Math.round(Math.sin(rad) * 100) / 100;
    const d = Math.round(Math.cos(rad) * 100) / 100;
    const degNumber = Number(deg);
    const tx = getTx(degNumber);
    const ty = degNumber >= 120 ? 1 : 0;
    return [
        [a, b, tx],
        [c, d, ty],
    ];
}
function convertToDegrees(matrix) {
    const values = [...matrix[0], ...matrix[1]];
    const a = values[0];
    const b = values[1];
    const angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle < 0 ? angle + 360 : angle;
}
function getDegreesForMatrix(matrix) {
    const degrees = convertToDegrees(matrix) || 0;
    return `${degrees}deg`;
}
function convertDegreeToNumber(degree) {
    return degree.split('deg').join('');
}
function convertFigmaGradientToString(paint) {
    const { gradientTransform, gradientStops } = paint;
    const gradientStopsString = gradientStops
        .map((stop) => `${(0,_colors__WEBPACK_IMPORTED_MODULE_0__.figmaRGBToHex)(stop.color)} ${Math.round(stop.position * 100 * 100) / 100}%`)
        .join(', ');
    const gradientTransformString = getDegreesForMatrix(gradientTransform);
    return `linear-gradient(${gradientTransformString}, ${gradientStopsString})`;
}
function convertStringToFigmaGradient(value) {
    const [gradientDegrees, ...colorStops] = value
        .substring(value.indexOf('(') + 1, value.lastIndexOf(')'))
        .split(', ');
    const degrees = convertDegreeToNumber(gradientDegrees);
    const gradientTransform = getMatrixForDegrees(degrees);
    const gradientStops = colorStops.map((stop) => {
        const seperatedStop = stop.split(' ');
        const { color, opacity } = (0,_colors__WEBPACK_IMPORTED_MODULE_0__.convertToFigmaColor)(seperatedStop[0]);
        const gradientColor = color;
        gradientColor.a = opacity;
        return {
            color: gradientColor,
            position: parseFloat(seperatedStop[1]) / 100,
        };
    });
    return { gradientStops, gradientTransform };
}


/***/ }),

/***/ "./src/helpers/transformValue.ts":
/*!***************************************!*\
  !*** ./src/helpers/transformValue.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "convertNumberToFigma": function() { return /* binding */ convertNumberToFigma; },
/* harmony export */   "fakeZeroForFigma": function() { return /* binding */ fakeZeroForFigma; },
/* harmony export */   "convertTypographyNumberToFigma": function() { return /* binding */ convertTypographyNumberToFigma; },
/* harmony export */   "convertLetterSpacingToFigma": function() { return /* binding */ convertLetterSpacingToFigma; },
/* harmony export */   "convertFigmaToLetterSpacing": function() { return /* binding */ convertFigmaToLetterSpacing; },
/* harmony export */   "convertLineHeightToFigma": function() { return /* binding */ convertLineHeightToFigma; },
/* harmony export */   "convertFigmaToLineHeight": function() { return /* binding */ convertFigmaToLineHeight; },
/* harmony export */   "default": function() { return /* binding */ convertOpacityToFigma; },
/* harmony export */   "transformSize": function() { return /* binding */ transformSize; },
/* harmony export */   "transformSpace": function() { return /* binding */ transformSpace; },
/* harmony export */   "transformValue": function() { return /* binding */ transformValue; }
/* harmony export */ });
function convertNumberToFigma(value) {
    return parseInt(value, 10);
}
function fakeZeroForFigma(value) {
    return Number(value) === 0 ? 0.001 : Number(value);
}
function convertTypographyNumberToFigma(value) {
    const baseFontSize = 16;
    if (typeof value === 'string' &&
        (value.endsWith('em') || value.endsWith('rem'))) {
        return parseFloat(value) * baseFontSize;
    }
    return typeof value === 'string' ? parseFloat(value) : value;
}
function convertLetterSpacingToFigma(inputValue) {
    let letterSpacing;
    const value = inputValue.toString();
    const numbers = /^-?\d+(\.\d+)?$/;
    if (value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)) {
        letterSpacing = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    }
    else if (value.match(numbers) || value.endsWith('px')) {
        letterSpacing = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        };
    }
    return letterSpacing;
}
function convertFigmaToLetterSpacing(inputValue) {
    const { unit, value } = inputValue;
    if (unit === 'PERCENT') {
        return `${+value.toFixed(2)}%`;
    }
    return +value.toFixed(2);
}
function convertLineHeightToFigma(inputValue) {
    let lineHeight;
    const value = inputValue.toString();
    const numbers = /^\d+(\.\d+)?$/;
    if (value.match(numbers) || value.endsWith('px')) {
        lineHeight = {
            unit: 'PIXELS',
            value: convertTypographyNumberToFigma(value),
        };
    }
    else if (value.trim().slice(-1) === '%' &&
        value.trim().slice(0, -1).match(numbers)) {
        lineHeight = {
            unit: 'PERCENT',
            value: Number(value.slice(0, -1)),
        };
    }
    else {
        lineHeight = {
            unit: 'AUTO',
        };
    }
    return lineHeight;
}
function convertFigmaToLineHeight(inputValue) {
    // @ts-expect-error
    const { unit, value } = inputValue;
    if (unit === 'PIXELS') {
        return +value.toFixed(2);
    }
    if (unit === 'PERCENT') {
        return `${+value.toFixed(2)}%`;
    }
    return 'AUTO';
}
function convertOpacityToFigma(value) {
    const matchedPercent = value.toString().match(/(\d+%)/);
    // Matches 50%, 100%, etc.
    if (matchedPercent && matchedPercent.length) {
        return Number(matchedPercent[0].slice(0, -1)) / 100;
    }
    return Number(value);
}
const transformSize = (value) => fakeZeroForFigma(convertTypographyNumberToFigma(value));
const transformSpace = (value) => convertTypographyNumberToFigma(value);
function transformValue(value, type) {
    switch (type) {
        case 'borderWidth':
        case 'width':
        case 'height':
        case 'sizing':
            return fakeZeroForFigma(convertTypographyNumberToFigma(value));
        case 'borderRadius':
        case 'borderRadiusTopLeft':
        case 'borderRadiusTopRight':
        case 'borderRadiusBottomRight':
        case 'borderRadiusBottomLeft':
        case 'spacing':
        case 'horizontalPadding':
        case 'verticalPadding':
        case 'paddingTop':
        case 'paddingRight':
        case 'paddingBottom':
        case 'paddingLeft':
        case 'itemSpacing':
        case 'boxShadow':
        case 'paragraphSpacing':
        case 'fontSize':
            return convertTypographyNumberToFigma(value);
        case 'letterSpacing':
            return convertLetterSpacingToFigma(value);
        case 'lineHeight':
            return convertLineHeightToFigma(value);
        case 'opacity':
            return convertOpacityToFigma(value.toString());
        default:
            return value;
    }
}


/***/ }),

/***/ "./src/helpers/updateNode.ts":
/*!***********************************!*\
  !*** ./src/helpers/updateNode.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateNode": function() { return /* binding */ updateNode; }
/* harmony export */ });
/* harmony import */ var html_figma_figma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-figma/figma */ "../../html-to-figma/build/figma/index.js");
/* harmony import */ var html_figma_figma_helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! html-figma/figma/helpers */ "../../html-to-figma/build/figma/helpers.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (undefined && undefined.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};


const updateNode = (node, newLayer) => __awaiter(void 0, void 0, void 0, function* () {
    const { 
    // @ts-expect-error
    constraints, 
    // @ts-expect-error
    children, x, y, name } = newLayer, restLayerData = __rest(newLayer, ["constraints", "children", "x", "y", "name"]);
    (0,html_figma_figma_helpers__WEBPACK_IMPORTED_MODULE_1__.assign)(node, restLayerData);
    if (node.children) {
        node.children.forEach((child) => child.remove());
    }
    // @ts-expect-error
    if (newLayer.children) {
        // @ts-expect-error
        yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)(newLayer.children.reverse(), node);
    }
    return node;
});


/***/ }),

/***/ "./src/setTokenToNode.ts":
/*!*******************************!*\
  !*** ./src/setTokenToNode.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setFont": function() { return /* binding */ setFont; },
/* harmony export */   "setColorValuesOnTarget": function() { return /* binding */ setColorValuesOnTarget; },
/* harmony export */   "setFillToNode": function() { return /* binding */ setFillToNode; },
/* harmony export */   "setBorderColor": function() { return /* binding */ setBorderColor; },
/* harmony export */   "setBorderRadius": function() { return /* binding */ setBorderRadius; },
/* harmony export */   "setPadding": function() { return /* binding */ setPadding; },
/* harmony export */   "setBorderWidth": function() { return /* binding */ setBorderWidth; },
/* harmony export */   "setOpacity": function() { return /* binding */ setOpacity; },
/* harmony export */   "setSize": function() { return /* binding */ setSize; },
/* harmony export */   "setBoxShadow": function() { return /* binding */ setBoxShadow; },
/* harmony export */   "setTokenToNode": function() { return /* binding */ setTokenToNode; }
/* harmony export */ });
/* harmony import */ var _helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/transformValue */ "./src/helpers/transformValue.ts");
/* harmony import */ var _helpers_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/colors */ "./src/helpers/colors.ts");
/* harmony import */ var _helpers_gradients__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/gradients */ "./src/helpers/gradients.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function setFont(target, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { value, description } = token;
            const { fontFamily, fontWeight, fontSize, lineHeight, letterSpacing, paragraphSpacing, } = value;
            // @ts-expect-error
            const family = fontFamily || target.fontName.family;
            // @ts-expect-error
            const style = fontWeight || target.fontName.style;
            yield figma.loadFontAsync({ family, style });
            if (fontFamily && fontWeight) {
                target.fontName = {
                    family,
                    style,
                };
            }
            if (fontSize) {
                target.fontSize = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(fontSize, 'fontSize');
            }
            if (lineHeight) {
                target.lineHeight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(lineHeight, 'lineHeight');
            }
            if (letterSpacing) {
                target.letterSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(letterSpacing, 'letterSpacing');
            }
            if (paragraphSpacing) {
                target.paragraphSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(paragraphSpacing, 'paragraphSpacing');
            }
            if (description) {
                // @ts-expect-error
                target.description = description;
            }
        }
        catch (e) {
            console.log('Error setting font on target', target, token, e);
        }
    });
}
function setColorValuesOnTarget(target, value, description, key = 'paints') {
    try {
        if (value.startsWith('linear-gradient')) {
            const { gradientStops, gradientTransform, } = (0,_helpers_gradients__WEBPACK_IMPORTED_MODULE_2__.convertStringToFigmaGradient)(value);
            const newPaint = {
                type: 'GRADIENT_LINEAR',
                gradientTransform,
                gradientStops,
            };
            // @ts-expect-error
            target[key] = [newPaint];
        }
        else {
            const { color, opacity } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(value);
            // @ts-expect-error
            target[key] = [{ color, opacity, type: 'SOLID' }];
        }
        if (description) {
            // @ts-expect-error
            target.description = description;
        }
    }
    catch (e) {
        console.error('Error setting color', e);
    }
}
const setFillToNode = (node, token) => {
    // FILL
    if (token.value.fill && typeof token.value.fill === 'string') {
        if (typeof node.fills !== 'undefined') {
            setColorValuesOnTarget(node, token.value.fill, token.description, 'fills');
        }
    }
};
const setBorderColor = (node, token) => {
    const { value } = token;
    if (typeof value.borderColor !== 'undefined') {
        if (typeof node.strokes !== 'undefined') {
            const { color, opacity } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(value.borderColor);
            node.strokes = [{ type: 'SOLID', color, opacity }];
        }
    }
};
const setBorderRadius = (node, token) => {
    const { value } = token;
    // BORDER RADIUS
    // if (
    //     typeof value.borderRadius !== 'undefined' &&
    //     typeof node.cornerRadius !== 'undefined'
    // ) {
    //     node.cornerRadius = convertTypographyNumberToFigma(value.borderRadius);
    // }
    if (typeof value.borderRadiusTopLeft !== 'undefined' &&
        typeof node.topLeftRadius !== 'undefined') {
        node.topLeftRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusTopLeft);
    }
    if (typeof value.borderRadiusTopRight !== 'undefined' &&
        typeof node.topRightRadius !== 'undefined') {
        node.topRightRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusTopRight);
    }
    if (typeof value.borderRadiusBottomRight !== 'undefined' &&
        typeof node.bottomRightRadius !== 'undefined') {
        node.bottomRightRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusBottomRight);
    }
    if (typeof value.borderRadiusBottomLeft !== 'undefined' &&
        typeof node.bottomLeftRadius !== 'undefined') {
        node.bottomLeftRadius = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.convertTypographyNumberToFigma)(value.borderRadiusBottomLeft);
    }
};
const setPadding = (node, token) => {
    const { value } = token;
    // SPACING
    // if (
    //     typeof value.spacing !== 'undefined' &&
    //     typeof node.paddingLeft !== 'undefined'
    // ) {
    //     node.paddingLeft = transformSpace(value.spacing);
    //     node.paddingRight = transformSpace(value.spacing);
    //     node.paddingTop = transformSpace(value.spacing);
    //     node.paddingBottom = transformSpace(value.spacing);
    //     node.itemSpacing = transformSpace(value.spacing);
    // }
    if (typeof value.itemSpacing !== 'undefined' &&
        typeof node.itemSpacing !== 'undefined') {
        node.itemSpacing = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.itemSpacing);
    }
    if (typeof value.paddingTop !== 'undefined' &&
        typeof node.paddingTop !== 'undefined') {
        node.paddingTop = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingTop);
    }
    if (typeof value.paddingRight !== 'undefined' &&
        typeof node.paddingRight !== 'undefined') {
        node.paddingRight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingRight);
    }
    if (typeof value.paddingBottom !== 'undefined' &&
        typeof node.paddingBottom !== 'undefined') {
        node.paddingBottom = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingBottom);
    }
    if (typeof value.paddingLeft !== 'undefined' &&
        typeof node.paddingLeft !== 'undefined') {
        node.paddingLeft = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSpace)(value.paddingLeft);
    }
};
const setBorderWidth = (node, token) => {
    // BORDER WIDTH
    if (typeof token.value.borderWidth !== 'undefined' &&
        typeof node.strokeWeight !== 'undefined') {
        node.strokeWeight = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.borderWidth);
    }
};
const setOpacity = (node, token) => {
    if (typeof token.value.opacity !== 'undefined' &&
        typeof node.opacity !== 'undefined') {
        node.opacity = (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.default)(token.value.opacity);
    }
};
const setSize = (node, token) => {
    // SIZING: BOTH
    if (typeof token.value.sizing !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize((0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.sizing), (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.sizing));
    }
    // SIZING: WIDTH
    if (typeof token.value.width !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize((0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.width), node.height);
    }
    // SIZING: HEIGHT
    if (typeof token.value.height !== 'undefined' &&
        typeof node.resize !== 'undefined') {
        node.resize(node.width, (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformSize)(token.value.height));
    }
};
const setBoxShadow = (node, token) => {
    const { value } = token;
    if (typeof value.boxShadow !== 'undefined' &&
        typeof node.effects !== 'undefined') {
        // get all effects, but remove DROP_SHADOW, since we're about to add it
        const effects = node.effects.filter((effect) => effect.type !== 'DROP_SHADOW');
        const { x, y, spread, color, blur } = value.boxShadow;
        const { color: { r, g, b }, opacity, } = (0,_helpers_colors__WEBPACK_IMPORTED_MODULE_1__.convertToFigmaColor)(color);
        const effect = {
            type: 'DROP_SHADOW',
            visible: true,
            blendMode: 'NORMAL',
            color: { r, g, b, a: opacity },
            offset: {
                x: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(x, 'boxShadow'),
                y: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(y, 'boxShadow'),
            },
            radius: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(blur, 'boxShadow'),
            spread: (0,_helpers_transformValue__WEBPACK_IMPORTED_MODULE_0__.transformValue)(spread, 'boxShadow'),
        };
        effects.push(effect);
        node.effects = effects;
    }
};
function setTokenToNode(node, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            setFillToNode(node, token);
            setBorderRadius(node, token);
            setBoxShadow(node, token);
            setOpacity(node, token);
            setSize(node, token);
            if (node.type === 'TEXT') {
                setFont(node, token);
            }
            setBorderWidth(node, token);
            setBorderColor(node, token);
            setPadding(node, token);
        }
        catch (e) {
            console.log('Error setting data on node', e);
        }
    });
}


/***/ }),

/***/ "../src/FigmaMessageType.ts":
/*!**********************************!*\
  !*** ../src/FigmaMessageType.ts ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FigmaMessageType": function() { return /* binding */ FigmaMessageType; }
/* harmony export */ });
var FigmaMessageType;
(function (FigmaMessageType) {
    FigmaMessageType[FigmaMessageType["IMPORT"] = 0] = "IMPORT";
    FigmaMessageType[FigmaMessageType["UPDATE"] = 1] = "UPDATE";
    FigmaMessageType[FigmaMessageType["RENDER"] = 2] = "RENDER";
    FigmaMessageType[FigmaMessageType["IMPORT_VARIANTS"] = 3] = "IMPORT_VARIANTS";
    FigmaMessageType[FigmaMessageType["APPLY_TOKEN"] = 4] = "APPLY_TOKEN";
    FigmaMessageType[FigmaMessageType["APPLY_TOKENS"] = 5] = "APPLY_TOKENS";
    FigmaMessageType[FigmaMessageType["SELECT_NODE"] = 6] = "SELECT_NODE";
    FigmaMessageType[FigmaMessageType["CLEAR_SELECTION"] = 7] = "CLEAR_SELECTION";
    FigmaMessageType[FigmaMessageType["RENDER_TOKENS_SYNC"] = 8] = "RENDER_TOKENS_SYNC";
})(FigmaMessageType || (FigmaMessageType = {}));


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/figma.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var html_figma_figma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! html-figma/figma */ "../../html-to-figma/build/figma/index.js");
/* harmony import */ var _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../src/FigmaMessageType */ "../src/FigmaMessageType.ts");
/* harmony import */ var _helpers_updateNode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers/updateNode */ "./src/helpers/updateNode.ts");
/* harmony import */ var _setTokenToNode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./setTokenToNode */ "./src/setTokenToNode.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




//@ts-ignore
figma.showUI(__html__, {
    width: 750,
    height: 600,
});
const postMessage = (data) => {
    figma.ui.postMessage(data);
};
const getPluginData = (node) => {
    const tokens = node.getPluginData('tokens');
    const componentData = node.getPluginData('componentData');
    return {
        tokens: tokens ? JSON.parse(tokens) : null,
        componentData: componentData ? JSON.parse(componentData) : null,
    };
};
const setPluginData = (node, payload) => {
    const { tokens, componentData } = payload;
    tokens && node.setPluginData('tokens', JSON.stringify(tokens));
    componentData &&
        node.setPluginData('componentData', JSON.stringify(componentData));
};
const setTokens = (nodeId, tokens) => {
    const node = figma.currentPage.findOne((node) => node.id === nodeId);
    if (!node) {
        console.error(`Can't find NodeId: ${nodeId}`);
        return;
    }
    for (const token of tokens) {
        (0,_setTokenToNode__WEBPACK_IMPORTED_MODULE_3__.setTokenToNode)(node, token);
    }
    setPluginData(node, { tokens });
};
const updateTokensOnNode = (node, nodeTokens, allTokens) => {
    const newTokens = nodeTokens.map((token) => {
        const newValue = allTokens[token.name];
        if (typeof newValue !== 'undefined') {
            const keys = Object.keys(token.value);
            for (const key of keys) {
                if (token.value[key] !== newValue) {
                    // @ts-expect-error
                    token.value[key] = newValue;
                }
            }
        }
        return token;
    });
    setTokens(node.id, newTokens);
};
figma.on('selectionchange', () => {
    const nodes = figma.currentPage.selection;
    if (!nodes.length) {
        postMessage({ type: _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.CLEAR_SELECTION });
        return;
    }
    else {
        postMessage({
            type: _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.SELECT_NODE,
            data: {
                nodes: nodes.map((n) => (Object.assign({ nodeId: n.id }, getPluginData(n)))),
            },
        });
    }
});
const getVarinatNameFromProps = (props) => {
    return Object.keys(props)
        .filter((key) => key !== 'children')
        .map((key) => `${key}=${props[key]}`)
        .join(', ');
};
figma.ui.onmessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.IMPORT_VARIANTS) {
        yield figma.loadFontAsync(html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.defaultFont);
        const { data: { layers, componentsData }, } = msg;
        let baseFrame = figma.currentPage;
        let nodes = [];
        const componentLayers = layers.map((layer) => (Object.assign(Object.assign({}, layer), { type: 'COMPONENT' })));
        // @ts-expect-error
        yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)(componentLayers, baseFrame, ({ node, parent }) => {
            if (!parent) {
                nodes.push(node);
            }
        });
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.IMPORT) {
        yield figma.loadFontAsync(html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.defaultFont);
        let baseFrame = figma.currentPage;
        const { data } = msg;
        let { nodes, type } = data;
        let addedNodes = [];
        if (type === 'variants') {
            const { x, y } = figma.viewport.center;
            let offsetTop = 0;
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].layer.x = x;
                nodes[i].layer.y = y + offsetTop;
                offsetTop += (nodes[i].layer.height || 100) + 10;
            }
        }
        for (const { id, layer, position, componentData } of nodes) {
            const figmaNode = id && figma.currentPage.findOne(n => n.id === id);
            if (figmaNode) {
                (0,_helpers_updateNode__WEBPACK_IMPORTED_MODULE_2__.updateNode)(figmaNode, layer);
                setPluginData(figmaNode, { componentData });
            }
            else {
                if (position) {
                    const { x, y } = (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.getDropOffset)(position);
                    layer.x = x;
                    layer.y = y;
                }
                const componentLayer = Object.assign(Object.assign({}, layer), { type: type === 'variants' ? 'COMPONENT' : 'FRAME' });
                // @ts-expect-error
                yield (0,html_figma_figma__WEBPACK_IMPORTED_MODULE_0__.addLayersToFrame)([componentLayer], baseFrame, ({ node, parent }) => {
                    if (!parent) {
                        setPluginData(node, { componentData });
                        addedNodes.push(node);
                    }
                });
            }
        }
        if (type === 'variants') {
            const componentNode = figma.combineAsVariants(addedNodes, baseFrame);
            componentNode.name = nodes[0].componentData.name;
            addedNodes.forEach((node, index) => {
                node.name = getVarinatNameFromProps(nodes[index].componentData.props);
            });
        }
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.APPLY_TOKEN) {
        const { data } = msg;
        for (let node of data.nodes) {
            setTokens(node.nodeId, node.tokens || []);
        }
    }
    if (msg.type === _src_FigmaMessageType__WEBPACK_IMPORTED_MODULE_1__.FigmaMessageType.APPLY_TOKENS) {
        const { data } = msg;
        console.log(data);
        const allNodes = figma.currentPage.findAll((_) => true);
        const nodesWithTokens = allNodes
            .map((node) => ({ tokens: getPluginData(node).tokens, node }))
            .filter(({ tokens }) => tokens);
        for (let { tokens, node } of nodesWithTokens) {
            updateTokensOnNode(node, tokens, data.tokens);
        }
    }
});

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUIsZUFBZTtBQUNsQztBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4uLy4uL2h0bWwtdG8tZmlnbWEvYnVpbGQvZmlnbWEvZHJvcE9mZnNldC5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi4vLi4vaHRtbC10by1maWdtYS9idWlsZC9maWdtYS9nZXRGb250LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi8uLi9odG1sLXRvLWZpZ21hL2J1aWxkL2ZpZ21hL2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4uLy4uL2h0bWwtdG8tZmlnbWEvYnVpbGQvZmlnbWEvaW1hZ2VzLmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi8uLi9odG1sLXRvLWZpZ21hL2J1aWxkL2ZpZ21hL2luZGV4LmpzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi8uLi9odG1sLXRvLWZpZ21hL2J1aWxkL2ZpZ21hL3Byb2Nlc3NMYXllci5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi4vLi4vaHRtbC10by1maWdtYS9idWlsZC91dGlscy5qcyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvaGVscGVycy9jb2xvcnMudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vc3JjL2hlbHBlcnMvZ3JhZGllbnRzLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9oZWxwZXJzL3RyYW5zZm9ybVZhbHVlLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9oZWxwZXJzL3VwZGF0ZU5vZGUudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vc3JjL3NldFRva2VuVG9Ob2RlLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uLi9zcmMvRmlnbWFNZXNzYWdlVHlwZS50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvZmlnbWEudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldERyb3BPZmZzZXQocGF5bG9hZCkge1xuICAgIGNvbnN0IHsgZHJvcFBvc2l0aW9uLCB3aW5kb3dTaXplLCBvZmZzZXQgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgeyBib3VuZHMsIHpvb20gfSA9IGZpZ21hLnZpZXdwb3J0O1xuICAgIGNvbnN0IGhhc1VJID0gTWF0aC5hYnMoKGJvdW5kcy53aWR0aCAqIHpvb20pIC8gd2luZG93U2l6ZS53aWR0aCkgPCAwLjk5O1xuICAgIGNvbnN0IGxlZnRQYW5lV2lkdGggPSB3aW5kb3dTaXplLndpZHRoIC0gYm91bmRzLndpZHRoICogem9vbSAtIDI0MDtcbiAgICBjb25zdCB4RnJvbUNhbnZhcyA9IGhhc1VJXG4gICAgICAgID8gZHJvcFBvc2l0aW9uLmNsaWVudFggLSBsZWZ0UGFuZVdpZHRoXG4gICAgICAgIDogZHJvcFBvc2l0aW9uLmNsaWVudFg7XG4gICAgY29uc3QgeUZyb21DYW52YXMgPSBoYXNVSSA/IGRyb3BQb3NpdGlvbi5jbGllbnRZIC0gNDAgOiBkcm9wUG9zaXRpb24uY2xpZW50WTtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBib3VuZHMueCArIHhGcm9tQ2FudmFzIC8gem9vbSAtIG9mZnNldC54LFxuICAgICAgICB5OiBib3VuZHMueSArIHlGcm9tQ2FudmFzIC8gem9vbSAtIG9mZnNldC55XG4gICAgfTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuY29uc3QgZm9udENhY2hlID0ge307XG5jb25zdCBub3JtYWxpemVOYW1lID0gKHN0cikgPT4gc3RyLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvW15hLXpdL2dpLCAnJyk7XG5leHBvcnQgY29uc3QgZGVmYXVsdEZvbnQgPSB7IGZhbWlseTogJ1JvYm90bycsIHN0eWxlOiAnUmVndWxhcicgfTtcbmxldCBjYWNoZWRBdmFpbGFibGVGb250cyA9IG51bGw7XG5jb25zdCBnZXRBdmFpbGFibGVGb250TmFtZXMgPSAoKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBpZiAoY2FjaGVkQXZhaWxhYmxlRm9udHMpIHtcbiAgICAgICAgcmV0dXJuIGNhY2hlZEF2YWlsYWJsZUZvbnRzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuICh5aWVsZCBmaWdtYS5saXN0QXZhaWxhYmxlRm9udHNBc3luYygpKS5maWx0ZXIoKGZvbnQpID0+IGZvbnQuZm9udE5hbWUuc3R5bGUgPT09ICdSZWd1bGFyJyk7XG4gICAgfVxufSk7XG4vLyBUT0RPOiBrZWVwIGxpc3Qgb2YgZm9udHMgbm90IGZvdW5kXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWF0Y2hpbmdGb250KGZvbnRTdHIpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBjYWNoZWQgPSBmb250Q2FjaGVbZm9udFN0cl07XG4gICAgICAgIGlmIChjYWNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgYXZhaWxhYmxlRm9udHMgPSB5aWVsZCBnZXRBdmFpbGFibGVGb250TmFtZXMoKTtcbiAgICAgICAgY29uc3QgZmFtaWx5U3BsaXQgPSBmb250U3RyLnNwbGl0KC9cXHMqLFxccyovKTtcbiAgICAgICAgZm9yIChjb25zdCBmYW1pbHkgb2YgZmFtaWx5U3BsaXQpIHtcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemVOYW1lKGZhbWlseSk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGF2YWlsYWJsZUZvbnQgb2YgYXZhaWxhYmxlRm9udHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBub3JtYWxpemVkQXZhaWxhYmxlID0gbm9ybWFsaXplTmFtZShhdmFpbGFibGVGb250LmZvbnROYW1lLmZhbWlseSk7XG4gICAgICAgICAgICAgICAgaWYgKG5vcm1hbGl6ZWRBdmFpbGFibGUgPT09IG5vcm1hbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FjaGVkID0gZm9udENhY2hlW25vcm1hbGl6ZWRBdmFpbGFibGVdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMoYXZhaWxhYmxlRm9udC5mb250TmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRDYWNoZVtmb250U3RyXSA9IGF2YWlsYWJsZUZvbnQuZm9udE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIGZvbnRDYWNoZVtub3JtYWxpemVkQXZhaWxhYmxlXSA9IGF2YWlsYWJsZUZvbnQuZm9udE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhdmFpbGFibGVGb250LmZvbnROYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVmYXVsdEZvbnQ7XG4gICAgfSk7XG59XG4iLCJjb25zdCBhbGxQcm9wZXJ0eU5hbWVzID0gW1xuICAgICdpZCcsXG4gICAgJ3dpZHRoJyxcbiAgICAnaGVpZ2h0JyxcbiAgICAnY3VycmVudFBhZ2UnLFxuICAgICdjYW5jZWwnLFxuICAgICdvcmlnaW4nLFxuICAgICdvbm1lc3NhZ2UnLFxuICAgICdjZW50ZXInLFxuICAgICd6b29tJyxcbiAgICAnZm9udE5hbWUnLFxuICAgICduYW1lJyxcbiAgICAndmlzaWJsZScsXG4gICAgJ2xvY2tlZCcsXG4gICAgJ2NvbnN0cmFpbnRzJyxcbiAgICAncmVsYXRpdmVUcmFuc2Zvcm0nLFxuICAgICd4JyxcbiAgICAneScsXG4gICAgJ3JvdGF0aW9uJyxcbiAgICAnY29uc3RyYWluUHJvcG9ydGlvbnMnLFxuICAgICdsYXlvdXRBbGlnbicsXG4gICAgJ2xheW91dEdyb3cnLFxuICAgICdvcGFjaXR5JyxcbiAgICAnYmxlbmRNb2RlJyxcbiAgICAnaXNNYXNrJyxcbiAgICAnZWZmZWN0cycsXG4gICAgJ2VmZmVjdFN0eWxlSWQnLFxuICAgICdleHBhbmRlZCcsXG4gICAgJ2JhY2tncm91bmRzJyxcbiAgICAnYmFja2dyb3VuZFN0eWxlSWQnLFxuICAgICdmaWxscycsXG4gICAgJ3N0cm9rZXMnLFxuICAgICdzdHJva2VXZWlnaHQnLFxuICAgICdzdHJva2VNaXRlckxpbWl0JyxcbiAgICAnc3Ryb2tlQWxpZ24nLFxuICAgICdzdHJva2VDYXAnLFxuICAgICdzdHJva2VKb2luJyxcbiAgICAnZGFzaFBhdHRlcm4nLFxuICAgICdmaWxsU3R5bGVJZCcsXG4gICAgJ3N0cm9rZVN0eWxlSWQnLFxuICAgICdjb3JuZXJSYWRpdXMnLFxuICAgICdjb3JuZXJTbW9vdGhpbmcnLFxuICAgICd0b3BMZWZ0UmFkaXVzJyxcbiAgICAndG9wUmlnaHRSYWRpdXMnLFxuICAgICdib3R0b21MZWZ0UmFkaXVzJyxcbiAgICAnYm90dG9tUmlnaHRSYWRpdXMnLFxuICAgICdleHBvcnRTZXR0aW5ncycsXG4gICAgJ292ZXJmbG93RGlyZWN0aW9uJyxcbiAgICAnbnVtYmVyT2ZGaXhlZENoaWxkcmVuJyxcbiAgICAnZGVzY3JpcHRpb24nLFxuICAgICdsYXlvdXRNb2RlJyxcbiAgICAncHJpbWFyeUF4aXNTaXppbmdNb2RlJyxcbiAgICAnY291bnRlckF4aXNTaXppbmdNb2RlJyxcbiAgICAncHJpbWFyeUF4aXNBbGlnbkl0ZW1zJyxcbiAgICAnY291bnRlckF4aXNBbGlnbkl0ZW1zJyxcbiAgICAncGFkZGluZ0xlZnQnLFxuICAgICdwYWRkaW5nUmlnaHQnLFxuICAgICdwYWRkaW5nVG9wJyxcbiAgICAncGFkZGluZ0JvdHRvbScsXG4gICAgJ2l0ZW1TcGFjaW5nJyxcbiAgICAnbGF5b3V0R3JpZHMnLFxuICAgICdncmlkU3R5bGVJZCcsXG4gICAgJ2NsaXBzQ29udGVudCcsXG4gICAgJ2d1aWRlcycsXG4gICAgJ2d1aWRlcycsXG4gICAgJ3NlbGVjdGlvbicsXG4gICAgJ3NlbGVjdGVkVGV4dFJhbmdlJyxcbiAgICAnYmFja2dyb3VuZHMnLFxuICAgICdhcmNEYXRhJyxcbiAgICAncG9pbnRDb3VudCcsXG4gICAgJ3BvaW50Q291bnQnLFxuICAgICdpbm5lclJhZGl1cycsXG4gICAgJ3ZlY3Rvck5ldHdvcmsnLFxuICAgICd2ZWN0b3JQYXRocycsXG4gICAgJ2hhbmRsZU1pcnJvcmluZycsXG4gICAgJ3RleHRBbGlnbkhvcml6b250YWwnLFxuICAgICd0ZXh0QWxpZ25WZXJ0aWNhbCcsXG4gICAgJ3RleHRBdXRvUmVzaXplJyxcbiAgICAncGFyYWdyYXBoSW5kZW50JyxcbiAgICAncGFyYWdyYXBoU3BhY2luZycsXG4gICAgJ2F1dG9SZW5hbWUnLFxuICAgICd0ZXh0U3R5bGVJZCcsXG4gICAgJ2ZvbnRTaXplJyxcbiAgICAnZm9udE5hbWUnLFxuICAgICd0ZXh0Q2FzZScsXG4gICAgJ3RleHREZWNvcmF0aW9uJyxcbiAgICAnbGV0dGVyU3BhY2luZycsXG4gICAgJ2xpbmVIZWlnaHQnLFxuICAgICdjaGFyYWN0ZXJzJyxcbiAgICAnbWFpbkNvbXBvbmVudCcsXG4gICAgJ3NjYWxlRmFjdG9yJyxcbiAgICAnYm9vbGVhbk9wZXJhdGlvbicsXG4gICAgJ2V4cGFuZGVkJyxcbiAgICAnbmFtZScsXG4gICAgJ3R5cGUnLFxuICAgICdwYWludHMnLFxuICAgICd0eXBlJyxcbiAgICAnZm9udFNpemUnLFxuICAgICd0ZXh0RGVjb3JhdGlvbicsXG4gICAgJ2ZvbnROYW1lJyxcbiAgICAnbGV0dGVyU3BhY2luZycsXG4gICAgJ2xpbmVIZWlnaHQnLFxuICAgICdwYXJhZ3JhcGhJbmRlbnQnLFxuICAgICdwYXJhZ3JhcGhTcGFjaW5nJyxcbiAgICAndGV4dENhc2UnLFxuICAgICd0eXBlJyxcbiAgICAnZWZmZWN0cycsXG4gICAgJ3R5cGUnLFxuICAgICdsYXlvdXRHcmlkcycsXG5dO1xuZXhwb3J0IGZ1bmN0aW9uIGFzc2lnbihhLCBiKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gYikge1xuICAgICAgICBjb25zdCB2YWx1ZSA9IGJba2V5XTtcbiAgICAgICAgaWYgKGtleSA9PT0gJ2RhdGEnICYmIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnREYXRhID0gSlNPTi5wYXJzZShhLmdldFNoYXJlZFBsdWdpbkRhdGEoJ2J1aWxkZXInLCAnZGF0YScpIHx8ICd7fScpIHx8XG4gICAgICAgICAgICAgICAge307XG4gICAgICAgICAgICBjb25zdCBuZXdEYXRhID0gdmFsdWU7XG4gICAgICAgICAgICBjb25zdCBtZXJnZWREYXRhID0gT2JqZWN0LmFzc2lnbih7fSwgY3VycmVudERhdGEsIG5ld0RhdGEpO1xuICAgICAgICAgICAgLy8gVE9ETyBtZXJnZSBwbHVnaW4gZGF0YVxuICAgICAgICAgICAgYS5zZXRTaGFyZWRQbHVnaW5EYXRhKCdidWlsZGVyJywgJ2RhdGEnLCBKU09OLnN0cmluZ2lmeShtZXJnZWREYXRhKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICBbJ3dpZHRoJywgJ2hlaWdodCcsICd0eXBlJywgJ3JlZicsICdjaGlsZHJlbicsICdzdmcnXS5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGFba2V5XSA9IGJba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oYEFzc2lnbiBlcnJvciBmb3IgcHJvcGVydHkgXCIke2tleX1cImAsIGEsIGIsIGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4vLyBUaGUgRmlnbWEgbm9kZXMgYXJlIGhhcmQgdG8gaW5zcGVjdCBhdCBhIGdsYW5jZSBiZWNhdXNlIGFsbW9zdCBhbGwgcHJvcGVydGllcyBhcmUgbm9uIGVudW1lcmFibGVcbi8vIGdldHRlcnMuIFRoaXMgcmVtb3ZlcyB0aGF0IHdyYXBwaW5nIGZvciBlYXNpZXIgaW5zcGVjdGluZ1xuZXhwb3J0IGNvbnN0IGNsb25lT2JqZWN0ID0gKG9iaiwgdmFsdWVzU2V0ID0gbmV3IFNldCgpKSA9PiB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgY29uc3QgbmV3T2JqID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcbiAgICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIGFsbFByb3BlcnR5TmFtZXMpIHtcbiAgICAgICAgY29uc3QgdmFsdWUgPSBvYmpbcHJvcGVydHldO1xuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgIT09ICdzeW1ib2wnKSB7XG4gICAgICAgICAgICBuZXdPYmpbcHJvcGVydHldID0gb2JqW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3T2JqO1xufTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0SW1hZ2VGaWxscyB9IGZyb20gXCIuLi91dGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NJbWFnZXMobGF5ZXIpIHtcbiAgICByZXR1cm4gX19hd2FpdGVyKHRoaXMsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgICAgICBjb25zdCBpbWFnZXMgPSBnZXRJbWFnZUZpbGxzKGxheWVyKTtcbiAgICAgICAgcmV0dXJuIChpbWFnZXMgJiZcbiAgICAgICAgICAgIFByb21pc2UuYWxsKGltYWdlcy5tYXAoKGltYWdlKSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGltYWdlICYmIGltYWdlLmludEFycikge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZS5pbWFnZUhhc2ggPSB5aWVsZCBmaWdtYS5jcmVhdGVJbWFnZShpbWFnZS5pbnRBcnIpXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGFzaDtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGltYWdlLmludEFycjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSkpKTtcbiAgICB9KTtcbn1cbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgdHJhdmVyc2VBc3luYyB9IGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IHByb2Nlc3NMYXllciB9IGZyb20gJy4vcHJvY2Vzc0xheWVyJztcbmV4cG9ydCBmdW5jdGlvbiBhZGRMYXllcnNUb0ZyYW1lKGxheWVycywgYmFzZUZyYW1lLCBvbkxheWVyUHJvY2Vzcykge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGZvciAoY29uc3Qgcm9vdExheWVyIG9mIGxheWVycykge1xuICAgICAgICAgICAgeWllbGQgdHJhdmVyc2VBc3luYyhyb290TGF5ZXIsIChsYXllciwgcGFyZW50KSA9PiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgbm9kZSA9IHlpZWxkIHByb2Nlc3NMYXllcihsYXllciwgcGFyZW50LCBiYXNlRnJhbWUpO1xuICAgICAgICAgICAgICAgICAgICBvbkxheWVyUHJvY2VzcyA9PT0gbnVsbCB8fCBvbkxheWVyUHJvY2VzcyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb25MYXllclByb2Nlc3MoeyBub2RlLCBsYXllciwgcGFyZW50IH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybignRXJyb3Igb24gbGF5ZXI6JywgbGF5ZXIsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5leHBvcnQgKiBmcm9tICcuL2dldEZvbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9kcm9wT2Zmc2V0JztcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgZ2V0SW1hZ2VGaWxscyB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgcHJvY2Vzc0ltYWdlcyB9IGZyb20gXCIuL2ltYWdlc1wiO1xuaW1wb3J0IHsgZ2V0TWF0Y2hpbmdGb250IH0gZnJvbSBcIi4vZ2V0Rm9udFwiO1xuaW1wb3J0IHsgYXNzaWduIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuY29uc3QgcHJvY2Vzc0RlZmF1bHRFbGVtZW50ID0gKGxheWVyLCBub2RlKSA9PiB7XG4gICAgbm9kZS54ID0gbGF5ZXIueDtcbiAgICBub2RlLnkgPSBsYXllci55O1xuICAgIG5vZGUucmVzaXplKGxheWVyLndpZHRoIHx8IDEsIGxheWVyLmhlaWdodCB8fCAxKTtcbiAgICBhc3NpZ24obm9kZSwgbGF5ZXIpO1xuICAgIC8vIHJlY3RzLnB1c2goZnJhbWUpO1xuICAgIHJldHVybiBub2RlO1xufTtcbmNvbnN0IGNyZWF0ZU5vZGVGcm9tTGF5ZXIgPSAobGF5ZXIpID0+IHtcbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ0ZSQU1FJyB8fCBsYXllci50eXBlID09PSAnR1JPVVAnKSB7XG4gICAgICAgIHJldHVybiBmaWdtYS5jcmVhdGVGcmFtZSgpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ1NWRycgJiYgbGF5ZXIuc3ZnKSB7XG4gICAgICAgIHJldHVybiBmaWdtYS5jcmVhdGVOb2RlRnJvbVN2ZyhsYXllci5zdmcpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ1JFQ1RBTkdMRScpIHtcbiAgICAgICAgcmV0dXJuIGZpZ21hLmNyZWF0ZVJlY3RhbmdsZSgpO1xuICAgIH1cbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ1RFWFQnKSB7XG4gICAgICAgIHJldHVybiBmaWdtYS5jcmVhdGVUZXh0KCk7XG4gICAgfVxuICAgIGlmIChsYXllci50eXBlID09PSAnQ09NUE9ORU5UJykge1xuICAgICAgICByZXR1cm4gZmlnbWEuY3JlYXRlQ29tcG9uZW50KCk7XG4gICAgfVxufTtcbmNvbnN0IFNJTVBMRV9UWVBFUyA9IFsnRlJBTUUnLCAnR1JPVVAnLCAnU1ZHJywgJ1JFQ1RBTkdMRScsICdDT01QT05FTlQnXTtcbmV4cG9ydCBjb25zdCBwcm9jZXNzTGF5ZXIgPSAobGF5ZXIsIHBhcmVudCwgYmFzZUZyYW1lKSA9PiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICBjb25zdCBwYXJlbnRGcmFtZSA9IChwYXJlbnQgPT09IG51bGwgfHwgcGFyZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwYXJlbnQucmVmKSB8fCBiYXNlRnJhbWU7XG4gICAgaWYgKHR5cGVvZiBsYXllci54ICE9PSAnbnVtYmVyJyB8fCB0eXBlb2YgbGF5ZXIueSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ0xheWVyIGNvb3JkcyBub3QgZGVmaW5lZCcpO1xuICAgIH1cbiAgICBjb25zdCBub2RlID0gY3JlYXRlTm9kZUZyb21MYXllcihsYXllcik7XG4gICAgaWYgKCFub2RlKSB7XG4gICAgICAgIHRocm93IEVycm9yKGAke2xheWVyLnR5cGV9IG5vdCBpbXBsZW1lbnRlZGApO1xuICAgIH1cbiAgICBpZiAoU0lNUExFX1RZUEVTLmluY2x1ZGVzKGxheWVyLnR5cGUpKSB7XG4gICAgICAgIHBhcmVudEZyYW1lLmFwcGVuZENoaWxkKHByb2Nlc3NEZWZhdWx0RWxlbWVudChsYXllciwgbm9kZSkpO1xuICAgIH1cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgbGF5ZXIucmVmID0gbm9kZTtcbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ1JFQ1RBTkdMRScpIHtcbiAgICAgICAgaWYgKGdldEltYWdlRmlsbHMobGF5ZXIpKSB7XG4gICAgICAgICAgICB5aWVsZCBwcm9jZXNzSW1hZ2VzKGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGF5ZXIudHlwZSA9PT0gJ1RFWFQnKSB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBub2RlO1xuICAgICAgICBpZiAobGF5ZXIuZm9udEZhbWlseSkge1xuICAgICAgICAgICAgdGV4dC5mb250TmFtZSA9IHlpZWxkIGdldE1hdGNoaW5nRm9udChsYXllci5mb250RmFtaWx5KTtcbiAgICAgICAgICAgIGRlbGV0ZSBsYXllci5mb250RmFtaWx5O1xuICAgICAgICB9XG4gICAgICAgIGFzc2lnbih0ZXh0LCBsYXllcik7XG4gICAgICAgIHRleHQucmVzaXplKGxheWVyLndpZHRoIHx8IDEsIGxheWVyLmhlaWdodCB8fCAxKTtcbiAgICAgICAgdGV4dC50ZXh0QXV0b1Jlc2l6ZSA9ICdIRUlHSFQnO1xuICAgICAgICBsZXQgYWRqdXN0bWVudHMgPSAwO1xuICAgICAgICBpZiAobGF5ZXIubGluZUhlaWdodCkge1xuICAgICAgICAgICAgdGV4dC5saW5lSGVpZ2h0ID0gbGF5ZXIubGluZUhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICAvLyBBZGp1c3QgdGV4dCB3aWR0aFxuICAgICAgICB3aGlsZSAodHlwZW9mIGxheWVyLmhlaWdodCA9PT0gJ251bWJlcicgJiZcbiAgICAgICAgICAgIHRleHQuaGVpZ2h0ID4gbGF5ZXIuaGVpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoYWRqdXN0bWVudHMrKyA+IDUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ1RvbyBtYW55IGZvbnQgYWRqdXN0bWVudHMnLCB0ZXh0LCBsYXllcik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHRleHQucmVzaXplKHRleHQud2lkdGggKyAxLCB0ZXh0LmhlaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKCdFcnJvciBvbiByZXNpemUgdGV4dDonLCBsYXllciwgdGV4dCwgZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXJlbnRGcmFtZS5hcHBlbmRDaGlsZCh0ZXh0KTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGU7XG59KTtcbiIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuZXhwb3J0IGNvbnN0IGhhc0NoaWxkcmVuID0gKG5vZGUpID0+IFxuLy8gQHRzLWV4cGVjdC1lcnJvclxubm9kZSAmJiBBcnJheS5pc0FycmF5KG5vZGUuY2hpbGRyZW4pO1xuZXhwb3J0IGZ1bmN0aW9uIHRyYXZlcnNlKGxheWVyLCBjYiwgcGFyZW50ID0gbnVsbCkge1xuICAgIGlmIChsYXllcikge1xuICAgICAgICBjYihsYXllciwgcGFyZW50KTtcbiAgICAgICAgaWYgKGhhc0NoaWxkcmVuKGxheWVyKSkge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgbGF5ZXIuY2hpbGRyZW4uZm9yRWFjaCgoY2hpbGQpID0+IHRyYXZlcnNlKGNoaWxkLCBjYiwgbGF5ZXIpKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZU1hcChsYXllciwgY2IsIHBhcmVudCA9IG51bGwpIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKGxheWVyKSB7XG4gICAgICAgIGNvbnN0IG5ld0xheWVyID0gY2IobGF5ZXIsIHBhcmVudCk7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgaWYgKChfYSA9IG5ld0xheWVyID09PSBudWxsIHx8IG5ld0xheWVyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuZXdMYXllci5jaGlsZHJlbikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgbmV3TGF5ZXIuY2hpbGRyZW4gPSBuZXdMYXllci5jaGlsZHJlbi5tYXAoKGNoaWxkKSA9PiB0cmF2ZXJzZU1hcChjaGlsZCwgY2IsIGxheWVyKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0xheWVyO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiB0cmF2ZXJzZUFzeW5jKGxheWVyLCBjYiwgcGFyZW50ID0gbnVsbCkge1xuICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgeWllbGQgY2IobGF5ZXIsIHBhcmVudCk7XG4gICAgICAgICAgICBpZiAoaGFzQ2hpbGRyZW4obGF5ZXIpKSB7XG4gICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGNoaWxkIG9mIGxheWVyLmNoaWxkcmVuLnJldmVyc2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB5aWVsZCB0cmF2ZXJzZUFzeW5jKGNoaWxkLCBjYiwgbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNpemUob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikubGVuZ3RoO1xufVxuZXhwb3J0IGNvbnN0IGNhcGl0YWxpemUgPSAoc3RyKSA9PiBzdHJbMF0udG9VcHBlckNhc2UoKSArIHN0ci5zdWJzdHJpbmcoMSk7XG5leHBvcnQgZnVuY3Rpb24gZ2V0UmdiKGNvbG9yU3RyaW5nKSB7XG4gICAgaWYgKCFjb2xvclN0cmluZykge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgW18xLCByLCBnLCBiLCBfMiwgYV0gPSAoY29sb3JTdHJpbmcubWF0Y2goL3JnYmE/XFwoKFtcXGRcXC5dKyksIChbXFxkXFwuXSspLCAoW1xcZFxcLl0rKSgsIChbXFxkXFwuXSspKT9cXCkvKSB8fCBbXSk7XG4gICAgY29uc3Qgbm9uZSA9IGEgJiYgcGFyc2VGbG9hdChhKSA9PT0gMDtcbiAgICBpZiAociAmJiBnICYmIGIgJiYgIW5vbmUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHI6IHBhcnNlSW50KHIpIC8gMjU1LFxuICAgICAgICAgICAgZzogcGFyc2VJbnQoZykgLyAyNTUsXG4gICAgICAgICAgICBiOiBwYXJzZUludChiKSAvIDI1NSxcbiAgICAgICAgICAgIGE6IGEgPyBwYXJzZUZsb2F0KGEpIDogMSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5leHBvcnQgY29uc3QgZmFzdENsb25lID0gKGRhdGEpID0+IHR5cGVvZiBkYXRhID09PSAnc3ltYm9sJyA/IG51bGwgOiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKTtcbmV4cG9ydCBjb25zdCB0b051bSA9ICh2KSA9PiB7XG4gICAgLy8gaWYgKCEvcHgkLy50ZXN0KHYpICYmIHYgIT09ICcwJykgcmV0dXJuIHY7XG4gICAgaWYgKCEvcHgkLy50ZXN0KHYpICYmIHYgIT09ICcwJylcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgY29uc3QgbiA9IHBhcnNlRmxvYXQodik7XG4gICAgLy8gcmV0dXJuICFpc05hTihuKSA/IG4gOiB2O1xuICAgIHJldHVybiAhaXNOYU4obikgPyBuIDogMDtcbn07XG5leHBvcnQgY29uc3QgdG9QZXJjZW50ID0gKHYpID0+IHtcbiAgICAvLyBpZiAoIS9weCQvLnRlc3QodikgJiYgdiAhPT0gJzAnKSByZXR1cm4gdjtcbiAgICBpZiAoIS8lJC8udGVzdCh2KSAmJiB2ICE9PSAnMCcpXG4gICAgICAgIHJldHVybiAwO1xuICAgIGNvbnN0IG4gPSBwYXJzZUludCh2KTtcbiAgICAvLyByZXR1cm4gIWlzTmFOKG4pID8gbiA6IHY7XG4gICAgcmV0dXJuICFpc05hTihuKSA/IG4gLyAxMDAgOiAwO1xufTtcbmV4cG9ydCBjb25zdCBwYXJzZVVuaXRzID0gKHN0ciwgcmVsYXRpdmUpID0+IHtcbiAgICBpZiAoIXN0cikge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGV0IHZhbHVlID0gdG9OdW0oc3RyKTtcbiAgICBpZiAocmVsYXRpdmUgJiYgIXZhbHVlKSB7XG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSB0b1BlcmNlbnQoc3RyKTtcbiAgICAgICAgaWYgKCFwZXJjZW50KVxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIHZhbHVlID0gcmVsYXRpdmUgKiBwZXJjZW50O1xuICAgIH1cbiAgICAvLyBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvKFtcXGRcXC5dKylweC8pO1xuICAgIC8vIGNvbnN0IHZhbCA9IG1hdGNoICYmIG1hdGNoWzFdO1xuICAgIGlmICh2YWx1ZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdW5pdDogJ1BJWEVMUycsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG59O1xuY29uc3QgTEVOR1RIX1JFRyA9IC9eWzAtOV0rW2EtekEtWiVdKz8kLztcbmNvbnN0IGlzTGVuZ3RoID0gKHYpID0+IHYgPT09ICcwJyB8fCBMRU5HVEhfUkVHLnRlc3Qodik7XG5jb25zdCBwYXJzZU11bHRpcGxlQ1NTVmFsdWVzID0gKHN0cikgPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gW107XG4gICAgbGV0IGxhc3RTcGxpdEluZGV4ID0gMDtcbiAgICBsZXQgc2tvYmthID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHN0cltpXSA9PT0gJywnICYmICFza29ia2EpIHtcbiAgICAgICAgICAgIHBhcnRzLnB1c2goc3RyLnNsaWNlKGxhc3RTcGxpdEluZGV4LCBpKSk7XG4gICAgICAgICAgICBsYXN0U3BsaXRJbmRleCA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0cltpXSA9PT0gJygnKSB7XG4gICAgICAgICAgICBza29ia2EgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0cltpXSA9PT0gJyknKSB7XG4gICAgICAgICAgICBza29ia2EgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwYXJ0cy5wdXNoKHN0ci5zbGljZShsYXN0U3BsaXRJbmRleCkpO1xuICAgIHJldHVybiBwYXJ0cy5tYXAocyA9PiBzLnRyaW0oKSk7XG59O1xuZXhwb3J0IGNvbnN0IHBhcnNlQm94U2hhZG93VmFsdWUgPSAoc3RyKSA9PiB7XG4gICAgLy8gVE9ETzogdGhpcyBpcyBicm9rZW4gZm9yIG11bHRpcGxlIGJveCBzaGFkb3dzXG4gICAgaWYgKHN0ci5zdGFydHNXaXRoKCdyZ2InKSkge1xuICAgICAgICAvLyBXZXJpZCBjb21wdXRlZCBzdHlsZSB0aGluZyB0aGF0IHB1dHMgdGhlIGNvbG9yIGluIHRoZSBmcm9udCBub3QgYmFja1xuICAgICAgICBjb25zdCBjb2xvck1hdGNoID0gc3RyLm1hdGNoKC8ocmdiYT9cXCguKz9cXCkpKC4rKS8pO1xuICAgICAgICBpZiAoY29sb3JNYXRjaCkge1xuICAgICAgICAgICAgc3RyID0gKGNvbG9yTWF0Y2hbMl0gKyAnICcgKyBjb2xvck1hdGNoWzFdKS50cmltKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3QgUEFSVFNfUkVHID0gL1xccyg/IVteKF0qXFwpKS87XG4gICAgY29uc3QgcGFydHMgPSBzdHIuc3BsaXQoUEFSVFNfUkVHKTtcbiAgICBjb25zdCBpbnNldCA9IHBhcnRzLmluY2x1ZGVzKCdpbnNldCcpO1xuICAgIGNvbnN0IGxhc3QgPSBwYXJ0cy5zbGljZSgtMSlbMF07XG4gICAgY29uc3QgY29sb3IgPSAhaXNMZW5ndGgobGFzdCkgPyBsYXN0IDogJ3JnYmEoMCwgMCwgMCwgMSknO1xuICAgIGNvbnN0IG51bXMgPSBwYXJ0c1xuICAgICAgICAuZmlsdGVyKChuKSA9PiBuICE9PSAnaW5zZXQnKVxuICAgICAgICAuZmlsdGVyKChuKSA9PiBuICE9PSBjb2xvcilcbiAgICAgICAgLm1hcCh0b051bSk7XG4gICAgY29uc3QgW29mZnNldFgsIG9mZnNldFksIGJsdXJSYWRpdXMsIHNwcmVhZFJhZGl1c10gPSBudW1zO1xuICAgIGNvbnN0IHBhcnNlZENvbG9yID0gZ2V0UmdiKGNvbG9yKTtcbiAgICBpZiAoIXBhcnNlZENvbG9yKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BhcnNlIGNvbG9yIGVycm9yOiAnICsgY29sb3IpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBpbnNldCxcbiAgICAgICAgb2Zmc2V0WCxcbiAgICAgICAgb2Zmc2V0WSxcbiAgICAgICAgYmx1clJhZGl1cyxcbiAgICAgICAgc3ByZWFkUmFkaXVzLFxuICAgICAgICBjb2xvcjogcGFyc2VkQ29sb3IgfHwgeyByOiAwLCBnOiAwLCBiOiAwLCBhOiAxIH0sXG4gICAgfTtcbn07XG5leHBvcnQgY29uc3QgZ2V0T3BhY2l0eSA9IChzdHlsZXMpID0+IHtcbiAgICByZXR1cm4gTnVtYmVyKHN0eWxlcy5vcGFjaXR5KTtcbn07XG5leHBvcnQgY29uc3QgcGFyc2VCb3hTaGFkb3dWYWx1ZXMgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgdmFsdWVzID0gcGFyc2VNdWx0aXBsZUNTU1ZhbHVlcyhzdHIpO1xuICAgIHJldHVybiB2YWx1ZXMubWFwKHMgPT4gcGFyc2VCb3hTaGFkb3dWYWx1ZShzKSk7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldEltYWdlRmlsbHMobGF5ZXIpIHtcbiAgICBjb25zdCBpbWFnZXMgPSBBcnJheS5pc0FycmF5KGxheWVyLmZpbGxzKSAmJlxuICAgICAgICBsYXllci5maWxscy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udHlwZSA9PT0gJ0lNQUdFJyk7XG4gICAgcmV0dXJuIGltYWdlcztcbn1cbmV4cG9ydCBjb25zdCBkZWZhdWx0UGxhY2Vob2xkZXJDb2xvciA9IGdldFJnYigncmdiYSgxNzgsIDE3OCwgMTc4LCAxKScpO1xuIiwiLy8gaW1wb3J0IHtoZXhUb0ZpZ21hUkdCLCB3ZWJSR0JUb0ZpZ21hUkdCfSBmcm9tICdAZmlnbWEtcGx1Z2luL2hlbHBlcnMnO1xuY29uc3QgbmFtZXNSR0IgPSBbJ3InLCAnZycsICdiJ107XG5leHBvcnQgZnVuY3Rpb24gZmlnbWFSR0JUb1dlYlJHQihjb2xvcikge1xuICAgIGNvbnN0IHJnYiA9IFtdO1xuICAgIG5hbWVzUkdCLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICByZ2JbaV0gPSBNYXRoLnJvdW5kKGNvbG9yW2VdICogMjU1KTtcbiAgICB9KTtcbiAgICBpZiAoY29sb3JbJ2EnXSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICByZ2JbM10gPSBNYXRoLnJvdW5kKGNvbG9yWydhJ10gKiAxMDApIC8gMTAwO1xuICAgIHJldHVybiByZ2I7XG59XG5leHBvcnQgZnVuY3Rpb24gZmlnbWFSR0JUb0hleChjb2xvcikge1xuICAgIGxldCBoZXggPSAnIyc7XG4gICAgY29uc3QgcmdiID0gZmlnbWFSR0JUb1dlYlJHQihjb2xvcik7XG4gICAgaGV4ICs9ICgoMSA8PCAyNCkgKyAocmdiWzBdIDw8IDE2KSArIChyZ2JbMV0gPDwgOCkgKyByZ2JbMl0pLnRvU3RyaW5nKDE2KS5zbGljZSgxKTtcbiAgICBpZiAocmdiWzNdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgYSA9IE1hdGgucm91bmQocmdiWzNdICogMjU1KS50b1N0cmluZygxNik7XG4gICAgICAgIGlmIChhLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICBoZXggKz0gJzAnICsgYTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhICE9PSAnZmYnKVxuICAgICAgICAgICAgICAgIGhleCArPSBhO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBoZXg7XG59XG5leHBvcnQgZnVuY3Rpb24gd2ViUkdCVG9GaWdtYVJHQihjb2xvcikge1xuICAgIGNvbnN0IHJnYiA9IHsgcjogMCwgZzogMCwgYjogMCB9O1xuICAgIG5hbWVzUkdCLmZvckVhY2goKGUsIGkpID0+IHtcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICByZ2JbZV0gPSBjb2xvcltpXSAvIDI1NTtcbiAgICB9KTtcbiAgICBpZiAoY29sb3JbM10gIT09IHVuZGVmaW5lZClcbiAgICAgICAgcmdiWydhJ10gPSBjb2xvclszXTtcbiAgICByZXR1cm4gcmdiO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhleFRvRmlnbWFSR0IoY29sb3IpIHtcbiAgICBsZXQgb3BhY2l0eSA9ICcnO1xuICAgIGNvbG9yID0gY29sb3IudG9Mb3dlckNhc2UoKTtcbiAgICBpZiAoY29sb3JbMF0gPT09ICcjJylcbiAgICAgICAgY29sb3IgPSBjb2xvci5zbGljZSgxKTtcbiAgICBpZiAoY29sb3IubGVuZ3RoID09PSAzKSB7XG4gICAgICAgIGNvbG9yID0gY29sb3IucmVwbGFjZSgvKC4pKC4pKC4pPy9nLCAnJDEkMSQyJDIkMyQzJyk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGNvbG9yLmxlbmd0aCA9PT0gOCkge1xuICAgICAgICBjb25zdCBhcnIgPSBjb2xvci5tYXRjaCgvKC57Nn0pKC57Mn0pLyk7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgY29sb3IgPSBhcnJbMV07XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgb3BhY2l0eSA9IGFyclsyXTtcbiAgICB9XG4gICAgY29uc3QgbnVtID0gcGFyc2VJbnQoY29sb3IsIDE2KTtcbiAgICBjb25zdCByZ2IgPSBbbnVtID4+IDE2LCAobnVtID4+IDgpICYgMjU1LCBudW0gJiAyNTVdO1xuICAgIGlmIChvcGFjaXR5KSB7XG4gICAgICAgIHJnYi5wdXNoKHBhcnNlSW50KG9wYWNpdHksIDE2KSAvIDI1NSk7XG4gICAgICAgIHJldHVybiB3ZWJSR0JUb0ZpZ21hUkdCKHJnYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gd2ViUkdCVG9GaWdtYVJHQihyZ2IpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb1JnYihoZXgpIHtcbiAgICBjb25zdCByZXN1bHQgPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pLmV4ZWMoaGV4KTtcbiAgICByZXR1cm4gcmVzdWx0XG4gICAgICAgID8ge1xuICAgICAgICAgICAgcjogcGFyc2VJbnQocmVzdWx0WzFdLCAxNiksXG4gICAgICAgICAgICBnOiBwYXJzZUludChyZXN1bHRbMl0sIDE2KSxcbiAgICAgICAgICAgIGI6IHBhcnNlSW50KHJlc3VsdFszXSwgMTYpLFxuICAgICAgICB9XG4gICAgICAgIDogbnVsbDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBSR0JBVG9IZXhBKHJlZCwgZ3JlZW4sIGJsdWUsIGFscGhhKSB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KHJlZCwgMTApO1xuICAgIGNvbnN0IGcgPSBwYXJzZUludChncmVlbiwgMTApO1xuICAgIGNvbnN0IGIgPSBwYXJzZUludChibHVlLCAxMCk7XG4gICAgY29uc3QgYSA9IE51bWJlcihwYXJzZUZsb2F0KGFscGhhKS50b0ZpeGVkKDIpKTtcbiAgICBjb25zdCBvdXRQYXJ0cyA9IFtcbiAgICAgICAgci50b1N0cmluZygxNiksXG4gICAgICAgIGcudG9TdHJpbmcoMTYpLFxuICAgICAgICBiLnRvU3RyaW5nKDE2KSxcbiAgICAgICAgTWF0aC5yb3VuZChhICogMjU1KVxuICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgLnN1YnN0cmluZygwLCAyKSxcbiAgICBdO1xuICAgIC8vIFBhZCBzaW5nbGUtZGlnaXQgb3V0cHV0IHZhbHVlc1xuICAgIG91dFBhcnRzLmZvckVhY2goKHBhcnQsIGkpID0+IHtcbiAgICAgICAgaWYgKHBhcnQubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBvdXRQYXJ0c1tpXSA9IGAwJHtwYXJ0fWA7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gYCMke291dFBhcnRzLmpvaW4oJycpfWA7XG59XG5leHBvcnQgZnVuY3Rpb24gaHNsYVRvUmdiYShoc2xhVmFsdWVzKSB7XG4gICAgY29uc3QgaCA9IGhzbGFWYWx1ZXNbMF07XG4gICAgbGV0IHMgPSBoc2xhVmFsdWVzWzFdO1xuICAgIGxldCBsID0gaHNsYVZhbHVlc1syXTtcbiAgICBsZXQgYSA9IDE7XG4gICAgaWYgKGhzbGFWYWx1ZXNbM10pIHtcbiAgICAgICAgYSA9IGhzbGFWYWx1ZXNbM107XG4gICAgfVxuICAgIC8vIE11c3QgYmUgZnJhY3Rpb25zIG9mIDFcbiAgICBzIC89IDEwMDtcbiAgICBsIC89IDEwMDtcbiAgICBjb25zdCBjID0gKDEgLSBNYXRoLmFicygyICogbCAtIDEpKSAqIHM7XG4gICAgY29uc3QgeCA9IGMgKiAoMSAtIE1hdGguYWJzKCgoaCAvIDYwKSAlIDIpIC0gMSkpO1xuICAgIGNvbnN0IG0gPSBsIC0gYyAvIDI7XG4gICAgbGV0IHIgPSAwO1xuICAgIGxldCBnID0gMDtcbiAgICBsZXQgYiA9IDA7XG4gICAgaWYgKGggPj0gMCAmJiBoIDwgNjApIHtcbiAgICAgICAgciA9IGM7XG4gICAgICAgIGcgPSB4O1xuICAgICAgICBiID0gMDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaCA+PSA2MCAmJiBoIDwgMTIwKSB7XG4gICAgICAgIHIgPSB4O1xuICAgICAgICBnID0gYztcbiAgICAgICAgYiA9IDA7XG4gICAgfVxuICAgIGVsc2UgaWYgKGggPj0gMTIwICYmIGggPCAxODApIHtcbiAgICAgICAgciA9IDA7XG4gICAgICAgIGcgPSBjO1xuICAgICAgICBiID0geDtcbiAgICB9XG4gICAgZWxzZSBpZiAoaCA+PSAxODAgJiYgaCA8IDI0MCkge1xuICAgICAgICByID0gMDtcbiAgICAgICAgZyA9IHg7XG4gICAgICAgIGIgPSBjO1xuICAgIH1cbiAgICBlbHNlIGlmIChoID49IDI0MCAmJiBoIDwgMzAwKSB7XG4gICAgICAgIHIgPSB4O1xuICAgICAgICBnID0gMDtcbiAgICAgICAgYiA9IGM7XG4gICAgfVxuICAgIGVsc2UgaWYgKGggPj0gMzAwICYmIGggPCAzNjApIHtcbiAgICAgICAgciA9IGM7XG4gICAgICAgIGcgPSAwO1xuICAgICAgICBiID0geDtcbiAgICB9XG4gICAgciA9IE1hdGgucm91bmQoKHIgKyBtKSAqIDI1NSk7XG4gICAgZyA9IE1hdGgucm91bmQoKGcgKyBtKSAqIDI1NSk7XG4gICAgYiA9IE1hdGgucm91bmQoKGIgKyBtKSAqIDI1NSk7XG4gICAgcmV0dXJuIFtyLCBnLCBiLCBhXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VG9GaWdtYUNvbG9yKGlucHV0KSB7XG4gICAgbGV0IGNvbG9yO1xuICAgIGxldCBvcGFjaXR5O1xuICAgIGlmIChpbnB1dC5zdGFydHNXaXRoKCdyZ2InKSkge1xuICAgICAgICBjb25zdCByZ2JWYWx1ZXMgPSBpbnB1dC5yZXBsYWNlKC9ecmdiYT9cXCh8XFxzK3xcXCkkL2csICcnKS5zcGxpdCgnLCcpLm1hcChuID0+IE51bWJlcihuKSk7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgeyByLCBnLCBiLCBhID0gMSB9ID0gd2ViUkdCVG9GaWdtYVJHQihyZ2JWYWx1ZXMpO1xuICAgICAgICBjb2xvciA9IHsgciwgZywgYiB9O1xuICAgICAgICBvcGFjaXR5ID0gTnVtYmVyKGEpO1xuICAgIH1cbiAgICBlbHNlIGlmIChpbnB1dC5zdGFydHNXaXRoKCdoc2wnKSkge1xuICAgICAgICBjb25zdCBoc2xWYWx1ZXMgPSBpbnB1dC5yZXBsYWNlKC9eaHNsYT9cXCh8XFxzK3wlfFxcKSQvZywgJycpLnNwbGl0KCcsJykubWFwKG4gPT4gTnVtYmVyKG4pKTtcbiAgICAgICAgO1xuICAgICAgICBjb25zdCByZ2JWYWx1ZXMgPSBoc2xhVG9SZ2JhKGhzbFZhbHVlcyk7XG4gICAgICAgIGNvbnN0IHsgciwgZywgYiwgYSA9IDEgfSA9IHdlYlJHQlRvRmlnbWFSR0IocmdiVmFsdWVzKTtcbiAgICAgICAgY29sb3IgPSB7IHIsIGcsIGIgfTtcbiAgICAgICAgb3BhY2l0eSA9IE51bWJlcihhKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgciwgZywgYiwgYSA9IDEgfSA9IGhleFRvRmlnbWFSR0IoaW5wdXQpO1xuICAgICAgICBjb2xvciA9IHsgciwgZywgYiB9O1xuICAgICAgICBvcGFjaXR5ID0gTnVtYmVyKGEpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjb2xvcixcbiAgICAgICAgb3BhY2l0eSxcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgZmlnbWFSR0JUb0hleCB9IGZyb20gJy4vY29sb3JzJztcbmltcG9ydCB7IGNvbnZlcnRUb0ZpZ21hQ29sb3IgfSBmcm9tICcuL2NvbG9ycyc7XG5mdW5jdGlvbiBnZXRUeChkZWcpIHtcbiAgICBpZiAoZGVnID49IDEyMCkge1xuICAgICAgICBpZiAoZGVnID49IDE4MCkge1xuICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuNTtcbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG4vLyBHZXRzIGEgTWF0cml4IGZvciBhIGRlZ3JlZSB2YWx1ZVxuLy8gSWYgeW91IHJlYWQgdGhpcyBhbmQga25vdyBtYXRoICh1bmxpa2UgbWUpLCBQTEVBU0UgZml4IHRoaXMgRDpcbmV4cG9ydCBmdW5jdGlvbiBnZXRNYXRyaXhGb3JEZWdyZWVzKGRlZykge1xuICAgIGNvbnN0IHJhZCA9IHBhcnNlRmxvYXQoZGVnKSAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICBjb25zdCBhID0gTWF0aC5yb3VuZChNYXRoLmNvcyhyYWQpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCBiID0gTWF0aC5yb3VuZChNYXRoLnNpbihyYWQpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCBjID0gLU1hdGgucm91bmQoTWF0aC5zaW4ocmFkKSAqIDEwMCkgLyAxMDA7XG4gICAgY29uc3QgZCA9IE1hdGgucm91bmQoTWF0aC5jb3MocmFkKSAqIDEwMCkgLyAxMDA7XG4gICAgY29uc3QgZGVnTnVtYmVyID0gTnVtYmVyKGRlZyk7XG4gICAgY29uc3QgdHggPSBnZXRUeChkZWdOdW1iZXIpO1xuICAgIGNvbnN0IHR5ID0gZGVnTnVtYmVyID49IDEyMCA/IDEgOiAwO1xuICAgIHJldHVybiBbXG4gICAgICAgIFthLCBiLCB0eF0sXG4gICAgICAgIFtjLCBkLCB0eV0sXG4gICAgXTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnRUb0RlZ3JlZXMobWF0cml4KSB7XG4gICAgY29uc3QgdmFsdWVzID0gWy4uLm1hdHJpeFswXSwgLi4ubWF0cml4WzFdXTtcbiAgICBjb25zdCBhID0gdmFsdWVzWzBdO1xuICAgIGNvbnN0IGIgPSB2YWx1ZXNbMV07XG4gICAgY29uc3QgYW5nbGUgPSBNYXRoLnJvdW5kKE1hdGguYXRhbjIoYiwgYSkgKiAoMTgwIC8gTWF0aC5QSSkpO1xuICAgIHJldHVybiBhbmdsZSA8IDAgPyBhbmdsZSArIDM2MCA6IGFuZ2xlO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldERlZ3JlZXNGb3JNYXRyaXgobWF0cml4KSB7XG4gICAgY29uc3QgZGVncmVlcyA9IGNvbnZlcnRUb0RlZ3JlZXMobWF0cml4KSB8fCAwO1xuICAgIHJldHVybiBgJHtkZWdyZWVzfWRlZ2A7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydERlZ3JlZVRvTnVtYmVyKGRlZ3JlZSkge1xuICAgIHJldHVybiBkZWdyZWUuc3BsaXQoJ2RlZycpLmpvaW4oJycpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnRGaWdtYUdyYWRpZW50VG9TdHJpbmcocGFpbnQpIHtcbiAgICBjb25zdCB7IGdyYWRpZW50VHJhbnNmb3JtLCBncmFkaWVudFN0b3BzIH0gPSBwYWludDtcbiAgICBjb25zdCBncmFkaWVudFN0b3BzU3RyaW5nID0gZ3JhZGllbnRTdG9wc1xuICAgICAgICAubWFwKChzdG9wKSA9PiBgJHtmaWdtYVJHQlRvSGV4KHN0b3AuY29sb3IpfSAke01hdGgucm91bmQoc3RvcC5wb3NpdGlvbiAqIDEwMCAqIDEwMCkgLyAxMDB9JWApXG4gICAgICAgIC5qb2luKCcsICcpO1xuICAgIGNvbnN0IGdyYWRpZW50VHJhbnNmb3JtU3RyaW5nID0gZ2V0RGVncmVlc0Zvck1hdHJpeChncmFkaWVudFRyYW5zZm9ybSk7XG4gICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHtncmFkaWVudFRyYW5zZm9ybVN0cmluZ30sICR7Z3JhZGllbnRTdG9wc1N0cmluZ30pYDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9GaWdtYUdyYWRpZW50KHZhbHVlKSB7XG4gICAgY29uc3QgW2dyYWRpZW50RGVncmVlcywgLi4uY29sb3JTdG9wc10gPSB2YWx1ZVxuICAgICAgICAuc3Vic3RyaW5nKHZhbHVlLmluZGV4T2YoJygnKSArIDEsIHZhbHVlLmxhc3RJbmRleE9mKCcpJykpXG4gICAgICAgIC5zcGxpdCgnLCAnKTtcbiAgICBjb25zdCBkZWdyZWVzID0gY29udmVydERlZ3JlZVRvTnVtYmVyKGdyYWRpZW50RGVncmVlcyk7XG4gICAgY29uc3QgZ3JhZGllbnRUcmFuc2Zvcm0gPSBnZXRNYXRyaXhGb3JEZWdyZWVzKGRlZ3JlZXMpO1xuICAgIGNvbnN0IGdyYWRpZW50U3RvcHMgPSBjb2xvclN0b3BzLm1hcCgoc3RvcCkgPT4ge1xuICAgICAgICBjb25zdCBzZXBlcmF0ZWRTdG9wID0gc3RvcC5zcGxpdCgnICcpO1xuICAgICAgICBjb25zdCB7IGNvbG9yLCBvcGFjaXR5IH0gPSBjb252ZXJ0VG9GaWdtYUNvbG9yKHNlcGVyYXRlZFN0b3BbMF0pO1xuICAgICAgICBjb25zdCBncmFkaWVudENvbG9yID0gY29sb3I7XG4gICAgICAgIGdyYWRpZW50Q29sb3IuYSA9IG9wYWNpdHk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb2xvcjogZ3JhZGllbnRDb2xvcixcbiAgICAgICAgICAgIHBvc2l0aW9uOiBwYXJzZUZsb2F0KHNlcGVyYXRlZFN0b3BbMV0pIC8gMTAwLFxuICAgICAgICB9O1xuICAgIH0pO1xuICAgIHJldHVybiB7IGdyYWRpZW50U3RvcHMsIGdyYWRpZW50VHJhbnNmb3JtIH07XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY29udmVydE51bWJlclRvRmlnbWEodmFsdWUpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsdWUsIDEwKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmYWtlWmVyb0ZvckZpZ21hKHZhbHVlKSB7XG4gICAgcmV0dXJuIE51bWJlcih2YWx1ZSkgPT09IDAgPyAwLjAwMSA6IE51bWJlcih2YWx1ZSk7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlKSB7XG4gICAgY29uc3QgYmFzZUZvbnRTaXplID0gMTY7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgKHZhbHVlLmVuZHNXaXRoKCdlbScpIHx8IHZhbHVlLmVuZHNXaXRoKCdyZW0nKSkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUpICogYmFzZUZvbnRTaXplO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyA/IHBhcnNlRmxvYXQodmFsdWUpIDogdmFsdWU7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydExldHRlclNwYWNpbmdUb0ZpZ21hKGlucHV0VmFsdWUpIHtcbiAgICBsZXQgbGV0dGVyU3BhY2luZztcbiAgICBjb25zdCB2YWx1ZSA9IGlucHV0VmFsdWUudG9TdHJpbmcoKTtcbiAgICBjb25zdCBudW1iZXJzID0gL14tP1xcZCsoXFwuXFxkKyk/JC87XG4gICAgaWYgKHZhbHVlLnRyaW0oKS5zbGljZSgtMSkgPT09ICclJyAmJlxuICAgICAgICB2YWx1ZS50cmltKCkuc2xpY2UoMCwgLTEpLm1hdGNoKG51bWJlcnMpKSB7XG4gICAgICAgIGxldHRlclNwYWNpbmcgPSB7XG4gICAgICAgICAgICB1bml0OiAnUEVSQ0VOVCcsXG4gICAgICAgICAgICB2YWx1ZTogTnVtYmVyKHZhbHVlLnNsaWNlKDAsIC0xKSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKHZhbHVlLm1hdGNoKG51bWJlcnMpIHx8IHZhbHVlLmVuZHNXaXRoKCdweCcpKSB7XG4gICAgICAgIGxldHRlclNwYWNpbmcgPSB7XG4gICAgICAgICAgICB1bml0OiAnUElYRUxTJyxcbiAgICAgICAgICAgIHZhbHVlOiBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbGV0dGVyU3BhY2luZztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0RmlnbWFUb0xldHRlclNwYWNpbmcoaW5wdXRWYWx1ZSkge1xuICAgIGNvbnN0IHsgdW5pdCwgdmFsdWUgfSA9IGlucHV0VmFsdWU7XG4gICAgaWYgKHVuaXQgPT09ICdQRVJDRU5UJykge1xuICAgICAgICByZXR1cm4gYCR7K3ZhbHVlLnRvRml4ZWQoMil9JWA7XG4gICAgfVxuICAgIHJldHVybiArdmFsdWUudG9GaXhlZCgyKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0TGluZUhlaWdodFRvRmlnbWEoaW5wdXRWYWx1ZSkge1xuICAgIGxldCBsaW5lSGVpZ2h0O1xuICAgIGNvbnN0IHZhbHVlID0gaW5wdXRWYWx1ZS50b1N0cmluZygpO1xuICAgIGNvbnN0IG51bWJlcnMgPSAvXlxcZCsoXFwuXFxkKyk/JC87XG4gICAgaWYgKHZhbHVlLm1hdGNoKG51bWJlcnMpIHx8IHZhbHVlLmVuZHNXaXRoKCdweCcpKSB7XG4gICAgICAgIGxpbmVIZWlnaHQgPSB7XG4gICAgICAgICAgICB1bml0OiAnUElYRUxTJyxcbiAgICAgICAgICAgIHZhbHVlOiBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICh2YWx1ZS50cmltKCkuc2xpY2UoLTEpID09PSAnJScgJiZcbiAgICAgICAgdmFsdWUudHJpbSgpLnNsaWNlKDAsIC0xKS5tYXRjaChudW1iZXJzKSkge1xuICAgICAgICBsaW5lSGVpZ2h0ID0ge1xuICAgICAgICAgICAgdW5pdDogJ1BFUkNFTlQnLFxuICAgICAgICAgICAgdmFsdWU6IE51bWJlcih2YWx1ZS5zbGljZSgwLCAtMSkpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgbGluZUhlaWdodCA9IHtcbiAgICAgICAgICAgIHVuaXQ6ICdBVVRPJyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmVIZWlnaHQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY29udmVydEZpZ21hVG9MaW5lSGVpZ2h0KGlucHV0VmFsdWUpIHtcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgY29uc3QgeyB1bml0LCB2YWx1ZSB9ID0gaW5wdXRWYWx1ZTtcbiAgICBpZiAodW5pdCA9PT0gJ1BJWEVMUycpIHtcbiAgICAgICAgcmV0dXJuICt2YWx1ZS50b0ZpeGVkKDIpO1xuICAgIH1cbiAgICBpZiAodW5pdCA9PT0gJ1BFUkNFTlQnKSB7XG4gICAgICAgIHJldHVybiBgJHsrdmFsdWUudG9GaXhlZCgyKX0lYDtcbiAgICB9XG4gICAgcmV0dXJuICdBVVRPJztcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnZlcnRPcGFjaXR5VG9GaWdtYSh2YWx1ZSkge1xuICAgIGNvbnN0IG1hdGNoZWRQZXJjZW50ID0gdmFsdWUudG9TdHJpbmcoKS5tYXRjaCgvKFxcZCslKS8pO1xuICAgIC8vIE1hdGNoZXMgNTAlLCAxMDAlLCBldGMuXG4gICAgaWYgKG1hdGNoZWRQZXJjZW50ICYmIG1hdGNoZWRQZXJjZW50Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gTnVtYmVyKG1hdGNoZWRQZXJjZW50WzBdLnNsaWNlKDAsIC0xKSkgLyAxMDA7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIodmFsdWUpO1xufVxuZXhwb3J0IGNvbnN0IHRyYW5zZm9ybVNpemUgPSAodmFsdWUpID0+IGZha2VaZXJvRm9yRmlnbWEoY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlKSk7XG5leHBvcnQgY29uc3QgdHJhbnNmb3JtU3BhY2UgPSAodmFsdWUpID0+IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZSk7XG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtVmFsdWUodmFsdWUsIHR5cGUpIHtcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAnYm9yZGVyV2lkdGgnOlxuICAgICAgICBjYXNlICd3aWR0aCc6XG4gICAgICAgIGNhc2UgJ2hlaWdodCc6XG4gICAgICAgIGNhc2UgJ3NpemluZyc6XG4gICAgICAgICAgICByZXR1cm4gZmFrZVplcm9Gb3JGaWdtYShjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpKTtcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzJzpcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzVG9wTGVmdCc6XG4gICAgICAgIGNhc2UgJ2JvcmRlclJhZGl1c1RvcFJpZ2h0JzpcbiAgICAgICAgY2FzZSAnYm9yZGVyUmFkaXVzQm90dG9tUmlnaHQnOlxuICAgICAgICBjYXNlICdib3JkZXJSYWRpdXNCb3R0b21MZWZ0JzpcbiAgICAgICAgY2FzZSAnc3BhY2luZyc6XG4gICAgICAgIGNhc2UgJ2hvcml6b250YWxQYWRkaW5nJzpcbiAgICAgICAgY2FzZSAndmVydGljYWxQYWRkaW5nJzpcbiAgICAgICAgY2FzZSAncGFkZGluZ1RvcCc6XG4gICAgICAgIGNhc2UgJ3BhZGRpbmdSaWdodCc6XG4gICAgICAgIGNhc2UgJ3BhZGRpbmdCb3R0b20nOlxuICAgICAgICBjYXNlICdwYWRkaW5nTGVmdCc6XG4gICAgICAgIGNhc2UgJ2l0ZW1TcGFjaW5nJzpcbiAgICAgICAgY2FzZSAnYm94U2hhZG93JzpcbiAgICAgICAgY2FzZSAncGFyYWdyYXBoU3BhY2luZyc6XG4gICAgICAgIGNhc2UgJ2ZvbnRTaXplJzpcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUpO1xuICAgICAgICBjYXNlICdsZXR0ZXJTcGFjaW5nJzpcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0TGV0dGVyU3BhY2luZ1RvRmlnbWEodmFsdWUpO1xuICAgICAgICBjYXNlICdsaW5lSGVpZ2h0JzpcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0TGluZUhlaWdodFRvRmlnbWEodmFsdWUpO1xuICAgICAgICBjYXNlICdvcGFjaXR5JzpcbiAgICAgICAgICAgIHJldHVybiBjb252ZXJ0T3BhY2l0eVRvRmlnbWEodmFsdWUudG9TdHJpbmcoKSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19yZXN0ID0gKHRoaXMgJiYgdGhpcy5fX3Jlc3QpIHx8IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgdmFyIHQgPSB7fTtcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcbiAgICAgICAgdFtwXSA9IHNbcF07XG4gICAgaWYgKHMgIT0gbnVsbCAmJiB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyA9PT0gXCJmdW5jdGlvblwiKVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXG4gICAgICAgICAgICAgICAgdFtwW2ldXSA9IHNbcFtpXV07XG4gICAgICAgIH1cbiAgICByZXR1cm4gdDtcbn07XG5pbXBvcnQgeyBhZGRMYXllcnNUb0ZyYW1lIH0gZnJvbSAnaHRtbC1maWdtYS9maWdtYSc7XG5pbXBvcnQgeyBhc3NpZ24gfSBmcm9tICdodG1sLWZpZ21hL2ZpZ21hL2hlbHBlcnMnO1xuZXhwb3J0IGNvbnN0IHVwZGF0ZU5vZGUgPSAobm9kZSwgbmV3TGF5ZXIpID0+IF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiogKCkge1xuICAgIGNvbnN0IHsgXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIGNvbnN0cmFpbnRzLCBcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgY2hpbGRyZW4sIHgsIHksIG5hbWUgfSA9IG5ld0xheWVyLCByZXN0TGF5ZXJEYXRhID0gX19yZXN0KG5ld0xheWVyLCBbXCJjb25zdHJhaW50c1wiLCBcImNoaWxkcmVuXCIsIFwieFwiLCBcInlcIiwgXCJuYW1lXCJdKTtcbiAgICBhc3NpZ24obm9kZSwgcmVzdExheWVyRGF0YSk7XG4gICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgbm9kZS5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCkgPT4gY2hpbGQucmVtb3ZlKCkpO1xuICAgIH1cbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgaWYgKG5ld0xheWVyLmNoaWxkcmVuKSB7XG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgeWllbGQgYWRkTGF5ZXJzVG9GcmFtZShuZXdMYXllci5jaGlsZHJlbi5yZXZlcnNlKCksIG5vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn0pO1xuIiwidmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG5pbXBvcnQgY29udmVydE9wYWNpdHlUb0ZpZ21hLCB7IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSwgdHJhbnNmb3JtU2l6ZSwgdHJhbnNmb3JtU3BhY2UsIHRyYW5zZm9ybVZhbHVlLCB9IGZyb20gJy4vaGVscGVycy90cmFuc2Zvcm1WYWx1ZSc7XG5pbXBvcnQgeyBjb252ZXJ0VG9GaWdtYUNvbG9yIH0gZnJvbSAnLi9oZWxwZXJzL2NvbG9ycyc7XG5pbXBvcnQgeyBjb252ZXJ0U3RyaW5nVG9GaWdtYUdyYWRpZW50IH0gZnJvbSAnLi9oZWxwZXJzL2dyYWRpZW50cyc7XG5leHBvcnQgZnVuY3Rpb24gc2V0Rm9udCh0YXJnZXQsIHRva2VuKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHsgdmFsdWUsIGRlc2NyaXB0aW9uIH0gPSB0b2tlbjtcbiAgICAgICAgICAgIGNvbnN0IHsgZm9udEZhbWlseSwgZm9udFdlaWdodCwgZm9udFNpemUsIGxpbmVIZWlnaHQsIGxldHRlclNwYWNpbmcsIHBhcmFncmFwaFNwYWNpbmcsIH0gPSB2YWx1ZTtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIGNvbnN0IGZhbWlseSA9IGZvbnRGYW1pbHkgfHwgdGFyZ2V0LmZvbnROYW1lLmZhbWlseTtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIGNvbnN0IHN0eWxlID0gZm9udFdlaWdodCB8fCB0YXJnZXQuZm9udE5hbWUuc3R5bGU7XG4gICAgICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKHsgZmFtaWx5LCBzdHlsZSB9KTtcbiAgICAgICAgICAgIGlmIChmb250RmFtaWx5ICYmIGZvbnRXZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQuZm9udE5hbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZhbWlseSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmb250U2l6ZSkge1xuICAgICAgICAgICAgICAgIHRhcmdldC5mb250U2l6ZSA9IHRyYW5zZm9ybVZhbHVlKGZvbnRTaXplLCAnZm9udFNpemUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsaW5lSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LmxpbmVIZWlnaHQgPSB0cmFuc2Zvcm1WYWx1ZShsaW5lSGVpZ2h0LCAnbGluZUhlaWdodCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxldHRlclNwYWNpbmcpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQubGV0dGVyU3BhY2luZyA9IHRyYW5zZm9ybVZhbHVlKGxldHRlclNwYWNpbmcsICdsZXR0ZXJTcGFjaW5nJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocGFyYWdyYXBoU3BhY2luZykge1xuICAgICAgICAgICAgICAgIHRhcmdldC5wYXJhZ3JhcGhTcGFjaW5nID0gdHJhbnNmb3JtVmFsdWUocGFyYWdyYXBoU3BhY2luZywgJ3BhcmFncmFwaFNwYWNpbmcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZXNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgICAgICB0YXJnZXQuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHNldHRpbmcgZm9udCBvbiB0YXJnZXQnLCB0YXJnZXQsIHRva2VuLCBlKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNldENvbG9yVmFsdWVzT25UYXJnZXQodGFyZ2V0LCB2YWx1ZSwgZGVzY3JpcHRpb24sIGtleSA9ICdwYWludHMnKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHZhbHVlLnN0YXJ0c1dpdGgoJ2xpbmVhci1ncmFkaWVudCcpKSB7XG4gICAgICAgICAgICBjb25zdCB7IGdyYWRpZW50U3RvcHMsIGdyYWRpZW50VHJhbnNmb3JtLCB9ID0gY29udmVydFN0cmluZ1RvRmlnbWFHcmFkaWVudCh2YWx1ZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdQYWludCA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnR1JBRElFTlRfTElORUFSJyxcbiAgICAgICAgICAgICAgICBncmFkaWVudFRyYW5zZm9ybSxcbiAgICAgICAgICAgICAgICBncmFkaWVudFN0b3BzLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gW25ld1BhaW50XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHsgY29sb3IsIG9wYWNpdHkgfSA9IGNvbnZlcnRUb0ZpZ21hQ29sb3IodmFsdWUpO1xuICAgICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbeyBjb2xvciwgb3BhY2l0eSwgdHlwZTogJ1NPTElEJyB9XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgIHRhcmdldC5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNldHRpbmcgY29sb3InLCBlKTtcbiAgICB9XG59XG5leHBvcnQgY29uc3Qgc2V0RmlsbFRvTm9kZSA9IChub2RlLCB0b2tlbikgPT4ge1xuICAgIC8vIEZJTExcbiAgICBpZiAodG9rZW4udmFsdWUuZmlsbCAmJiB0eXBlb2YgdG9rZW4udmFsdWUuZmlsbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLmZpbGxzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc2V0Q29sb3JWYWx1ZXNPblRhcmdldChub2RlLCB0b2tlbi52YWx1ZS5maWxsLCB0b2tlbi5kZXNjcmlwdGlvbiwgJ2ZpbGxzJyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHNldEJvcmRlckNvbG9yID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdG9rZW47XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5ib3JkZXJDb2xvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlLnN0cm9rZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCB7IGNvbG9yLCBvcGFjaXR5IH0gPSBjb252ZXJ0VG9GaWdtYUNvbG9yKHZhbHVlLmJvcmRlckNvbG9yKTtcbiAgICAgICAgICAgIG5vZGUuc3Ryb2tlcyA9IFt7IHR5cGU6ICdTT0xJRCcsIGNvbG9yLCBvcGFjaXR5IH1dO1xuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRCb3JkZXJSYWRpdXMgPSAobm9kZSwgdG9rZW4pID0+IHtcbiAgICBjb25zdCB7IHZhbHVlIH0gPSB0b2tlbjtcbiAgICAvLyBCT1JERVIgUkFESVVTXG4gICAgLy8gaWYgKFxuICAgIC8vICAgICB0eXBlb2YgdmFsdWUuYm9yZGVyUmFkaXVzICE9PSAndW5kZWZpbmVkJyAmJlxuICAgIC8vICAgICB0eXBlb2Ygbm9kZS5jb3JuZXJSYWRpdXMgIT09ICd1bmRlZmluZWQnXG4gICAgLy8gKSB7XG4gICAgLy8gICAgIG5vZGUuY29ybmVyUmFkaXVzID0gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlLmJvcmRlclJhZGl1cyk7XG4gICAgLy8gfVxuICAgIGlmICh0eXBlb2YgdmFsdWUuYm9yZGVyUmFkaXVzVG9wTGVmdCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUudG9wTGVmdFJhZGl1cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS50b3BMZWZ0UmFkaXVzID0gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlLmJvcmRlclJhZGl1c1RvcExlZnQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLmJvcmRlclJhZGl1c1RvcFJpZ2h0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS50b3BSaWdodFJhZGl1cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS50b3BSaWdodFJhZGl1cyA9IGNvbnZlcnRUeXBvZ3JhcGh5TnVtYmVyVG9GaWdtYSh2YWx1ZS5ib3JkZXJSYWRpdXNUb3BSaWdodCk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUuYm9yZGVyUmFkaXVzQm90dG9tUmlnaHQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLmJvdHRvbVJpZ2h0UmFkaXVzID0gY29udmVydFR5cG9ncmFwaHlOdW1iZXJUb0ZpZ21hKHZhbHVlLmJvcmRlclJhZGl1c0JvdHRvbVJpZ2h0KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5ib3JkZXJSYWRpdXNCb3R0b21MZWZ0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5ib3R0b21MZWZ0UmFkaXVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLmJvdHRvbUxlZnRSYWRpdXMgPSBjb252ZXJ0VHlwb2dyYXBoeU51bWJlclRvRmlnbWEodmFsdWUuYm9yZGVyUmFkaXVzQm90dG9tTGVmdCk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRQYWRkaW5nID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdG9rZW47XG4gICAgLy8gU1BBQ0lOR1xuICAgIC8vIGlmIChcbiAgICAvLyAgICAgdHlwZW9mIHZhbHVlLnNwYWNpbmcgIT09ICd1bmRlZmluZWQnICYmXG4gICAgLy8gICAgIHR5cGVvZiBub2RlLnBhZGRpbmdMZWZ0ICE9PSAndW5kZWZpbmVkJ1xuICAgIC8vICkge1xuICAgIC8vICAgICBub2RlLnBhZGRpbmdMZWZ0ID0gdHJhbnNmb3JtU3BhY2UodmFsdWUuc3BhY2luZyk7XG4gICAgLy8gICAgIG5vZGUucGFkZGluZ1JpZ2h0ID0gdHJhbnNmb3JtU3BhY2UodmFsdWUuc3BhY2luZyk7XG4gICAgLy8gICAgIG5vZGUucGFkZGluZ1RvcCA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnNwYWNpbmcpO1xuICAgIC8vICAgICBub2RlLnBhZGRpbmdCb3R0b20gPSB0cmFuc2Zvcm1TcGFjZSh2YWx1ZS5zcGFjaW5nKTtcbiAgICAvLyAgICAgbm9kZS5pdGVtU3BhY2luZyA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnNwYWNpbmcpO1xuICAgIC8vIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLml0ZW1TcGFjaW5nICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5pdGVtU3BhY2luZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5pdGVtU3BhY2luZyA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLml0ZW1TcGFjaW5nKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5wYWRkaW5nVG9wICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5wYWRkaW5nVG9wICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnBhZGRpbmdUb3AgPSB0cmFuc2Zvcm1TcGFjZSh2YWx1ZS5wYWRkaW5nVG9wKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5wYWRkaW5nUmlnaHQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnBhZGRpbmdSaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5wYWRkaW5nUmlnaHQgPSB0cmFuc2Zvcm1TcGFjZSh2YWx1ZS5wYWRkaW5nUmlnaHQpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLnBhZGRpbmdCb3R0b20gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnBhZGRpbmdCb3R0b20gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUucGFkZGluZ0JvdHRvbSA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnBhZGRpbmdCb3R0b20pO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHZhbHVlLnBhZGRpbmdMZWZ0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5wYWRkaW5nTGVmdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5wYWRkaW5nTGVmdCA9IHRyYW5zZm9ybVNwYWNlKHZhbHVlLnBhZGRpbmdMZWZ0KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHNldEJvcmRlcldpZHRoID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgLy8gQk9SREVSIFdJRFRIXG4gICAgaWYgKHR5cGVvZiB0b2tlbi52YWx1ZS5ib3JkZXJXaWR0aCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUuc3Ryb2tlV2VpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnN0cm9rZVdlaWdodCA9IHRyYW5zZm9ybVNpemUodG9rZW4udmFsdWUuYm9yZGVyV2lkdGgpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc2V0T3BhY2l0eSA9IChub2RlLCB0b2tlbikgPT4ge1xuICAgIGlmICh0eXBlb2YgdG9rZW4udmFsdWUub3BhY2l0eSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUub3BhY2l0eSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5vcGFjaXR5ID0gY29udmVydE9wYWNpdHlUb0ZpZ21hKHRva2VuLnZhbHVlLm9wYWNpdHkpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc2V0U2l6ZSA9IChub2RlLCB0b2tlbikgPT4ge1xuICAgIC8vIFNJWklORzogQk9USFxuICAgIGlmICh0eXBlb2YgdG9rZW4udmFsdWUuc2l6aW5nICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB0eXBlb2Ygbm9kZS5yZXNpemUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG5vZGUucmVzaXplKHRyYW5zZm9ybVNpemUodG9rZW4udmFsdWUuc2l6aW5nKSwgdHJhbnNmb3JtU2l6ZSh0b2tlbi52YWx1ZS5zaXppbmcpKTtcbiAgICB9XG4gICAgLy8gU0laSU5HOiBXSURUSFxuICAgIGlmICh0eXBlb2YgdG9rZW4udmFsdWUud2lkdGggIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLnJlc2l6ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgbm9kZS5yZXNpemUodHJhbnNmb3JtU2l6ZSh0b2tlbi52YWx1ZS53aWR0aCksIG5vZGUuaGVpZ2h0KTtcbiAgICB9XG4gICAgLy8gU0laSU5HOiBIRUlHSFRcbiAgICBpZiAodHlwZW9mIHRva2VuLnZhbHVlLmhlaWdodCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgdHlwZW9mIG5vZGUucmVzaXplICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBub2RlLnJlc2l6ZShub2RlLndpZHRoLCB0cmFuc2Zvcm1TaXplKHRva2VuLnZhbHVlLmhlaWdodCkpO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3Qgc2V0Qm94U2hhZG93ID0gKG5vZGUsIHRva2VuKSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZSB9ID0gdG9rZW47XG4gICAgaWYgKHR5cGVvZiB2YWx1ZS5ib3hTaGFkb3cgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIHR5cGVvZiBub2RlLmVmZmVjdHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIGdldCBhbGwgZWZmZWN0cywgYnV0IHJlbW92ZSBEUk9QX1NIQURPVywgc2luY2Ugd2UncmUgYWJvdXQgdG8gYWRkIGl0XG4gICAgICAgIGNvbnN0IGVmZmVjdHMgPSBub2RlLmVmZmVjdHMuZmlsdGVyKChlZmZlY3QpID0+IGVmZmVjdC50eXBlICE9PSAnRFJPUF9TSEFET1cnKTtcbiAgICAgICAgY29uc3QgeyB4LCB5LCBzcHJlYWQsIGNvbG9yLCBibHVyIH0gPSB2YWx1ZS5ib3hTaGFkb3c7XG4gICAgICAgIGNvbnN0IHsgY29sb3I6IHsgciwgZywgYiB9LCBvcGFjaXR5LCB9ID0gY29udmVydFRvRmlnbWFDb2xvcihjb2xvcik7XG4gICAgICAgIGNvbnN0IGVmZmVjdCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdEUk9QX1NIQURPVycsXG4gICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgYmxlbmRNb2RlOiAnTk9STUFMJyxcbiAgICAgICAgICAgIGNvbG9yOiB7IHIsIGcsIGIsIGE6IG9wYWNpdHkgfSxcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICAgIHg6IHRyYW5zZm9ybVZhbHVlKHgsICdib3hTaGFkb3cnKSxcbiAgICAgICAgICAgICAgICB5OiB0cmFuc2Zvcm1WYWx1ZSh5LCAnYm94U2hhZG93JyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmFkaXVzOiB0cmFuc2Zvcm1WYWx1ZShibHVyLCAnYm94U2hhZG93JyksXG4gICAgICAgICAgICBzcHJlYWQ6IHRyYW5zZm9ybVZhbHVlKHNwcmVhZCwgJ2JveFNoYWRvdycpLFxuICAgICAgICB9O1xuICAgICAgICBlZmZlY3RzLnB1c2goZWZmZWN0KTtcbiAgICAgICAgbm9kZS5lZmZlY3RzID0gZWZmZWN0cztcbiAgICB9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIHNldFRva2VuVG9Ob2RlKG5vZGUsIHRva2VuKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNldEZpbGxUb05vZGUobm9kZSwgdG9rZW4pO1xuICAgICAgICAgICAgc2V0Qm9yZGVyUmFkaXVzKG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIHNldEJveFNoYWRvdyhub2RlLCB0b2tlbik7XG4gICAgICAgICAgICBzZXRPcGFjaXR5KG5vZGUsIHRva2VuKTtcbiAgICAgICAgICAgIHNldFNpemUobm9kZSwgdG9rZW4pO1xuICAgICAgICAgICAgaWYgKG5vZGUudHlwZSA9PT0gJ1RFWFQnKSB7XG4gICAgICAgICAgICAgICAgc2V0Rm9udChub2RlLCB0b2tlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRCb3JkZXJXaWR0aChub2RlLCB0b2tlbik7XG4gICAgICAgICAgICBzZXRCb3JkZXJDb2xvcihub2RlLCB0b2tlbik7XG4gICAgICAgICAgICBzZXRQYWRkaW5nKG5vZGUsIHRva2VuKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHNldHRpbmcgZGF0YSBvbiBub2RlJywgZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbiIsImV4cG9ydCB2YXIgRmlnbWFNZXNzYWdlVHlwZTtcbihmdW5jdGlvbiAoRmlnbWFNZXNzYWdlVHlwZSkge1xuICAgIEZpZ21hTWVzc2FnZVR5cGVbRmlnbWFNZXNzYWdlVHlwZVtcIklNUE9SVFwiXSA9IDBdID0gXCJJTVBPUlRcIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJVUERBVEVcIl0gPSAxXSA9IFwiVVBEQVRFXCI7XG4gICAgRmlnbWFNZXNzYWdlVHlwZVtGaWdtYU1lc3NhZ2VUeXBlW1wiUkVOREVSXCJdID0gMl0gPSBcIlJFTkRFUlwiO1xuICAgIEZpZ21hTWVzc2FnZVR5cGVbRmlnbWFNZXNzYWdlVHlwZVtcIklNUE9SVF9WQVJJQU5UU1wiXSA9IDNdID0gXCJJTVBPUlRfVkFSSUFOVFNcIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJBUFBMWV9UT0tFTlwiXSA9IDRdID0gXCJBUFBMWV9UT0tFTlwiO1xuICAgIEZpZ21hTWVzc2FnZVR5cGVbRmlnbWFNZXNzYWdlVHlwZVtcIkFQUExZX1RPS0VOU1wiXSA9IDVdID0gXCJBUFBMWV9UT0tFTlNcIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJTRUxFQ1RfTk9ERVwiXSA9IDZdID0gXCJTRUxFQ1RfTk9ERVwiO1xuICAgIEZpZ21hTWVzc2FnZVR5cGVbRmlnbWFNZXNzYWdlVHlwZVtcIkNMRUFSX1NFTEVDVElPTlwiXSA9IDddID0gXCJDTEVBUl9TRUxFQ1RJT05cIjtcbiAgICBGaWdtYU1lc3NhZ2VUeXBlW0ZpZ21hTWVzc2FnZVR5cGVbXCJSRU5ERVJfVE9LRU5TX1NZTkNcIl0gPSA4XSA9IFwiUkVOREVSX1RPS0VOU19TWU5DXCI7XG59KShGaWdtYU1lc3NhZ2VUeXBlIHx8IChGaWdtYU1lc3NhZ2VUeXBlID0ge30pKTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBkZWZpbml0aW9uKSB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7IH0iLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xuaW1wb3J0IHsgYWRkTGF5ZXJzVG9GcmFtZSwgZGVmYXVsdEZvbnQsIGdldERyb3BPZmZzZXQgfSBmcm9tICdodG1sLWZpZ21hL2ZpZ21hJztcbmltcG9ydCB7IEZpZ21hTWVzc2FnZVR5cGUsIH0gZnJvbSAnLi4vLi4vc3JjL0ZpZ21hTWVzc2FnZVR5cGUnO1xuaW1wb3J0IHsgdXBkYXRlTm9kZSB9IGZyb20gJy4vaGVscGVycy91cGRhdGVOb2RlJztcbmltcG9ydCB7IHNldFRva2VuVG9Ob2RlIH0gZnJvbSAnLi9zZXRUb2tlblRvTm9kZSc7XG4vL0B0cy1pZ25vcmVcbmZpZ21hLnNob3dVSShfX2h0bWxfXywge1xuICAgIHdpZHRoOiA3NTAsXG4gICAgaGVpZ2h0OiA2MDAsXG59KTtcbmNvbnN0IHBvc3RNZXNzYWdlID0gKGRhdGEpID0+IHtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShkYXRhKTtcbn07XG5jb25zdCBnZXRQbHVnaW5EYXRhID0gKG5vZGUpID0+IHtcbiAgICBjb25zdCB0b2tlbnMgPSBub2RlLmdldFBsdWdpbkRhdGEoJ3Rva2VucycpO1xuICAgIGNvbnN0IGNvbXBvbmVudERhdGEgPSBub2RlLmdldFBsdWdpbkRhdGEoJ2NvbXBvbmVudERhdGEnKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbnM6IHRva2VucyA/IEpTT04ucGFyc2UodG9rZW5zKSA6IG51bGwsXG4gICAgICAgIGNvbXBvbmVudERhdGE6IGNvbXBvbmVudERhdGEgPyBKU09OLnBhcnNlKGNvbXBvbmVudERhdGEpIDogbnVsbCxcbiAgICB9O1xufTtcbmNvbnN0IHNldFBsdWdpbkRhdGEgPSAobm9kZSwgcGF5bG9hZCkgPT4ge1xuICAgIGNvbnN0IHsgdG9rZW5zLCBjb21wb25lbnREYXRhIH0gPSBwYXlsb2FkO1xuICAgIHRva2VucyAmJiBub2RlLnNldFBsdWdpbkRhdGEoJ3Rva2VucycsIEpTT04uc3RyaW5naWZ5KHRva2VucykpO1xuICAgIGNvbXBvbmVudERhdGEgJiZcbiAgICAgICAgbm9kZS5zZXRQbHVnaW5EYXRhKCdjb21wb25lbnREYXRhJywgSlNPTi5zdHJpbmdpZnkoY29tcG9uZW50RGF0YSkpO1xufTtcbmNvbnN0IHNldFRva2VucyA9IChub2RlSWQsIHRva2VucykgPT4ge1xuICAgIGNvbnN0IG5vZGUgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kT25lKChub2RlKSA9PiBub2RlLmlkID09PSBub2RlSWQpO1xuICAgIGlmICghbm9kZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBDYW4ndCBmaW5kIE5vZGVJZDogJHtub2RlSWR9YCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgc2V0VG9rZW5Ub05vZGUobm9kZSwgdG9rZW4pO1xuICAgIH1cbiAgICBzZXRQbHVnaW5EYXRhKG5vZGUsIHsgdG9rZW5zIH0pO1xufTtcbmNvbnN0IHVwZGF0ZVRva2Vuc09uTm9kZSA9IChub2RlLCBub2RlVG9rZW5zLCBhbGxUb2tlbnMpID0+IHtcbiAgICBjb25zdCBuZXdUb2tlbnMgPSBub2RlVG9rZW5zLm1hcCgodG9rZW4pID0+IHtcbiAgICAgICAgY29uc3QgbmV3VmFsdWUgPSBhbGxUb2tlbnNbdG9rZW4ubmFtZV07XG4gICAgICAgIGlmICh0eXBlb2YgbmV3VmFsdWUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModG9rZW4udmFsdWUpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZVtrZXldICE9PSBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgICAgICAgICAgICAgIHRva2VuLnZhbHVlW2tleV0gPSBuZXdWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0pO1xuICAgIHNldFRva2Vucyhub2RlLmlkLCBuZXdUb2tlbnMpO1xufTtcbmZpZ21hLm9uKCdzZWxlY3Rpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgY29uc3Qgbm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5zZWxlY3Rpb247XG4gICAgaWYgKCFub2Rlcy5sZW5ndGgpIHtcbiAgICAgICAgcG9zdE1lc3NhZ2UoeyB0eXBlOiBGaWdtYU1lc3NhZ2VUeXBlLkNMRUFSX1NFTEVDVElPTiB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgdHlwZTogRmlnbWFNZXNzYWdlVHlwZS5TRUxFQ1RfTk9ERSxcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICBub2Rlczogbm9kZXMubWFwKChuKSA9PiAoT2JqZWN0LmFzc2lnbih7IG5vZGVJZDogbi5pZCB9LCBnZXRQbHVnaW5EYXRhKG4pKSkpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgfVxufSk7XG5jb25zdCBnZXRWYXJpbmF0TmFtZUZyb21Qcm9wcyA9IChwcm9wcykgPT4ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwcm9wcylcbiAgICAgICAgLmZpbHRlcigoa2V5KSA9PiBrZXkgIT09ICdjaGlsZHJlbicpXG4gICAgICAgIC5tYXAoKGtleSkgPT4gYCR7a2V5fT0ke3Byb3BzW2tleV19YClcbiAgICAgICAgLmpvaW4oJywgJyk7XG59O1xuZmlnbWEudWkub25tZXNzYWdlID0gKG1zZykgPT4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uKiAoKSB7XG4gICAgaWYgKG1zZy50eXBlID09PSBGaWdtYU1lc3NhZ2VUeXBlLklNUE9SVF9WQVJJQU5UUykge1xuICAgICAgICB5aWVsZCBmaWdtYS5sb2FkRm9udEFzeW5jKGRlZmF1bHRGb250KTtcbiAgICAgICAgY29uc3QgeyBkYXRhOiB7IGxheWVycywgY29tcG9uZW50c0RhdGEgfSwgfSA9IG1zZztcbiAgICAgICAgbGV0IGJhc2VGcmFtZSA9IGZpZ21hLmN1cnJlbnRQYWdlO1xuICAgICAgICBsZXQgbm9kZXMgPSBbXTtcbiAgICAgICAgY29uc3QgY29tcG9uZW50TGF5ZXJzID0gbGF5ZXJzLm1hcCgobGF5ZXIpID0+IChPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxheWVyKSwgeyB0eXBlOiAnQ09NUE9ORU5UJyB9KSkpO1xuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIHlpZWxkIGFkZExheWVyc1RvRnJhbWUoY29tcG9uZW50TGF5ZXJzLCBiYXNlRnJhbWUsICh7IG5vZGUsIHBhcmVudCB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhcmVudCkge1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2gobm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IEZpZ21hTWVzc2FnZVR5cGUuSU1QT1JUKSB7XG4gICAgICAgIHlpZWxkIGZpZ21hLmxvYWRGb250QXN5bmMoZGVmYXVsdEZvbnQpO1xuICAgICAgICBsZXQgYmFzZUZyYW1lID0gZmlnbWEuY3VycmVudFBhZ2U7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnO1xuICAgICAgICBsZXQgeyBub2RlcywgdHlwZSB9ID0gZGF0YTtcbiAgICAgICAgbGV0IGFkZGVkTm9kZXMgPSBbXTtcbiAgICAgICAgaWYgKHR5cGUgPT09ICd2YXJpYW50cycpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZmlnbWEudmlld3BvcnQuY2VudGVyO1xuICAgICAgICAgICAgbGV0IG9mZnNldFRvcCA9IDA7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbm9kZXNbaV0ubGF5ZXIueCA9IHg7XG4gICAgICAgICAgICAgICAgbm9kZXNbaV0ubGF5ZXIueSA9IHkgKyBvZmZzZXRUb3A7XG4gICAgICAgICAgICAgICAgb2Zmc2V0VG9wICs9IChub2Rlc1tpXS5sYXllci5oZWlnaHQgfHwgMTAwKSArIDEwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3QgeyBpZCwgbGF5ZXIsIHBvc2l0aW9uLCBjb21wb25lbnREYXRhIH0gb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZ21hTm9kZSA9IGlkICYmIGZpZ21hLmN1cnJlbnRQYWdlLmZpbmRPbmUobiA9PiBuLmlkID09PSBpZCk7XG4gICAgICAgICAgICBpZiAoZmlnbWFOb2RlKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlTm9kZShmaWdtYU5vZGUsIGxheWVyKTtcbiAgICAgICAgICAgICAgICBzZXRQbHVnaW5EYXRhKGZpZ21hTm9kZSwgeyBjb21wb25lbnREYXRhIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgeCwgeSB9ID0gZ2V0RHJvcE9mZnNldChwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnggPSB4O1xuICAgICAgICAgICAgICAgICAgICBsYXllci55ID0geTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgY29tcG9uZW50TGF5ZXIgPSBPYmplY3QuYXNzaWduKE9iamVjdC5hc3NpZ24oe30sIGxheWVyKSwgeyB0eXBlOiB0eXBlID09PSAndmFyaWFudHMnID8gJ0NPTVBPTkVOVCcgOiAnRlJBTUUnIH0pO1xuICAgICAgICAgICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgICAgICAgICB5aWVsZCBhZGRMYXllcnNUb0ZyYW1lKFtjb21wb25lbnRMYXllcl0sIGJhc2VGcmFtZSwgKHsgbm9kZSwgcGFyZW50IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBsdWdpbkRhdGEobm9kZSwgeyBjb21wb25lbnREYXRhIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWRkZWROb2Rlcy5wdXNoKG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT09ICd2YXJpYW50cycpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudE5vZGUgPSBmaWdtYS5jb21iaW5lQXNWYXJpYW50cyhhZGRlZE5vZGVzLCBiYXNlRnJhbWUpO1xuICAgICAgICAgICAgY29tcG9uZW50Tm9kZS5uYW1lID0gbm9kZXNbMF0uY29tcG9uZW50RGF0YS5uYW1lO1xuICAgICAgICAgICAgYWRkZWROb2Rlcy5mb3JFYWNoKChub2RlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgIG5vZGUubmFtZSA9IGdldFZhcmluYXROYW1lRnJvbVByb3BzKG5vZGVzW2luZGV4XS5jb21wb25lbnREYXRhLnByb3BzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChtc2cudHlwZSA9PT0gRmlnbWFNZXNzYWdlVHlwZS5BUFBMWV9UT0tFTikge1xuICAgICAgICBjb25zdCB7IGRhdGEgfSA9IG1zZztcbiAgICAgICAgZm9yIChsZXQgbm9kZSBvZiBkYXRhLm5vZGVzKSB7XG4gICAgICAgICAgICBzZXRUb2tlbnMobm9kZS5ub2RlSWQsIG5vZGUudG9rZW5zIHx8IFtdKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobXNnLnR5cGUgPT09IEZpZ21hTWVzc2FnZVR5cGUuQVBQTFlfVE9LRU5TKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YSB9ID0gbXNnO1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgY29uc3QgYWxsTm9kZXMgPSBmaWdtYS5jdXJyZW50UGFnZS5maW5kQWxsKChfKSA9PiB0cnVlKTtcbiAgICAgICAgY29uc3Qgbm9kZXNXaXRoVG9rZW5zID0gYWxsTm9kZXNcbiAgICAgICAgICAgIC5tYXAoKG5vZGUpID0+ICh7IHRva2VuczogZ2V0UGx1Z2luRGF0YShub2RlKS50b2tlbnMsIG5vZGUgfSkpXG4gICAgICAgICAgICAuZmlsdGVyKCh7IHRva2VucyB9KSA9PiB0b2tlbnMpO1xuICAgICAgICBmb3IgKGxldCB7IHRva2Vucywgbm9kZSB9IG9mIG5vZGVzV2l0aFRva2Vucykge1xuICAgICAgICAgICAgdXBkYXRlVG9rZW5zT25Ob2RlKG5vZGUsIHRva2VucywgZGF0YS50b2tlbnMpO1xuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=