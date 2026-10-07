import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { FIELD_TYPES, PALETTE_ID } from './fieldTypes';

function PaletteItem({ field, provided, dragging, onAdd, disabled }) {
  const { Icon, label, type } = field;
  return (
    <button
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      type="button"
      className={`palette-item${dragging ? ' is-dragging' : ''}`}
      aria-label={`Adicionar ${label}`}
      disabled={disabled}
      onClick={() => onAdd(type)}
    >
      <Icon aria-hidden="true" /><span>{label}</span>
    </button>
  );
}

export default function Palette({ onAdd, disabled }) {
  return (
    <aside className="builder-palette" aria-labelledby="palette-heading">
      <h2 id="palette-heading">Adicionar campos</h2>
      <p>Arraste para o formulário ou clique para adicionar ao final.</p>
      <Droppable droppableId={PALETTE_ID} isDropDisabled renderClone={(provided, snapshot, rubric) => (
        <PaletteItem field={FIELD_TYPES[rubric.source.index]} provided={provided} dragging onAdd={onAdd} />
      )}>
        {(provided, snapshot) => (
          <div className="palette-list" ref={provided.innerRef} {...provided.droppableProps}>
            {FIELD_TYPES.map((field, index) => (
              <React.Fragment key={field.type}>
                <Draggable draggableId={`palette:${field.type}`} index={index} isDragDisabled={disabled} disableInteractiveElementBlocking>
                  {(dragProvided, dragSnapshot) => (
                    <PaletteItem field={field} provided={dragProvided} dragging={dragSnapshot.isDragging} onAdd={onAdd} disabled={disabled} />
                  )}
                </Draggable>
                {snapshot.draggingFromThisWith === `palette:${field.type}` && <div className="palette-item palette-copy" aria-hidden="true"><field.Icon /><span>{field.label}</span></div>}
              </React.Fragment>
            ))}
            <div className="palette-placeholder">{provided.placeholder}</div>
          </div>
        )}
      </Droppable>
      <p className="builder-keyboard-hint">Pelo teclado: Espaço inicia o arraste, setas movem, Espaço solta e Esc cancela.</p>
    </aside>
  );
}
