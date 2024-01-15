# React Custom Hooks

This directory contains two custom React hooks for handling keyboard selection and interaction within a selectable list. These hooks are built around the TypeScript function `handleSelection` and can serve as a reference for creating equivalents in other JavaScript frameworks such as Vue.js, Angular, etc.

## Files

1. `useSelectWithKeyboard`: 
   - This hook provides a React-specific wrapper for handling keyboard selection with optional multiselect and deselect behavior.
   - It exports the `useSelectWithKeyboard` hook, which returns an object containing selected value(s), selection handler, and element properties for accessibility. This hook internally relies on the `handleSelection` function.

2. `useSelecteesWithKeyboard`: 
   - This hook is used for handling keyboard interaction of individual selectees (elements) within a selectable list.
   - It exports the `useSelecteesWithKeyboard` hook, which returns an object containing element properties for the selectee and whether it's selected. This hook also uses the `handleSelection` function for selection logic.

## Usage in Other Frameworks

These custom hooks in React are designed as wrappers around the TypeScript function `handleSelection`. They can provide valuable insights and logic for implementing similar functionality in other JavaScript frameworks. To adapt these hooks for use in Vue.js, Angular, or other frameworks, consider creating equivalent custom directives or services based on the underlying `handleSelection` logic.

## `useSelectWithKeyboard`

### Parameters

- `isMultiselect` (boolean): Indicates whether multiselect mode is enabled.
- `deselectOnClick` (boolean): Indicates whether to deselect the element when clicked.

### Return Value

- `selected`: The selected value(s).
- `onSelection`: A function to handle selection.
- `elementProps`: HTML attributes for accessibility.

## `useSelecteesWithKeyboard`

### Parameters

- `value`: The value of the selectee.
- `useSelectWithKeyboardRef`: A reference to the parent `useSelectWithKeyboard` hook.

### Return Value

- `elementProps`: HTML attributes for the selectee element.
- `isSelected`: A boolean indicating whether the selectee is selected.

## `handleSelection.ts`

This file contains a TypeScript function `handleSelection` used internally by the React hooks for selection logic.

### Parameters

- `element`: The element to be selected or deselected.
- `isMultiselect`: A boolean indicating whether multiselect mode is enabled.
- `selected`: The currently selected element(s) or an array of selected elements.
- `deselectOnClick`: A boolean indicating whether to deselect the element when clicked.

### Return Value

The updated selected element(s) or null (for single select) based on the parameters.

Please use these hooks and the `handleSelection` function as references to implement similar functionality in your chosen JavaScript framework. The React-specific hooks can help you understand the logic behind keyboard selection and interaction, which can be adapted to other frameworks as needed.
