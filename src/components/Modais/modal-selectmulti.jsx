import React, { useState, useContext, useCallback }  from 'react';
import "../style.css";
import CreatableSelect from "react-select/creatable";
import Context from '../../context/FormContext';

export default function ModalSelectMulti({ setMenu = () => {}, set = () => {} }) {
  const { formItens, setFormItens } = useContext(Context);
  const [disable, setdisable] = useState(true);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const [historic, setHistoric] = useState(false);
  const [required, setRequired] = useState(false);
  
  const createSelect = () => {
    const selectMDiv = [];

    selectMDiv.options = options;
    selectMDiv.className = 'label';
    selectMDiv.label = label;
    selectMDiv.type = 'selectMulti';
    selectMDiv.required = required;
    selectMDiv.historic = historic;
    selectMDiv.valid = true;

    setFormItens([...formItens, {item: selectMDiv}]);
    setVisible(false);
    set(false);
    setMenu(false);
  }
  
  const handleChange = useCallback((inputValue) => setValue(inputValue), []);

  const handleCreate = useCallback(
    (inputValue) => {
      const newValue = { value: inputValue.toLowerCase(), label: inputValue };
      setOptions([...options, newValue]);
      setValue(newValue);
    },
    [options]
  );

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
        <div className="Modal MCheck">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center"}}>Seleção Múltipla</h3>
          </div>
          <input
            type="text"
            placeholder="Digite o Label"
            onChange={(event) => {
              setLabel(event.target.value)
              if (label && options) {
                setdisable(false);  
              }
            }}
            />
          
          <div style={{ paddingBottom: "20px" }}>
            <label className="example">{label}</label>
            <CreatableSelect
              isClearable
              value={value}
              options={options}
              onChange={handleChange}
              onCreateOption={handleCreate}
            />
          </div>
          <div>
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
                  createSelect("down");
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