import { HTMLProps, useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { initTableKeyboardNavigationLogic } from "./tableKeyboardNavigationLogic";

/**
 * The return type of the `useTableKeyboardNavigation` hook.
 */
interface useTableKeyboardNavigationReturnType {
  tableProps: HTMLProps<HTMLTableElement>;
  focusedElement: HTMLTableCellElement;
}

export function useTableKeyboardNavigation(): useTableKeyboardNavigationReturnType {
  const tableRef = useRef<HTMLTableElement>(null);
  const focusedElementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const { handleKeyDown, onTableFocus } = initTableKeyboardNavigationLogic(
      tableRef.current
    );

    const tblFocusSubs = fromEvent<FocusEvent>(
      tableRef.current,
      "focusin"
    ).subscribe((evt) => onTableFocus(evt));

    const keyDownSubs = fromEvent<KeyboardEvent>(
      tableRef.current,
      "keydown"
    ).subscribe((evt) => {
      focusedElementRef.current = handleKeyDown(evt);
    });

    return () => {
      keyDownSubs.unsubscribe();
      tblFocusSubs.unsubscribe();
    };
  }, [tableRef.current]);

  return {
    tableProps: { tableRef },
    focusedElement: focusedElementRef.current,
  };
}

export default useTableKeyboardNavigation;
