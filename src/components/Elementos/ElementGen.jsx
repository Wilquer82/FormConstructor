import React, { useState, useContext, memo } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import { BsTrash } from 'react-icons/bs';
import Context from '../../context/FormContext';

const ElementGen = (props) => {
  const currentItem = props.item.item;
  const [image, setImage] = useState("")
  const { formItens } = useContext(Context);
 
  const HistObrig = () => {
    const ReqItem = currentItem.required;
    const HistItem = currentItem.historic;
    const ReqText = <p style={{ margin: "0 5px", padding: "2px", backgroundColor: "#326cfe", color: "white", fontSize: "10px", borderRadius: "2px" }}
    ><strong>Obrigatório</strong></p>;
    const HistText = <p style={{margin: "0 5px", padding: "2px", backgroundColor: "green", color: "white", fontSize: "10px", borderRadius: "2px"}}><strong>Histórico</strong></p>;
    
    if (ReqItem && HistItem) {
      return [ReqText, HistText];
    }
    if (ReqItem) {
      return ReqText;
    }
    if (HistItem) {
      return HistText;
    }

  }

  const deleteNode = (id) => {
    document.getElementById(id).remove(); //Id da Div
    deleteItem(id);
  }

  const deleteItem = (id) => {
    formItens[id].item.valid = false;
  }
  
  const aceptedTypes = {
    title(props) {
      return (
        <div id={uuidv4()} style={{ width: '100%'}}>
          <div  id={myId} style={{ width: '100%', display: "flex", padding: "10px 0", alignItems: "center", justifyContent: "space-between", textAlign: "center"}}>
         
            <p
              className={`${props.classNameOne} ${props.classNameTwo}`}
            >
              {props.text} 
            </p>
            <BsTrash
              style={{ fontSize: "12 px" }}
              onClick={() => { deleteNode(myId) }}
            />
          </div>
        </div>
      )
    },
    select(props) {
      return (
        <div id={uuidv4()} style={{ padding: "20px 0", width: '40%' , marginLeft: "30px"}}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <label
              className={props.className}
            >
              <BsTrash style={{ fontSize: "10 px" }} onClick={() => { deleteNode(myId) }} />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </label>
            <Select options={props.options} width={ "200px"}/>
          </div>
        </div>
      )
    },
    questyn(props) {
      return (
        <div id={uuidv4()} style={{ padding: "20px 0",width: '40%', marginLeft: "30px"}}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <label className={"label"}>
              <BsTrash style={{ fontSize: "10 px" }} onClick={() => { deleteNode(myId) }} />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </label> 
            <div className="inline" style={{ display: 'flex', flexWrap: 'wrap', overflow: 'none', marginBottom: "10px" }} >
              {props.options.map((cur, index) => (
                <div style={{ display: "flex", margin: "10px 0", alignItems: "center" }} key={index}>
                  <input
                    name="opt"
                    type="radio"
                    id={index}
                  // onChange={() => {
                  // }}
                  >
                  </input>
                  <label>{cur.value}</label>
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
        <div id={uuidv4()} style={{ padding: "20px 0",width: '40%', marginLeft: "30px"}}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <label
              className={props.className}
            >
              <BsTrash style={{ fontSize: "12 px" }} onClick={() => { deleteNode(myId) }} />&nbsp;&nbsp;
              {`${props.label}`}
              {HistObrig()}
            </label>
            {props.subtype === "line" ? <input type="text" style={{ width: "300px"}}/> : <textarea
              row="2"
              col="250"
            />}
          </div>
        </div>
      )
    },
    selectMulti(props) {
      return (
        <div id={uuidv4()} style={{ padding: "20px 0",width: '40%', marginLeft: "30px"}}>
          <div id={myId} style={{ padding: "10px 0" }}>
            <label className="label">
              <BsTrash style={{ fontSize: "10 px" }} onClick={() => { deleteNode(myId) }} />&nbsp;&nbsp;
              {props.label}
              {HistObrig()}
            </label> 
            <Select
              options={props.options}
              isMulti
            />
          </div>
        </div>
      )
    },
    image(props) {
      return (
        <div id={uuidv4()} style={{ width: '100%'}}>
          <div id={myId} style={{ display: "flex", flexDirection: "column" ,padding: "10px 0", alignItems:"center" }}>
            <div className="inputSelect">
              <label style={{margin: "15px 0"}}for="myfile">Escolha uma Imagem:</label>
              <input style={{margin: "15px 0"}} type="file" id="myfile" name="myfile" onChange={e=> setImage(e.target.files[0])}/>
            </div>
            <div className="ImgSpace">
              {image?<img src={URL.createObjectURL(image)} alt="Sua Imagem" height="200px"/>: <p style={{textAlign: "center"}}>Espaço para a Pré-Visualização da Imagem</p>}
            </div>
            <p style={{textAlign: "center", padding: "10px 0"}}>
              <BsTrash style={{ fontSize: "10 px" }} onClick={() => { deleteNode(myId) }} />&nbsp;&nbsp;
              {props.text}
              {HistObrig()} 
            </p> 
          </div>
        </div>
      )
    }
  };
  
  const myId = props.id;
  const tipo = currentItem.type;
  const chamadaAtual = aceptedTypes[tipo];
  return chamadaAtual(currentItem);

}

export default memo(ElementGen);
