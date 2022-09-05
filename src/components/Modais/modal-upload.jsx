import React, { useState, useContext }  from 'react';
import "../style.css";
import Context from '../../context/FormContext';

export default function ModalUpload({ setMenu = () => {}, set=()=>{} }) {
  const { formItens, setFormItens } = useContext(Context);
  const [text, setText] = useState(""); 
  const [disable, setdisable] = useState(true);
  const [visible, setVisible] = useState(true);
  const [historic, setHistoric] = useState(false);
  const [required, setRequired] = useState(false);
  
  const createUpload = () => {
    const imageDiv = [];
    imageDiv.text = text;
    imageDiv.type = "image";
    imageDiv.required = required;
    imageDiv.historic = historic;
    imageDiv.valid = true;
    setFormItens([...formItens, {item: imageDiv}]);
    setVisible(false);
    setMenu(false);
    set(false);
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
        <div className="Modal MImg">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center" }}>Adicionar Imagem</h3>
          </div>
          <div className="inputSelect">
            <label style={{margin: "10px 0", fontSize: "14px"}}for="myfile">Escolha uma Imagem:</label>
            <input style={{margin: "10px 0"}} type="file" id="myfile" name="myfile"/>
          </div>
          <input
              id="texto"
              type="text"
              placeholder="Digite a Descrição"
                onChange={(event) => {
                  setText(event.target.value);
                  setdisable(false);
                }}
            />
          <div className="submit">
            <div style={{margin:"10px 0"}}>
              <input type="checkbox" id="hist" onChange={() => setHistoric(true)} />
              <label style={{fontSize:"12px"}}>Manter Historico </label>
            </div>
            <div style={{margin:"10px 0"}}>
              <input type="checkbox" id="req"onChange={() => setRequired(true)} />
              <label style={{fontSize:"12px"}}>Campo Obrigatório </label>
            </div>
          </div>
          <div className="submit">
            <button
            disabled={disable}
            className="Item"
            onClick={() => {
              createUpload("down");
            }}
            >
              Criar
            </button>
            <button
              className="Item"
              onClick={() => {
                setVisible(false);
                set(false);
                setMenu(false);
              }}
            >
              Cancelar
            </button>
            </div>   
        </div>
      </div>
    </div>
  )
}