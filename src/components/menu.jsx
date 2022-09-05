import React, { useState } from 'react';
import './style.css';
import ModalTitle from './Modais/modal-title';
import ModalSelect from './Modais/modal-select';
import ModalSelectMulti from './Modais/modal-selectmulti';
import ModalText from './Modais/modal-text';
import ModalYN from './Modais/modal-yndesc';
import ModalUpload from './Modais/modal-upload';

function Menu({ set=()=>{} }) {
  
  const [newTitle, setNewTitle] = useState(false);
  const [newSelect, setNewSelect] = useState(false);
  const [newCheck, setNewCheck] = useState(false);
  const [newText, setNewText] = useState(false);
  const [newUp, setNewUp] = useState(false);
  const [newYn, setNewYn] = useState(false);
  const [visible, setVisible] = useState(true);

  const CloseOutClick = (e) => {
    console.log('click');
    if (e.target.id === "Fundo") {
      set(false);
      setVisible(false);
    }
  }

  const handleClick = (type) => { 
    const modals = { 
      Title() {
        setNewTitle(true);
      },
      Select() {
        setNewSelect(true);
        
      },
      Check() {
        setNewCheck(true);
      },
      Text() {
        setNewText(true);
      },
      Up() {
        setNewUp(true);
      },
      Yn() {
        setNewYn(true);
      }
    }
    const chamadaAtual = modals[type];
    chamadaAtual();
  }

  return (
    <div className={visible ? "visible" : "inVisible"}>
      <div id="Fundo" className="Fundo" onClick={CloseOutClick}>
        <div  className="Modal">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center" }}>Escolha uma Opção</h3>
          </div>
          <button
            className="Item"
            onClick={() => {
              handleClick('Title');
            }}
          >Título/Seção
          </button>
          <button
            className="Item"
            onClick={() => {
              handleClick('Text');
            }}
          >
            Campo/Caixa de Texto
          </button>
          <button
            className="Item"
            onClick={() => {
              handleClick('Select');
            }}
          >
            Seleção Única
          </button>
          <button
            className="Item"
            onClick={() => {
              handleClick('Check');
            }}
          >
            Seleção Múltipla
          </button>
          <button
            className="Item"
            onClick={() => {
             handleClick('Yn');
            }}
          >
            Opções com descrição
          </button>
          <button
            className="Item"
            onClick={() => {
              handleClick('Up');
            }}
          >
            Upload de Imagem
          </button>
        </div>
      </div>
      {newTitle ?
            <ModalTitle
              set={() => setNewTitle(false)}
              setMenu={() => set(false)} />
            : null}
          
          {newSelect ?
            <ModalSelect
              set={() => setNewSelect(false)}
              setMenu={() => set(false)} />
            : null}
          
          {newCheck ?
            <ModalSelectMulti
              set={() => setNewCheck(false)}
              setMenu={() => set(false)} />
            : null}
          
          {newText ?
            <ModalText
              set={() => setNewText(false)}
              setMenu={() => set(false)} />
            : null}

          {newYn ?
            <ModalYN
              set={() => setNewYn(false)}
              setMenu={() => set(false)}/>
            : null}
          
          {newUp ?
            <ModalUpload
              set={() => setNewUp(false)}
              setMenu={() => set(false)} />
            : null}
    </div>
  )
}

export default Menu;