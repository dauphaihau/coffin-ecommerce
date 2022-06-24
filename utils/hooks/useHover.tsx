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

// const useHover = () => {
//   const [isHovering, setIsHovering] = useState(false);
//
//   const handleMouseOver = useCallback(() => setIsHovering(true), []);
//   const handleMouseOut = useCallback(() => setIsHovering(false), []);
//
//   const nodeRef = useRef();
//
//   const callbackRef = useCallback(
//     node => {
//       if (nodeRef.current) {
//         nodeRef.current.removeEventListener('mouseover', handleMouseOver);
//         nodeRef.current.removeEventListener('mouseout', handleMouseOut);
//       }
//
//       nodeRef.current = node;
//
//       if (nodeRef.current) {
//         nodeRef.current.addEventListener('mouseover', handleMouseOver);
//         nodeRef.current.addEventListener('mouseout', handleMouseOut);
//       }
//     },
//     [handleMouseOver, handleMouseOut]
//   );
//
//   return [callbackRef, isHovering];
// };

// function useHover<T>(): [MutableRefObject<T>, boolean] {
//   const [value, setValue] = useState<boolean>(false);
//
//   const ref: any = useRef<T | null>(null);
//
//   const handleMouseOver = (): void => setValue(true);
//   const handleMouseOut = (): void => setValue(false);
//
//   useEffect(
//     () => {
//       const node: any = ref.current;
//       if (node) {
//         node.addEventListener("mouseover", handleMouseOver);
//         node.addEventListener("mouseout", handleMouseOut);
//
//         return () => {
//           node.removeEventListener("mouseover", handleMouseOver);
//           node.removeEventListener("mouseout", handleMouseOut);
//         };
//       }
//     },
//     [ref.current] // Recall only if ref changes
//   );
//
//   return [ref, value];
// }

export default useHover;