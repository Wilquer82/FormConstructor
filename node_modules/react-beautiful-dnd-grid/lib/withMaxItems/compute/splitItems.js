"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function splitItems(maxItems, items, createId) {
    var slicedItems = sliceIntoItems(maxItems, items);
    return slicedItems.map(mapToChunk(createId));
}
exports.splitItems = splitItems;
function sliceIntoItems(maxItems, items) {
    var numberOfSlices = Math.ceil(items.length / maxItems);
    var sliceIndexes = Array.apply(null, Array(numberOfSlices)).map(function (_, index) { return index; });
    return sliceIndexes.map(function (index) { return items.slice(index * maxItems, index * maxItems + maxItems); });
}
function mapToChunk(createId) {
    return function (items) {
        return {
            id: createId(),
            items: items
        };
    };
}
