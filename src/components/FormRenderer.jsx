import React, { useState } from 'react';
import Select from 'react-select';

export default function FormRenderer({ items, editable = false }) {
  const [imageUrls, setImageUrls] = useState({});

  const renderItem = (entry) => {
    const item = entry.item || entry;
    const itemId = entry.id || item.id || item.label || item.text;
    const label = item.label || item.text;
    const badge = item.required ? 'Obrigatório' : '';

    if (item.type === 'title') {
      const Heading = item.classNameOne || 'h3';
      return React.createElement(Heading, { className: item.classNameTwo || 'example' }, item.text);
    }
    if (item.type === 'text') {
      return <label className="field-label">{label} {badge && <small>{badge}</small>}{item.subtype === 'line' ? <input name={itemId} type="text" required={item.required} /> : <textarea name={itemId} rows="3" required={item.required} />}</label>;
    }
    if (item.type === 'select' || item.type === 'selectMulti') {
      return <label className="field-label">{label} {badge && <small>{badge}</small>}<Select inputId={itemId} name={itemId} options={item.options || []} isMulti={item.type === 'selectMulti'} required={item.required} /></label>;
    }
    if (item.type === 'questyn') {
      return <fieldset><legend>{label} {badge && <small>{badge}</small>}</legend>{(item.options || []).map((option, index) => <label className="choice" key={`${itemId}-${index}`}><input type="radio" name={itemId} value={option.value} required={item.required && index === 0} />{option.value}{option.descript && <input type="text" name={`${itemId}-${index}-description`} placeholder="Descrição" />}</label>)}</fieldset>;
    }
    if (item.type === 'image') {
      return <label className="field-label">{label} {badge && <small>{badge}</small>}<input name={itemId} type="file" accept="image/*" required={item.required} onChange={(event) => { const file = event.target.files[0]; if (file) setImageUrls((current) => ({ ...current, [itemId]: URL.createObjectURL(file) })); }} />{imageUrls[itemId] && <img className="uploaded-image" src={imageUrls[itemId]} alt={label} />}</label>;
    }
    return null;
  };

  return <div className={`form-renderer ${editable ? 'is-editor' : 'is-form'}`}>{items.map((entry, index) => <div className="rendered-field" key={entry.id || index}>{renderItem(entry)}</div>)}</div>;
}
