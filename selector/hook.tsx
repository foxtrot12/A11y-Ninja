import { HTMLAttributes, MutableRefObject, useMemo, useState } from "react";
import { handleSelection } from "./logic";

/**
 * Represents the return type of the `useSelectWithKeyboard` hook.
 */
export interface useSelectWithKeyboardReturnType<T> {
  selected: T | Array<T>;
  onSelection: (val: T) => void;
  elementProps: HTMLAttributes<any>;
}

/**
 * A custom React hook for handling keyboard selection with optional multiselect and deselect behavior.
 *
 * @param isMultiselect - A boolean indicating whether multiselect mode is enabled.
 * @param deselectOnClick - A boolean indicating whether to deselect the element when clicked.
 * @returns An object containing selected value(s), selection handler, and element properties for accessibility.
 */
export function useSelectWithKeyboard<T>(
  isMultiselect: boolean,
  deselectOnClick: boolean
): useSelectWithKeyboardReturnType<T> {
  const [selected, setSelected] = useState<T | Array<T>>(null);

  const onSelection = (val: T) => {
    setSelected(
      handleSelection<T>(val, isMultiselect, selected, deselectOnClick)
    );
  };

  const elementProps: HTMLAttributes<any> = useMemo(() => {
    return { "aria-multiselectable": isMultiselect };
  }, [isMultiselect]);

  return { selected, onSelection, elementProps };
}

/**
 * Represents the return type of the `useSelecteesWithKeyboard` hook.
 */
export interface useSelecteeWithKeyboardReturnType<T> {
  elementProps: HTMLAttributes<any>;
  isSelected: boolean;
}

/**
 * A custom React hook for handling keyboard interaction of selectees (individual elements).
 *
 * @param value - The value of the selectee.
 * @param useSelectWithKeyboardRef - A reference to the parent `useSelectWithKeyboard` hook.
 * @returns An object containing element properties for the selectee and whether it's selected.
 */
export function useSelecteesWithKeyboard<T>(
  value: T,
  useSelectWithKeyboardRef: useSelectWithKeyboardReturnType<T>
): useSelecteeWithKeyboardReturnType<T> {
  const returnVal: useSelecteeWithKeyboardReturnType<T> = useMemo(() => {
    const isSelected =
      useSelectWithKeyboardRef.selected === value ||
      (useSelectWithKeyboardRef.selected as Array<T>)?.includes(value);

    const elementProps: HTMLAttributes<any> = {
      onClick: () => useSelectWithKeyboardRef.onSelection(value),
      onKeyDown: (ev) => {
        if (ev.key === "Space" || ev.key === " ") {
          useSelectWithKeyboardRef.onSelection(value);
        }
      },
      "aria-selected": isSelected,
    };

    return { elementProps, isSelected };
  }, [useSelectWithKeyboardRef.selected]);

  return returnVal;
}
