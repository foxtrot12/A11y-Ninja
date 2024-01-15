/**
 * Handles element selection based on the provided parameters.
 *
 * @param element - The element to be selected or deselected.
 * @param isMultiselect - A boolean indicating whether multiselect mode is enabled.
 * @param selected - The currently selected element(s) or an array of selected elements.
 * @param deselectOnClick - A boolean indicating whether to deselect the element when clicked.
 * @returns The updated selected element(s) or null (for single select) based on the parameters.
 */
export function handleSelection<T>(
    element: T,
    isMultiselect: boolean,
    selected: T | Array<T>,
    deselectOnClick: boolean
  ): T | Array<T> {
    if (isMultiselect) {
      const newArr = [...(Array.isArray(selected) ? selected : [])];
      const index = newArr.indexOf(element);
  
      if (index !== -1 && deselectOnClick) {
        // Remove the element from the selected array if it's already selected
        newArr.splice(index, 1);
        return newArr; // Return a new array to trigger reactivity (assuming this is for a reactive framework)
      } else if (index === -1) {
        // Add the element to the selected array if it's not selected
        newArr.push(element);
        return newArr; // Return a new array to trigger reactivity (assuming this is for a reactive framework)
      }
    } else {
      // Single select mode
      if (element === selected && deselectOnClick) {
        // Deselect the element if it's already selected and deselectOnClick is true
        return null;
      } else {
        // Select the element if it's not selected or deselectOnClick is false
        return element;
      }
    }
  }
  