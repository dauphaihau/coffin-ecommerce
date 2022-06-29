import React, {MutableRefObject, useCallback, useEffect, useRef, useState} from "react";

function useHover<T>(): [((node) => void), boolean] {
// function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const handleMouseOver = useCallback((): void => setIsHovering(true), []);
  const handleMouseOut = useCallback((): void => setIsHovering(false), []);

  // const nodeRef = useRef<Element | null>(null);
  const nodeRef = useRef<T | null>(null);

  const callbackRef = useCallback(
    node => {

      // const node: any = nodeRef.current;

      if (nodeRef.current) {
        nodeRef.current.removeEventListener('mouseover', handleMouseOver);
        nodeRef.current.removeEventListener('mouseout', handleMouseOut);
      }

      nodeRef.current = node;

      if (nodeRef.current) {
        nodeRef.current.addEventListener('mouseover', handleMouseOver);
        nodeRef.current.addEventListener('mouseout', handleMouseOut);
      }
    },
    [handleMouseOver, handleMouseOut]
  );

  return [callbackRef, isHovering];
}

export default useHover;