"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_beautiful_dnd_1 = require("react-beautiful-dnd");
var object_hash_1 = __importDefault(require("object-hash"));
exports.ListManagerItem = function (_a) {
    var item = _a.item, index = _a.index, render = _a.render;
    return (react_1.default.createElement(react_beautiful_dnd_1.Draggable, { draggableId: object_hash_1.default(item), index: index }, function (provided, _) { return (react_1.default.createElement("div", __assign({ ref: provided.innerRef }, provided.draggableProps, provided.dragHandleProps), render(item))); }));
};
