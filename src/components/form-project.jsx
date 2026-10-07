import React, { useCallback, useContext, useRef, useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import './style.css';
import './builder/builder.css';
import Palette from './builder/Palette';
import Canvas from './builder/Canvas';
import ConfigModal from './builder/ConfigModal';
import { getDropAction, insertField } from './builder/operations';
import Context from '../context/FormContext';
import { Link } from 'react-router-dom';


export default function FormProject() {

  const { formItens, setFormItens, formName, setFormName, loadModel, clearModel } = useContext(Context);
  const [pendingField, setPendingField] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const fileInput = useRef(null);
  const closeModal = useCallback(() => setPendingField(null), []);
  const handleDragEnd = (result) => {
    setDropTarget(null);
    const action = getDropAction(result, formItens);
    if (action?.type === 'create') setPendingField(action);
    if (action?.type === 'reorder') setFormItens(items => getDropAction(result, items)?.items || items);
  };
  const handleDragUpdate = ({ source, destination }) => {
    setDropTarget(destination?.droppableId === 'canvas' ? {
      index: destination.index,
      after: source.droppableId === 'canvas' && destination.index > source.index,
    } : null);
  };
  const createField = (field) => {
    setFormItens(items => insertField(items, field, pendingField.index));
    closeModal();
  };

  return (
    <main id="formMain" className="form-builder">
      <header className="builder-header">
      <h3 style={{textAlign: 'center'}}>Construtor de Formulários</h3>
      <input className="model-name" value={formName} onChange={(event) => setFormName(event.target.value)} aria-label="Nome do formulário" />
      </header>
      <DragDropContext onDragEnd={handleDragEnd} onDragUpdate={handleDragUpdate} dragHandleUsageInstructions="Pressione Espaço para iniciar o arraste. Use as setas para mover, Espaço para soltar e Escape para cancelar.">
        <div className="builder-layout">
          <Palette onAdd={fieldType => setPendingField({ fieldType, index: formItens.length })} disabled={!!pendingField} />
          <Canvas items={formItens} disabled={!!pendingField} pendingIndex={pendingField?.index} dropTarget={dropTarget} />
        </div>
      </DragDropContext>
      <div className="builder-actions">
        <Link className="Item" to="/previa">Abrir formulário</Link>
        <button className="Item" onClick={() => {
          const blob = new Blob([JSON.stringify({ name: formName, items: formItens }, null, 2)], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = url;
          anchor.download = `${formName || 'formulario'}.json`;
          anchor.click();
          URL.revokeObjectURL(url);
        }}>Salvar modelo</button>
        <button className="Item" onClick={() => fileInput.current.click()}>Carregar modelo</button>
        <input ref={fileInput} hidden type="file" accept="application/json,.json" aria-label="Arquivo do modelo" onChange={(event) => {
          const file = event.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => { try { loadModel(JSON.parse(reader.result)); } catch (error) { window.alert(error.message); } };
          reader.onerror = () => window.alert('Não foi possível ler o arquivo de modelo.');
          reader.readAsText(file);
          event.target.value = '';
        }} />
        <button className="Item" onClick={() => { if (window.confirm('Limpar este modelo?')) clearModel(); }}>Novo modelo</button>

      </div>
      {pendingField && <ConfigModal type={pendingField.fieldType} onCreate={createField} onClose={closeModal} />}
    </main>
  )
}
