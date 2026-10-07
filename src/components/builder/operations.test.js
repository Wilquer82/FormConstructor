import { getDropAction, insertField } from './operations';

const items = [{ id: 'a', type: 'title' }, { id: 'b', type: 'text' }, { id: 'c', type: 'image' }];
const drop = (source, destination, draggableId, reason = 'DROP') => ({ source, destination, draggableId, reason });

test('reorders by stable id without changing the original model', () => {
  const action = getDropAction(drop({ droppableId: 'canvas', index: 0 }, { droppableId: 'canvas', index: 2 }, 'a'), items);
  expect(action.items.map(item => item.id)).toEqual(['b', 'c', 'a']);
  expect(items.map(item => item.id)).toEqual(['a', 'b', 'c']);
});

test('keeps the palette reusable and captures the insertion position', () => {
  expect(getDropAction(drop({ droppableId: 'palette', index: 1 }, { droppableId: 'canvas', index: 1 }, 'palette:text'), items))
    .toEqual({ type: 'create', fieldType: 'text', index: 1 });
  expect(insertField(items, { type: 'select', label: 'Escolha' }, 1).map(item => item.type))
    .toEqual(['title', 'select', 'text', 'image']);
  expect(insertField([], { type: 'title' }, 0)).toEqual([{ type: 'title' }]);
});

test.each([
  [null, 'DROP'], [{ droppableId: 'palette', index: 0 }, 'DROP'],
  [{ droppableId: 'canvas', index: 1 }, 'CANCEL'],
])('rejects outside, disabled and canceled drops (%j, %s)', (destination, reason) => {
  expect(getDropAction(drop({ droppableId: 'canvas', index: 0 }, destination, 'a', reason), items)).toBeNull();
});

test('dropping in the same position and unknown palette types do nothing', () => {
  expect(getDropAction(drop({ droppableId: 'canvas', index: 0 }, { droppableId: 'canvas', index: 0 }, 'a'), items)).toBeNull();
  expect(getDropAction(drop({ droppableId: 'palette', index: 0 }, { droppableId: 'canvas', index: 0 }, 'palette:invalid'), items)).toBeNull();
});
