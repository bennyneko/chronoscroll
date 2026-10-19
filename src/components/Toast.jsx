import { useCallback, useRef, useState } from 'react';

export function useToast(ms = 2800) {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const t = useRef();
  const toast = useCallback((m) => {
    setMsg(m); setShow(true);
    clearTimeout(t.current);
    t.current = setTimeout(() => setShow(false), ms);
  }, [ms]);
  return [{ msg, show }, toast];
}

export default function Toast({ msg, show }) {
  return (
    <div className={'toast' + (show ? ' show' : '')} role="status" aria-live="polite">{msg}</div>
  );
}
