import { HTMLProps, useEffect, useRef, useState } from "react";
import { cell, getAllCells, handleTableKeyboardNavigation } from "./logic";
import { fromEvent } from "rxjs";

/**
 * The return type of the `useTableKeyboardNavigation` hook.
 */
interface useTableKeyboardNavigationReturnType {
  tableProps: HTMLProps<HTMLTableElement>;
  focusedElement: HTMLTableCellElement;
}

/**
 * A custom React hook for managing keyboard navigation within an HTML table.
 * It sets up event listeners to handle keyboard input and focus changes.
 *
 * @returns {useTableKeyboardNavigationReturnType} An object containing tableProps
 * and focusedElement, which can be used to manage the table and focused element.
 */
export function useTableKeyboardNavigation(): useTableKeyboardNavigationReturnType {
  const tableRef = useRef<HTMLTableElement>(null);

  const allCellsRef = useRef<HTMLTableCellElement[][]>(null);
  const focusedElementRef = useRef<cell>(null);

  const tableProps: HTMLProps<HTMLTableElement> = {
    ref: tableRef,
  };

  useEffect(() => {
    allCellsRef.current = getAllCells(tableRef.current);
    const tableKeySubs = fromEvent(tableRef.current, "keydown").subscribe(
      (ev) => {
        const newFocusEl = handleTableKeyboardNavigation(
          ev as KeyboardEvent,
          allCellsRef.current,
          focusedElementRef.current
        );
        focusedElementRef.current = newFocusEl;
        allCellsRef.current[focusedElementRef.current.row][
          focusedElementRef.current.col
        ].focus();
      }
    );

    return () => {
      tableKeySubs?.unsubscribe();
    };
  }, [tableRef.current]);

  return {
    tableProps,
    focusedElement: focusedElementRef.current
      ? allCellsRef.current
        ? allCellsRef.current[focusedElementRef.current.row][
            focusedElementRef.current.col
          ]
        : null
      : null,
  };
}

export default useTableKeyboardNavigation;
