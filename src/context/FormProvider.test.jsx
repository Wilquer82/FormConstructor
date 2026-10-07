import { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import FormProvider from './FormProvider';
import FormContext from './FormContext';

function ModelControls() {
  const { formItens, setFormItens, loadModel, clearModel } = useContext(FormContext);
  return <>
    <output>{JSON.stringify(formItens)}</output>
    <button onClick={() => loadModel({ items: [
      { id: 'same', item: { type: 'title', text: 'Legado' } },
      { id: 'same', type: 'text', label: 'Segundo' },
      { id: 42, type: 'image' },
      { type: 'select' },
    ] })}>Importar</button>
    <button onClick={() => setFormItens(items => [...items].reverse())}>Inverter</button>
    <button onClick={clearModel}>Limpar</button>
  </>;
}

test('normalizes legacy and duplicate ids, preserves them after reorder and saves the order', () => {
  localStorage.clear();
  render(<FormProvider><ModelControls /></FormProvider>);
  fireEvent.click(screen.getByText('Importar'));
  const imported = JSON.parse(screen.getByRole('status').textContent);
  expect(imported[0]).toMatchObject({ id: 'same', type: 'title', text: 'Legado' });
  expect(new Set(imported.map(item => item.id)).size).toBe(4);
  expect(imported.every(item => typeof item.id === 'string')).toBe(true);
  fireEvent.click(screen.getByText('Inverter'));
  expect(JSON.parse(screen.getByRole('status').textContent).map(item => item.id)).toEqual(imported.map(item => item.id).reverse());
  expect(JSON.parse(localStorage.getItem('formconstructor:model')).items.map(item => item.id)).toEqual(imported.map(item => item.id).reverse());
  fireEvent.click(screen.getByText('Limpar'));
  expect(JSON.parse(localStorage.getItem('formconstructor:model')).items).toEqual([]);
});
