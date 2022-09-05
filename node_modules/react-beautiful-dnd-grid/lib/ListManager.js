"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DragAndDropWrapper_1 = require("./DragAndDropWrapper/DragAndDropWrapper");
var withMaxItems_1 = require("./withMaxItems/withMaxItems");
var withReactToItemsChange_1 = require("./withReactToItemsChange/withReactToItemsChange");
var v4_1 = __importDefault(require("uuid/v4"));
var ComponentWithMaxItems = withMaxItems_1.withMaxItems(DragAndDropWrapper_1.DragAndDropWrapper, v4_1.default);
var ComponentWithReactToItemsChange = withReactToItemsChange_1.withReactToItemsChange(ComponentWithMaxItems);
exports.ListManager = ComponentWithReactToItemsChange;
