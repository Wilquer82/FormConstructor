import React, { useContext, useEffect, useRef, useState } from 'react';
import './style.css';
import ElementGen from './Elementos/ElementGen';
import Menu from './menu'
import Context from '../context/FormContext';
import { Link } from 'react-router-dom';


export default function FormProject() {

  const { formItens, formName, setFormName, loadModel, clearModel } = useContext(Context);
  const [visibleM, setVisibleM] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    if (formItens.length !== 0) {
      console.log(formItens)
    }
  }, [formItens]);

  return (
    <div id="formMain">
      <h3 style={{textAlign: 'center'}}>Construtor de Formulários</h3>
      <input className="model-name" value={formName} onChange={(event) => setFormName(event.target.value)} aria-label="Nome do formulário" />
      <div id="formproject">

        {formItens.map((field, index) => <ElementGen key={field.id || index} id={index} item={field} />)}
        
      </div>
      <div className="submit">

        <button
          className="Item"
          onClick={() => {
            setVisibleM(true);
          }}
        >
          Novo Item
        </button>
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
        <input ref={fileInput} hidden type="file" accept="application/json" onChange={(event) => {
          const file = event.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => { try { loadModel(JSON.parse(reader.result)); } catch (error) { window.alert(error.message); } };
          reader.readAsText(file);
          event.target.value = '';
        }} />
        <button className="Item" onClick={() => { if (window.confirm('Limpar este modelo?')) clearModel(); }}>Novo modelo</button>

      </div>
      {visibleM ? <Menu set={() => setVisibleM(false) } /> : null}
    </div>
  )
}