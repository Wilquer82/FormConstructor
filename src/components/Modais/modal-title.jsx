import React, { useState, useContext }  from 'react';
import "../style.css";
import Context from '../../context/FormContext';

 function ModalTitle({ set =() => {}, setMenu=()=>{} }) {
 
  const { formItens, setFormItens } = useContext(Context);
  const [text, setText] = useState(""); 
  const [disable, setdisable] = useState(true);
  const [valor, setValor] = useState("h3");
  const [visible, setVisible] = useState(true);
  
  const createTitle = () => {
    const titleDiv = [];
    titleDiv.type = "title";
    titleDiv.classNameOne = valor;
    titleDiv.classNameTwo = "example";
    titleDiv.text = `> ${text} <`;
    titleDiv.valid = true;
    
    setFormItens([...formItens, {item: titleDiv}]);
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
      <div  className="Fundo" >
        <div className="Modal MTitle">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center" }}>Título / Nova Seção</h3>
          </div>
          <div className="inputSelect size">
            <input
              id="texto"
              type="text"
              placeholder="Digite o Título"
                onChange={(event) => {
                  setText(event.target.value);
                  setdisable(false);
                }}
            />
            <select
              onChange={(event) => { setValor(event.target.value) }}>
              <option value="h3">Pequeno</option>
              <option value="h2">Médio</option>
              <option value="h1">Grande</option>
            </select>
          </div>
          <div id="Title" style={{textAlign: 'center'}} className={`${valor}`}> 
            {text}
          </div>
          <div className="column">
            <button
              disabled={disable}
              className="Item"
              onClick={() => {
                createTitle();
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

 export default ModalTitle;