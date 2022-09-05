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
var ListManagerItem_1 = require("./ListManagerItem");
var object_hash_1 = __importDefault(require("object-hash"));
var horizontalStyle = {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start"
};
exports.DragAndDropWrapper = function (_a) {
    var onDragEnd = _a.onDragEnd, chunks = _a.chunks, direction = _a.direction, render = _a.render;
    return (react_1.default.createElement(react_beautiful_dnd_1.DragDropContext, { onDragEnd: mapAndInvoke(onDragEnd) }, chunks.map(function (_a) {
        var droppableId = _a.id, items = _a.items;
        return (react_1.default.createElement(react_beautiful_dnd_1.Droppable, { key: droppableId, droppableId: droppableId, direction: direction }, function (provided, _) { return (react_1.default.createElement("div", __assign({ ref: provided.innerRef, style: direction === "horizontal" ? horizontalStyle : undefined }, provided.droppableProps),
            items.map(function (item, index) { return (react_1.default.createElement(ListManagerItem_1.ListManagerItem, { key: object_hash_1.default(item), item: item, index: index, render: render })); }),
            provided.placeholder)); }));
    })));
};
function mapAndInvoke(onDragEnd) {
    return function (_a) {
        var source = _a.source, destination = _a.destination;
        if (destination !== undefined && destination !== null) {
            var result = {
                source: {
                    id: source.droppableId,
                    index: source.index
                },
                destination: {
                    id: destination.droppableId,
                    index: destination.index
                }
            };
            onDragEnd(result);
        }
    };
}
