import React, { useContext } from 'react';
import './style.css';
import NewWindow from 'react-new-window';
import ElementGen from './Elementos/ElementGen';
import Context from '../context/FormContext';

export default function Previa() {
  const { formItens } = useContext(Context);

  return(
    <NewWindow title="Prévia de Formulário">
      <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <div id="formprojectprev">

          {formItens ? formItens.map((field, index) => <ElementGen id={index} key= {index} item={field} />) : null}
          
        </div>
      </div>
    </NewWindow>
  )
}