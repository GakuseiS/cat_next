/**
 * Хук для обработки события клика вне области
 */
import { useState, useLayoutEffect, RefObject, useCallback } from 'react';

interface DetectClickHookProps {
  ref: RefObject<HTMLElement>;
  initialState?: boolean;
  clear?: () => void;
}

export const useDetectClick = ({ ref, clear, initialState = false }: DetectClickHookProps) => {
  const [isActive, setIsActive] = useState(initialState);

  useLayoutEffect(() => {
    document.addEventListener('mousedown', pageClickEvent);

    return () => {
      document.removeEventListener('mousedown', pageClickEvent);
    };
  }, []);

  const pageClickEvent = useCallback((e: MouseEvent) => {
    // Обработка клика если вне области курсор
    const isMissClick = ref.current && !ref.current.contains(e.target as Node);
    if (isMissClick) {
      setIsActive(false);
      clear?.();
    }
  }, []);

  const setActive = (showing: boolean) => {
    setIsActive(showing);
    clear?.();
  };

  return { isActive, setActive };
};
