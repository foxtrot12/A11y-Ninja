import { HTMLAttributes, useMemo, useState } from "react";
import { handleSelection } from "./selectorLogic";

export interface useSelectorReturnType<T> {
  selected: T | Array<T>;
  onSelection: (val: T) => void;
  elementProps: HTMLAttributes<any>;
}

/**
 * Create a custom hook for selecting elements.
 * @param isMultiselect - Indicates whether multiselect is enabled.
 * @param deselectOnClick - Indicates whether deselecting is allowed on click.
 * @returns An object with selected elements, selection function, and element properties.
 */
function useSelector<T>(
  isMultiselect: boolean,
  deselectOnClick: boolean
): useSelectorReturnType<T> {
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

export default useSelector;
