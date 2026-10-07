import { CANVAS_ID, PALETTE_ID, FIELD_TYPES } from './fieldTypes';

export function getDropAction({ source, destination, draggableId, reason }, items) {
  if (reason === 'CANCEL' || !destination || destination.droppableId !== CANVAS_ID) return null;
  if (source.droppableId === PALETTE_ID) {
    const fieldType = draggableId.replace('palette:', '');
    return FIELD_TYPES.some(field => field.type === fieldType)
      ? { type: 'create', fieldType, index: destination.index }
      : null;
  }
  if (source.droppableId !== CANVAS_ID || source.index === destination.index) return null;
  const sourceIndex = items.findIndex(item => item.id === draggableId);
  if (sourceIndex === -1) return null;
  const reordered = [...items];
  const [field] = reordered.splice(sourceIndex, 1);
  reordered.splice(destination.index, 0, field);
  return { type: 'reorder', items: reordered };
}

export function insertField(items, field, index) {
  const position = Math.min(Math.max(index, 0), items.length);
  return [...items.slice(0, position), field, ...items.slice(position)];
}
