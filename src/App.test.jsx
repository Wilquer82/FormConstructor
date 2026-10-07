import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import FormProvider from './context/FormProvider';

test('renders the form editor inside the application providers', () => {
  render(
    <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <FormProvider>
        <App />
      </FormProvider>
    </MemoryRouter>
  );

  expect(screen.getByText('Construtor de Formulários')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Salvar modelo' })).toBeInTheDocument();
});
