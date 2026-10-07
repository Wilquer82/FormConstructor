import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import FormProvider from '../context/FormProvider';
import userEvent from '@testing-library/user-event';

const storedModel = () => JSON.parse(localStorage.getItem('formconstructor:model'));
const renderEditor = () => render(
  <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <FormProvider><App /></FormProvider>
  </MemoryRouter>
);

beforeEach(() => localStorage.clear());

test('creates a configured palette field and persists it for preview', async () => {
  renderEditor();
  fireEvent.click(screen.getByRole('button', { name: 'Adicionar Campo de Texto' }));
  fireEvent.change(screen.getByPlaceholderText('Digite o Label'), { target: { value: 'Nome completo' } });
  fireEvent.click(screen.getByRole('button', { name: 'Criar' }));
  await waitFor(() => expect(storedModel().items).toHaveLength(1));
  expect(storedModel().items[0]).toMatchObject({ type: 'text', label: 'Nome completo' });
  expect(storedModel().items[0].id).toEqual(expect.any(String));
  fireEvent.click(screen.getByRole('link', { name: 'Abrir formulário' }));
  expect(screen.getByRole('textbox', { name: 'Nome completo' })).toBeInTheDocument();
});

test('canceling palette configuration leaves the model unchanged', () => {
  renderEditor();
  fireEvent.click(screen.getByRole('button', { name: 'Adicionar Título/Seção' }));
  fireEvent.change(screen.getByPlaceholderText('Digite o Título'), { target: { value: 'Seção descartada' } });
  fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
  expect(storedModel().items).toEqual([]);
  expect(screen.queryByPlaceholderText('Digite o Título')).not.toBeInTheDocument();
});

test('deletes the selected stable id and preserves the remaining field', () => {
  localStorage.setItem('formconstructor:model', JSON.stringify({ name: 'Modelo', items: [
    { id: 'second', type: 'text', subtype: 'line', label: 'Segundo' },
    { id: 'first', type: 'title', text: 'Primeiro' },
  ] }));
  renderEditor();
  fireEvent.click(screen.getByRole('button', { name: 'Excluir Segundo' }));
  expect(storedModel().items.map(item => item.id)).toEqual(['first']);
});

test('clicking field text does not activate the delete button inside its header', () => {
  localStorage.setItem('formconstructor:model', JSON.stringify({ name: 'Modelo', items: [
    { id: 'text', type: 'text', subtype: 'line', label: 'Nome' },
  ] }));
  renderEditor();
  fireEvent.click(screen.getByText('Nome'));
  expect(storedModel().items.map(item => item.id)).toEqual(['text']);
});

test.each([
  ['Título/Seção', 'Digite o Título', 'title'],
  ['Campo de Texto', 'Digite o Label', 'text'],
  ['Seleção Única', 'Digite o Label', 'select'],
  ['Seleção Múltipla', 'Digite o Label', 'selectMulti'],
  ['Opções com descrição', 'Digite a Pergunta', 'questyn'],
  ['Upload de Imagem', 'Digite a Descrição', 'image'],
])('configures and renders palette type %s', async (label, placeholder, type) => {
  const user = userEvent.setup();
  renderEditor();
  await user.click(screen.getByRole('button', { name: `Adicionar ${label}` }));
  await user.type(screen.getByPlaceholderText(placeholder), 'Novo campo');
  if (type === 'select' || type === 'selectMulti') {
    await user.type(screen.getByRole('combobox'), 'Opção A{Enter}');
  }
  if (type === 'questyn') {
    await user.click(screen.getByRole('button', { name: 'Adicionar Opção' }));
    await user.type(document.querySelector('input.falseBox'), 'Sim');
  }
  await user.click(screen.getByRole('button', { name: 'Criar' }));
  expect(storedModel().items).toHaveLength(1);
  expect(storedModel().items[0].type).toBe(type);
  expect(screen.getByRole('button', { name: /Excluir/ })).toBeInTheDocument();
  await user.click(screen.getByRole('link', { name: 'Abrir formulário' }));
  expect(screen.queryByRole('button', { name: /Reordenar/ })).not.toBeInTheDocument();
});
