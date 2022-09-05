import React, { useState, useContext }  from 'react';
import "../style.css";
import Context from '../../context/FormContext';

export default function ModalText({ setMenu= () => { }, set = () => { } }) {
  const { formItens, setFormItens } = useContext(Context);
  const [text, setText] = useState(""); 
  const [disable, setdisable] = useState(true);
  const [valor, setValor] = useState("");
  const [visible, setVisible] = useState(true);
  const [historic, setHistoric] = useState(false);
  const [required, setRequired] = useState(false);

  const createText = () => {
    const textDiv = [];
    if (valor === "line") {
      textDiv.subtype = "line";
    } else {
      textDiv.subtype = "box";
    }
    textDiv.type = "text";
    textDiv.className = "label";
    textDiv.label = text;
    textDiv.required = required;
    textDiv.historic = historic;
    textDiv.valid = true;
    
    setFormItens([...formItens, { item: textDiv }]);
    setVisible(false);
    setMenu(false);
    set(false)
  }

  const CloseOutClick = (e) => {
    console.log('click')
    if (e.target.id === "Fundo") {
      set(false);
      setVisible(false);
      setMenu(false);
    } 
  }
  
  return (
    <div className={visible ? "visible" : "inVisible"}>
      <div id="Fundo" className="Mascara" onClick={CloseOutClick}></div>
      <div className="Fundo">
        <div className="Modal MText">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center" }}>Campo Texto</h3>
          </div>
          <div className="inputSelect">
            <input
              id="texto"
              type="text"
              placeholder="Digite o Label"
                onChange={(event) => {
                  setText(event.target.value);
                  setdisable(false);
                }}
            />
            <select
              onChange={(event) => { setValor(event.target.value) }}
            >
              <option value="box" defaultValue>Caixa de Texto</option>
              <option value="line" >Linha única</option>
            </select>
          </div>
          <div id="Title" className="col">
            <div className="example"style={{height: "10px", padding:"10px 0 "}}>
              {text}
            </div>
            <div style={{display:"flex", height: "70px", padding:"10px 0 "}}>
              {valor === "line" ? <input style={{height: "24px"}}/> : <textarea
                row="2"
                col="50"
              />}
            </div>
          </div>
          <div style={{height: "40px", paddingTop:"20px"}}>
            <div className="submit">
              <div style={{marginBottom:"20px"}}>
                <input type="checkbox" id="hist" onChange={() => setHistoric(true)} />
                <label style={{fontSize:"12px"}}>Manter Historico </label>
              </div>
              <div style={{marginBottom:"20px"}}>
                <input type="checkbox" id="req"onChange={() => setRequired(true)} />
                <label style={{fontSize:"12px"}}>Campo Obrigatório </label>
              </div>
            </div>
            <div className="submit">
               <button
                disabled={disable}
                className="Item"
                onClick={() => {
                  createText("rigth");
                }}
              >
                Criar
              </button>
              <button
                className="Item"
                onClick={() => {
                  setVisible(false);
                  setMenu(false);
                  set(false);
                }}
              >
                Cancelar
              </button>
            </div>  
          </div>
        </div>
      </div>
    </div>
  )
}