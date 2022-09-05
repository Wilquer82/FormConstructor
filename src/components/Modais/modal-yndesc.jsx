import React, { useState, useContext }  from 'react';
import "../style.css";
import Context from '../../context/FormContext';

export default function ModalYN({ setMenu=()=>{}, set=()=>{} }) {
  const { formItens, setFormItens } = useContext(Context);
  const [text, setText] = useState(""); 
  const [disable, setdisable] = useState(true);
  const [visible, setVisible] = useState(true);
  const [historic, setHistoric] = useState(false);
  const [required, setRequired] = useState(false);
  const [count, setCount] = useState(1);

  
  const createYN = () => {
    const allCheck = document.querySelectorAll('input.checkBox');
    const allInput = document.querySelectorAll('input.falseBox');
    const optRadio = [{value: '', descript: false}];

    for (let i = 0; i < allCheck.length; i++) {
      optRadio[i]={
        value: allInput[i].value,
        descript: allCheck[i].checked,
      }
    }

    const RadioItem = [];

    RadioItem.type = 'questyn';
    RadioItem.label = text;
    RadioItem.options = optRadio; 
    RadioItem.required = required;
    RadioItem.historic = historic;
    RadioItem.valid = true;

    setFormItens([...formItens, {item: RadioItem}]);
   
    setVisible(false);
    setMenu(false);
    set(false);
  }
  const createRadio = () => {
    if (count<=6){
      const form = document.getElementById("radio");
      const div = document.createElement("form");
      div.classList.add("rowLine")
      form.appendChild(div);
      const newRadio = document.createElement("input");
      const rLabel = document.createElement("input");
      const checkBox = document.createElement("input");
      const descText = document.createElement("p")

      newRadio.type = "radio";
      newRadio.id = `${count}radio`;
    
      rLabel.type = "text";
      rLabel.id = `${count}label`;
      rLabel.classList.add('falseBox');
      checkBox.classList.add('checkBox');
      checkBox.type = "checkbox";
      checkBox.id = `${count}check`;
   
      descText.innerText = "Marque para descrição"
      descText.classList.add('falseBox');

      div.appendChild(newRadio);
      div.appendChild(rLabel);
      div.appendChild(checkBox);
      div.appendChild(descText);
    }
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
        <div className="Modal MYN">
          <div className="inputSelect">
            <h3
              style={{ textAlign: "center"}}
            >Opções com Descrição</h3>
          </div>
          <div className="rowLine">
            <input
              id="texto"
              type="text"
              placeholder="Digite a Pergunta"
                onChange={(event) => {
                  setText(event.target.value);
                  setdisable(false);
                }}
            />
            <button
              className="Item"
              onClick={() => {
                createRadio();
                setCount(count+1)
              }}>
                Adicionar Opção
            </button>
          </div>
          <div>
            <div style={{margin: "2px 0"}}>
              <div className="example">
                {text}
              </div>
            </div>
            <form id="radio" style={{display: "flex", }}>
            </form>
          </div>
          <div>
            <div className="submit" style={{marginTop:"10px"}}>
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
                  createYN();
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
    </div>
  )
}