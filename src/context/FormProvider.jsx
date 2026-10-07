import React, { useEffect, useState } from 'react';
import FormContext from './FormContext'
import PropTypes from 'prop-types';

const STORAGE_KEY = 'formconstructor:model';
const emptyModel = { name: 'Formulário sem título', items: [] };

const createItemId = () => `field-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const normalizeItems = (items) => {
  const usedIds = new Set();
  return items.map((entry) => {
    const item = { ...(entry?.item || entry) };
    const candidate = entry?.id ?? item.id;
    let id = candidate == null || candidate === '' ? createItemId() : String(candidate);
    while (usedIds.has(id)) id = createItemId();
    usedIds.add(id);
    return { ...item, id };
  });
};

const readModel = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return saved && Array.isArray(saved.items)
      ? { name: saved.name || emptyModel.name, items: normalizeItems(saved.items) }
      : emptyModel;
  } catch (error) {
    return emptyModel;
  }
};

export default function FormProvider({ children }) {
  const [model, setModel] = useState(readModel);
  const formItens = model.items;
  const setFormItens = (itemsOrUpdater) => {
    setModel((current) => ({
      ...current,
      items: normalizeItems(typeof itemsOrUpdater === 'function' ? itemsOrUpdater(current.items) : itemsOrUpdater),
    }));
  };
  const setFormName = (name) => setModel((current) => ({ ...current, name }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: model.name, items: formItens }));
  }, [formItens, model.name]);

  const loadModel = (nextModel) => {
    if (!nextModel || !Array.isArray(nextModel.items)) {
      throw new Error('Arquivo de modelo inválido.');
    }
    setModel({
      name: nextModel.name || 'Formulário sem título',
      items: normalizeItems(nextModel.items),
    });
  };

  const clearModel = () => setModel({ name: 'Formulário sem título', items: [] });

  return (
    <FormContext.Provider value={{ formItens, setFormItens, formName: model.name, setFormName, loadModel, clearModel }}>
      { children }
    </FormContext.Provider>
  )
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
