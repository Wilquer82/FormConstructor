import { useEffect, useRef } from 'react';
import ModalTitle from '../Modais/modal-title';
import ModalText from '../Modais/modal-text';
import ModalSelect from '../Modais/modal-select';
import ModalSelectMulti from '../Modais/modal-selectmulti';
import ModalYN from '../Modais/modal-yndesc';
import ModalUpload from '../Modais/modal-upload';

const MODALS = { title: ModalTitle, text: ModalText, select: ModalSelect, selectMulti: ModalSelectMulti, questyn: ModalYN, image: ModalUpload };

export default function ConfigModal({ type, onCreate, onClose }) {
  const dialog = useRef(null);
  useEffect(() => {
    const previousFocus = document.activeElement;
    const inputs = () => Array.from(dialog.current.querySelectorAll('input:not([disabled]), select, textarea, button:not([disabled]), [tabindex="0"]'));
    inputs()[0]?.focus();
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'Tab') {
        const elements = inputs();
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); previousFocus?.focus(); };
  }, [onClose]);
  const Modal = MODALS[type];
  if (!Modal) return null;
  return <div ref={dialog} className="builder-dialog" role="dialog" aria-modal="true" aria-label="Configurar novo campo"
    onClick={(event) => { if (event.target.classList.contains('Fundo')) onClose(); }}>
    <Modal onCreate={onCreate} set={onClose} setMenu={onClose} />
  </div>;
}
