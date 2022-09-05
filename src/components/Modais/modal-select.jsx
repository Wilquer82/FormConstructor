import React, { useState, useContext, useCallback }  from 'react';
import "../style.css";
import CreatableSelect from "react-select/creatable";
import Context from '../../context/FormContext';

export default function ModalSelect({ setMenu = () => {}, set= () => {} }) {
  const { formItens, setFormItens } = useContext(Context);
  const [disable, setdisable] = useState(true);
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState();
  const [options, setOptions] = useState([]);
  const [historic, setHistoric] = useState(false);
  const [required, setRequired] = useState(false);
  
  const createSelect = () => {
    const selectDiv = [];  
    selectDiv.type = "select";
    selectDiv.label = label;
    selectDiv.className = "label";
    selectDiv.options = options;
    selectDiv.required = required;
    selectDiv.historic = historic;
    selectDiv.valid = true;
    
    setFormItens([...formItens, {item: selectDiv}]);
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
        <div className="Modal MSelect">
          <div className="inputSelect">
            <h3 style={{ textAlign: "center"}}>Seleção Única</h3>
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
          <div>
            <label className="example">{label}</label>
            <div style={{paddingBottom: "20px" }}>
              <CreatableSelect
                isClearable
                value={value}
                options={options}
                onChange={handleChange}
                onCreateOption={handleCreate}
              />
             </div> 
          </div>
        <div>
            <div className="submit">
              <div style={{marginBottom:"20px"}}>
                <input 
                  type="checkbox" 
                  id="hist"
                  onChange={() => setHistoric(true)}
                />
              <label style={{fontSize:"12px"}}>Manter Historico </label>
              </div>
              <div style={{marginBottom:"20px"}}>
                <input 
                  type="checkbox" 
                  id="req"
                  onChange={() => setRequired(true)}
                />
              <label style={{fontSize:"12px"}}>Campo Obrigatório </label>
              </div>
            </div>
            <div className="submit">
               <button
                disabled={disable}
                className="Item"
                onClick={() => {
                  createSelect();
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