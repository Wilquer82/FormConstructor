import React, { useState, useContext, memo } from 'react';
import Select from 'react-select';

import { BsTrash } from 'react-icons/bs';
import Context from '../../context/FormContext';

const ElementGen = (props) => {
  const currentItem = props.item.item || props.item;
  const [image, setImage] = useState("")
  const { setFormItens } = useContext(Context);

  const HistObrig = () => {
    const ReqItem = currentItem.required;
    const HistItem = currentItem.historic;
    const ReqText = <p style={{ margin: "0 5px", padding: "2px", backgroundColor: "#326cfe", color: "white", fontSize: "10px", borderRadius: "2px" }}
    ><strong>Obrigatório</strong></p>;
    const HistText = <p style={{margin: "0 5px", padding: "2px", backgroundColor: "green", color: "white", fontSize: "10px", borderRadius: "2px"}}><strong>Histórico</strong></p>;

    if (ReqItem && HistItem) {
      return <>{ReqText}{HistText}</>;
    }
    if (ReqItem) {
      return ReqText;
    }
    if (HistItem) {
      return HistText;
    }

  }

  const deleteNode = () => {
    setFormItens((items) => items.filter((item, index) => (
      item.id ? item.id !== currentItem.id : index !== props.id
    )));
  }

  const DeleteButton = () => (
    <button type="button" className="delete-field" onClick={deleteNode}
      aria-label={`Excluir ${currentItem.label || currentItem.text || 'campo'}`}>
      <BsTrash aria-hidden="true" />
    </button>
  );

  const aceptedTypes = {
    title(props) {
      return (
        <div id={`${currentItem.id}-container`} style={{ width: '100%'}}>
          <div  id={myId} style={{ width: '100%', display: "flex", padding: "10px 0", alignItems: "center", justifyContent: "space-between", textAlign: "center"}}>

            <p
              className={`${props.classNameOne} ${props.classNameTwo}`}
            >
              {props.text}
            </p>
            <DeleteButton />
          </div>
        </div>
      )
    },
    select(props) {
      return (
        <div id={`${currentItem.id}-container`} className="editor-field" style={{ padding: "20px 0" }}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <div
              className={props.className}
            >
              <DeleteButton />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </div>
            <Select aria-label={props.label} options={props.options} width={ "200px"}/>
          </div>
        </div>
      )
    },
    questyn(props) {
      return (
        <div id={`${currentItem.id}-container`} className="editor-field" style={{ padding: "20px 0" }}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <div className={"label"}>
              <DeleteButton />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </div>
            <div className="inline" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'none', marginBottom: "10px" }} >
              {props.options.map((cur, index) => (
                <div style={{ display: "flex", margin: "10px 0", alignItems: "center" }} key={index}>
                  <input
                    name={currentItem.id}
                    type="radio"
                    id={`${currentItem.id}-option-${index}`}
                  // onChange={() => {
                  // }}
                  >
                  </input>
                  <label htmlFor={`${currentItem.id}-option-${index}`}>{cur.value}</label>
                  {cur.descript &&
                    <input
                      style={{ marginLeft: '20px', width: '150px' }}
                      className={{}}
                    />
                  }
                </div>
              ))
              }
            </div>
          </div>
        </div>
      )
    },
    text(props) {
      return (
        <div id={`${currentItem.id}-container`} className="editor-field" style={{ padding: "20px 0" }}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <div
              className={props.className}
            >
              <DeleteButton />&nbsp;&nbsp;
              {`${props.label}`}
              {HistObrig()}
            </div>
            {props.subtype === "line" ? <input type="text" aria-label={props.label} style={{ width: "300px"}}/> : <textarea
              aria-label={props.label} rows="2"
              col="250"
            />}
          </div>
        </div>
      )
    },
    selectMulti(props) {
      return (
        <div id={`${currentItem.id}-container`} className="editor-field" style={{ padding: "20px 0" }}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <div className="label">
              <DeleteButton />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </div>
            <Select
              aria-label={props.label}
              options={props.options}
              isMulti
            />
          </div>
        </div>
      )
    },
    image(props) {
      return (
        <div id={`${currentItem.id}-container`} style={{ width: '100%'}}>
          <div id={myId} style={{ display: "flex", flexDirection: "column" ,padding: "10px 0", alignItems:"center" }}>
            <div className="inputSelect">
              <label style={{margin: "15px 0"}}htmlFor={`${currentItem.id}-file`}>Escolha uma Imagem:</label>
              <input style={{margin: "15px 0"}} type="file" id={`${currentItem.id}-file`} name="myfile" onChange={e=> setImage(e.target.files[0])}/>
            </div>
            <div className="ImgSpace">
              {image?<img src={URL.createObjectURL(image)} alt="Sua Imagem" height="200px"/>: <p style={{textAlign: "center"}}>Espaço para a Pré-Visualização da Imagem</p>}
            </div>
            <p style={{textAlign: "center", padding: "10px 0"}}>
              <DeleteButton />&nbsp;&nbsp;
              {props.text}
              {HistObrig()}
            </p>
          </div>
        </div>
      )
    }
  };

  const myId = currentItem.id;
  const tipo = currentItem.type;
  const chamadaAtual = aceptedTypes[tipo];
  return chamadaAtual(currentItem);

}

export default memo(ElementGen);
