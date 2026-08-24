import React, { useContext } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import FormRenderer from './FormRenderer';
import Context from '../context/FormContext';

export default function Previa() {
  const { formItens, formName } = useContext(Context);
  const navigate = useNavigate();

  return(
    <main className="print-page">
      <header className="preview-header">
        <h1>{formName}</h1>
        <div className="preview-actions">
          <button className="Item" onClick={() => navigate('/')}>Voltar ao editor</button>
          <button className="Item" onClick={() => window.print()}>Imprimir</button>
        </div>
      </header>
      <form className="print-form" onSubmit={(event) => { event.preventDefault(); window.alert('Preenchimento concluído.'); }}>
        <FormRenderer items={formItens} />
        <button className="Item completion-button" type="submit">Concluir preenchimento</button>
      </form>
    </main>
  )
}