import { Droppable } from '@hello-pangea/dnd';
import FieldCard from './FieldCard';
import { CANVAS_ID } from './fieldTypes';

export default function Canvas({ items, disabled, pendingIndex, dropTarget }) {
  return (
    <section className="builder-workspace" aria-labelledby="canvas-heading">
      <div className="canvas-heading"><h2 id="canvas-heading">Seu formulário</h2><span>{items.length} {items.length === 1 ? 'campo' : 'campos'}</span></div>
      <Droppable droppableId={CANVAS_ID} isDropDisabled={disabled}>
        {(provided, snapshot) => (
          <div id="formproject" ref={provided.innerRef} {...provided.droppableProps}
            className={`builder-canvas${snapshot.isDraggingOver ? ' is-dragging-over' : ''}`}>
            {items.length === 0 && <div className="canvas-empty"><strong>Comece seu formulário</strong><p>Solte um campo aqui para configurar e adicionar.</p></div>}
            {items.map((field, index) => (
              <div key={field.id} className="canvas-field-slot">
                {dropTarget?.index === index && <div aria-hidden="true" className={`canvas-drop-marker${dropTarget.after ? ' is-after' : ''}`} />}
                {pendingIndex === index && <div className="canvas-insertion">Novo campo nesta posição</div>}
                <FieldCard field={field} index={index} disabled={disabled} />
              </div>
            ))}
            {pendingIndex === items.length && <div className="canvas-insertion">Novo campo nesta posição</div>}
            {provided.placeholder}
            {dropTarget?.index === items.length && <div className="canvas-drop-end" aria-hidden="true"><div className="canvas-drop-marker" /></div>}
          </div>
        )}
      </Droppable>
    </section>
  );
}
