
# A11y Ninja

## Overview
This library is a collection of TypeScript modules designed to enhance accessibility and user interaction within web applications. It includes utilities for focus management, selection behaviors, and keyboard navigation in tables, making it ideal for Angular and React-based applications. The modules are:

## Purpose:
This library serves a crucial role in the web development landscape by addressing accessibility concerns in pre-existing projects where the adoption of entirely new components, such as those from Material-UI (MUI) or React Aria, may not be a feasible option. It offers out-of-the-box accessibility enhancements for React and Angular components, making it a valuable resource for improving accessibility without the need for a complete overhaul. By utilizing the core logic files provided in each module, developers can seamlessly implement the same accessibility functionality in other JavaScript frameworks, ensuring a more inclusive and accessible user experience across various web applications.

1. **focus-manager**: Focus management utilities.
2. **selector**: Selection behavior utilities.
3. **table-keyboard-navigation**: Table keyboard navigation utilities.

Each module is designed to be independently integrable into your web application, providing specific functionalities to improve the overall user experience and accessibility.

## Modules

### 1. accessibilityUtilsTS
Focus management utilities for Angular and React applications.

#### Key Files:
- `focus-manager.directive.ts`
- `focusManagerLogic.ts`
- `use-focus-manager.tsx`

#### Usage Examples:
- Angular directive for focus management.
- General JavaScript logic adaptable to various frameworks.
- React hook for focus management.

### 2. SelectionUtilsTS
Utilities for managing selection behaviors in Angular and React applications.

#### Key Files:
- `selectee.directive.ts`
- `selector.directive.ts`
- `selectorLogic.ts`
- `useSelectee.tsx`
- `useSelector.tsx`

#### Usage Examples:
- Angular directives for individual and group selection management.
- Core selection logic for general JavaScript.
- React hooks for selection management.

### 3. TableKeyboardNavigationTS
Keyboard navigation utilities for HTML table elements in Angular and React applications.

#### Key Files:
- `tableKeyboardNavigationLogic.ts`
- `table-table-keyboard-navigation.directive.ts`
- `use-table-keyboard-navigation.tsx`

#### Usage Examples:
- Core logic for keyboard navigation in tables.
- Angular directive for table keyboard navigation.
- React hook for keyboard navigation in table components.

## Extending to Other Frameworks
The core logic in each module can be adapted to implement similar functionalities in other JavaScript frameworks, offering a flexible and reusable approach for handling focus, selection, and keyboard navigation behaviors.

## Contribution
Contributions to enhance and extend the functionality of this library are welcome. Please follow the standard procedures for submitting pull requests and issues on the project repository.

