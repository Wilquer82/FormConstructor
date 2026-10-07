# FormConstructor
Construtor Interativo de formulários
Para Impressões, ou posteriormente salvar em DB
Utilizado ReactJs, Context, e ReactHooks
Deploy em https://formcreatorwill.netlify.app/

## Editor drag-and-drop

O editor usa `@hello-pangea/dnd`, React/JSX e o Context existente.

```sh
npm install
npm start
```

Para aplicar a troca de biblioteca em uma instalação anterior:

```sh
npm uninstall react-beautiful-dnd-grid
npm install @hello-pangea/dnd
```

- Arraste um dos seis tipos da palette para o canvas. Configure no modal e clique em **Criar**: o campo entra na posição escolhida. **Cancelar**, Esc ou clique no fundo descartam a criação.
- Clique no tipo para adicionar ao final sem arrastar.
- Use a alça de cada cartão para reordenar. A lixeira exclui o campo.
- Pelo teclado, foque a palette ou alça, pressione Espaço, mova com as setas e pressione Espaço para soltar. Esc cancela o arraste.
- Em telas pequenas, a palette aparece acima do canvas.
- **Salvar modelo** exporta JSON; **Carregar modelo** importa; **Novo modelo** limpa após confirmação. O nome e a ordem são persistidos no localStorage.
- **Abrir formulário** continua levando à rota `/previa`, renderizada por `FormRenderer`.

Componentes em `src/components/builder/`: `Palette`, `Canvas`, `FieldCard` e `ConfigModal`. `form-project.jsx` coordena o drop e a inserção. Os seis modais aceitam `onCreate` opcional, mantendo o fluxo do menu antigo.

```sh
npm test -- --watchAll=false --runInBand
npm run build
```

Referência da biblioteca: [documentação oficial](https://github.com/hello-pangea/dnd/tree/main/docs).
