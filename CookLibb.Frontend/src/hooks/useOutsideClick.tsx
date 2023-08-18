import { useEffect, useRef, RefObject } from 'react';

export function useOutsideClick(
  handler: () => void,
  listenCapturing = true
): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => {
      document.removeEventListener('click', handleClick, listenCapturing);
    };
  }, [handler, listenCapturing]);

  return ref;
}
