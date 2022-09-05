"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function computeOriginalIndex(maxItems, chunkIndex, indexInChunk) {
    return chunkIndex * maxItems + indexInChunk;
}
exports.computeOriginalIndex = computeOriginalIndex;
function computeOriginalIndexAfterDrop(maxItems, sourceChunkIndex, destinationChunkIndex, indexInChunk) {
    return destinationChunkIndex * maxItems + indexInChunk + (sourceChunkIndex < destinationChunkIndex ? -1 : 0);
}
exports.computeOriginalIndexAfterDrop = computeOriginalIndexAfterDrop;
