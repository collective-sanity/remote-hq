import { useState, useEffect, useCallback } from 'react';

export const useKeyPress = (key, ctrl=false, shift=false) => {
  const [keyPressed, setKeyPressed] = useState(false);

  const keydownHandler = useCallback((e) => {
    if (e.shiftKey === shift && e.ctrlKey === ctrl && e.key === key){
      setKeyPressed(true);
    }
  }, [shift, ctrl, key]);

  const keyupHandler = useCallback((e) => {
    if (e.key === key){
      setKeyPressed(false);
    }
  }, [key]);

  // Attach handler on refresh
  useEffect(() => {
    window.addEventListener("keydown", keydownHandler);
    window.addEventListener("keyup", keyupHandler);
    return () => {
      window.removeEventListener("keydown", keydownHandler);
      window.removeEventListener("keyup", keyupHandler);
    }
  }, [keydownHandler, keyupHandler]);

  return keyPressed;
}