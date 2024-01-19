import { HTMLAttributes, useMemo } from "react";
import { useSelectorReturnType } from "./useSelector";
export interface useSelecteeReturnType<T> {
  elementProps: HTMLAttributes<any>;
  isSelected: boolean;
}

/**
 * Create a custom hook for individual selectable elements.
 * @param value - The value of the selectee element.
 * @param useSelectWithKeyboardRef - Reference to the useSelector hook.
 * @param selectWithKeyboard - Indicates whether selection with keyboard is enabled.
 * @returns An object with element properties and selection status.
 */
function useSelectee<T>(
  value: T,
  useSelectWithKeyboardRef: useSelectorReturnType<T>,
  selectWithKeyboard: boolean
): useSelecteeReturnType<T> {
  const isSelected =
    useSelectWithKeyboardRef.selected === value ||
    (useSelectWithKeyboardRef.selected as Array<T>)?.includes(value);

  const elementProps: HTMLAttributes<any> = useMemo(() => {
    return {
      onClick: () => useSelectWithKeyboardRef.onSelection(value),
      onKeyDown: (ev) => {
        if (selectWithKeyboard && (ev.key === "Space" || ev.key === " ")) {
          useSelectWithKeyboardRef.onSelection(value);
        }
      },
      "aria-selected": isSelected,
    };
  }, [useSelectWithKeyboardRef.selected]);

  return { elementProps, isSelected };
}

export default useSelectee;
