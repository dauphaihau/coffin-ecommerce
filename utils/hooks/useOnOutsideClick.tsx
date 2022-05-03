import React, {useEffect, useRef} from "react";

export function useOnOutsideClick(callback) {
  const innerRef = useRef<HTMLDivElement>(null);
  const callbackRef = useRef<React.FC>(null);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      ) {
        callbackRef.current(e);
      }
    }
  }, []);

  return innerRef;
}
