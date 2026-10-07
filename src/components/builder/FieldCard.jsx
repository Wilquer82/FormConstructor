import { Draggable } from '@hello-pangea/dnd';
import { BsGripVertical } from 'react-icons/bs';
import ElementGen from '../Elementos/ElementGen';
import { FIELD_TYPES } from './fieldTypes';

export default function FieldCard({ field, index, disabled }) {
  const label = FIELD_TYPES.find(type => type.type === field.type)?.label || 'Campo';
  return (
    <Draggable draggableId={field.id} index={index} isDragDisabled={disabled} disableInteractiveElementBlocking>
      {(provided, snapshot) => (
        <article ref={provided.innerRef} {...provided.draggableProps}
          className={`field-card${snapshot.isDragging ? ' is-dragging' : ''}`}>
          <div className="field-card-header">
            <button type="button" {...provided.dragHandleProps} className="field-drag-handle"
              aria-label={`Reordenar ${field.label || field.text || label}`} disabled={disabled}>
              <BsGripVertical aria-hidden="true" />
            </button>
            <span>{label}</span>
          </div>
          <ElementGen id={index} item={field} />
        </article>
      )}
    </Draggable>
  );
}
