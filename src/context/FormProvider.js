import React, { useState } from 'react';
import FormContext from './FormContext'
import PropTypes from 'prop-types';


export default function FormProvider({ children }) {
  const [formItens, setFormItens] = useState([]);
  const [formDiv, setFormDiv] = useState([]);
  return (
    <FormContext.Provider value={{ formItens, setFormItens, formDiv, setFormDiv }}>
      { children }
    </FormContext.Provider>
  )
}

FormProvider.propTypes = {
  children: PropTypes.node.isRequired,
};