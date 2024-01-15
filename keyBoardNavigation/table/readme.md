# React Table Keyboard Navigation Hook

This directory contains a custom React hook for handling keyboard navigation within an HTML table using TypeScript. You can also adapt the logic from this hook to create similar functionality in other frameworks like Vue.js, Angular, and more.

## `useTableKeyboardNavigation` React Hook

This custom React hook sets up event listeners to manage keyboard navigation within an HTML table. It allows you to navigate through table cells using the arrow keys. The hook returns an object containing the `tableProps` and the currently focused table cell element.

### Usage

```javascript
import { useTableKeyboardNavigation } from './logic';

function MyTableComponent() {
  const { tableProps, focusedElement } = useTableKeyboardNavigation();

  return (
    <table {...tableProps}>
      {/* Your table content here */}
    </table>
  );
}
``` 
## TypeScript Logic

The TypeScript logic included in this directory provides the core functionality for handling table keyboard navigation. It includes functions like `handleTableKeyboardNavigation` and `getAllCells` used by the `useTableKeyboardNavigation` hook.

## Adaptability

While this hook is designed for React, you can adapt the TypeScript logic to create similar functionality in other JavaScript frameworks like Vue.js and Angular. The core logic can serve as a foundation for building custom directives or hooks tailored to those frameworks.

## Dependencies

The React hook relies on the following dependencies:

- React
- RxJS

## Contributing

If you'd like to contribute to this project or report issues, please feel free to do so by opening a GitHub issue or creating a pull request.

Thank you for using our table keyboard navigation utilities!
```
