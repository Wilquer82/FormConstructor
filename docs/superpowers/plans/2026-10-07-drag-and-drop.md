# Plano do editor drag-and-drop

**Objetivo:** evoluir o editor CRA existente com palette lateral e canvas reordenável, preservando Context, modais, JSON, localStorage e `/previa`.

**Arquitetura:** `form-project.jsx` coordena um `DragDropContext`. A palette é uma origem permanente, com drops desabilitados; o canvas aceita criação e reordenação. Os modais recebem `onCreate` opcional e o editor insere o objeto confirmado na posição reservada usando atualização funcional.

**Stack:** React 19, JSX, Context API, @hello-pangea/dnd, react-select e react-icons.

Execução no workspace atual conforme pedido de implementação imediata; sem commit ou publicação.

- [x] Testar criação/cancelamento com componentes reais e operações de drop (posição, reordenação, cancelamento e destino inválido).
- [x] Instalar @hello-pangea/dnd, remover react-beautiful-dnd-grid e criar Palette, Canvas, FieldCard e ConfigModal.
- [x] Integrar callback de criação aos seis modais, inserção funcional e IDs únicos estáveis no Provider.
- [x] Aplicar layout responsivo, alças acessíveis, placeholder e feedback de arraste.
- [x] Validar suíte, build e interação de drag no navegador; documentar comandos e uso.

Foco de revisão: canvas vazio, inserção no meio/fim, drops fora/cancelados, reutilização da palette, modelos legados/IDs duplicados, exclusão após reordenar e prévia sem componentes de drag.

Validação: 18 testes em 4 suítes; navegador Edge headless confirmou arraste por mouse e teclado, inserção intermediária, reordenação com alturas diferentes, IDs preservados, drops inválidos/cancelados, exclusão, JSON, persistência, prévia e largura móvel. Revisão independente identificou e confirmou correções das alças em botões, cópia da palette e associação indevida dos labels à lixeira.
