import React, { useContext, useEffect, useState } from 'react';
import './style.css';
import Previa from './previa';
import ElementGen from './Elementos/ElementGen';
import Menu from './menu'
import Context from '../context/FormContext';


export default function FormProject() {

  const { formItens } = useContext(Context);
  const [visibleM, setVisibleM] = useState(false);
  const [newPrevia, setNewPrevia] = useState(false);

  useEffect(() => {
    if (formItens.length !== 0) {
      console.log(formItens)
    }
  }, [formItens]);

  return (
    <div id="formMain">
      <h3 style={{textAlign: 'center'}}>Construtor de Formulários</h3>
      <div id="formproject">

        {formItens ? formItens.map((field, index) => <ElementGen key={index} id= {index} item={field} />) : null}
        
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
        <button
          className="Item"
          onClick={() => {
            setNewPrevia((old) => !old);
          }}
        >
          Ver Prévia
        </button>
        <button
          className="Item"
        >
          Enviar
        </button>

      </div>
      <div>
        {newPrevia ? <Previa />: null}
        {visibleM ? <Menu set={() => setVisibleM(false) } /> : null}
      </div>
    </div>
  )
}