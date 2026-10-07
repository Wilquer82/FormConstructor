import { BsFonts, BsInputCursorText, BsListUl, BsUiChecks, BsCardChecklist, BsImage } from 'react-icons/bs';

export const FIELD_TYPES = [
  { type: 'title', label: 'Título/Seção', Icon: BsFonts },
  { type: 'text', label: 'Campo de Texto', Icon: BsInputCursorText },
  { type: 'select', label: 'Seleção Única', Icon: BsListUl },
  { type: 'selectMulti', label: 'Seleção Múltipla', Icon: BsUiChecks },
  { type: 'questyn', label: 'Opções com descrição', Icon: BsCardChecklist },
  { type: 'image', label: 'Upload de Imagem', Icon: BsImage },
];

export const PALETTE_ID = 'palette';
export const CANVAS_ID = 'canvas';
