import { HTMLProps, MutableRefObject, useEffect, useRef } from "react";
import { fromEvent } from "rxjs";
import { initTableKeyboardNavigationLogic } from "./tableKeyboardNavigationLogic";

/**
 * The return type of the `useTableKeyboardNavigation` hook.
 */
interface useTableKeyboardNavigationReturnType {
  tableProps: HTMLProps<HTMLTableElement>;
  focusedElement: HTMLTableCellElement | null;
}

export function useTableKeyboardNavigation(): useTableKeyboardNavigationReturnType {
  const tableRef = useRef<HTMLTableElement>(null);
  const focusedElementRef: MutableRefObject<HTMLTableCellElement | null> =
    useRef(null);

  useEffect(() => {
    if (!tableRef.current) {
      return;
    }
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
    tableProps: { ref: tableRef },
    focusedElement: focusedElementRef.current,
  };
}

export default useTableKeyboardNavigation;
