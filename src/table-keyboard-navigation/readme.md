# TableKeyboardNavigationTS module

## Overview

`TableKeyboardNavigationTS` is a TypeScript module designed to enhance keyboard navigation within HTML table elements. This module is ideal for Angular and React applications that require improved accessibility and usability for table components, especially in scenarios requiring keyboard-only navigation.

## Contents

This library includes the following files:

1. **tableKeyboardNavigationLogic.ts**: Core logic for handling keyboard navigation in table elements.
2. **table-table-keyboard-navigation.directive.ts**: An Angular directive for applying keyboard navigation logic to table components.
3. **use-table-keyboard-navigation.tsx**: A React hook for managing keyboard navigation in table components within React applications.

## Usage

### Table Keyboard Navigation Logic (General JavaScript)

The `tableKeyboardNavigationLogic.ts` file encapsulates the core logic for keyboard navigation in tables.

### Table Keyboard Navigation Directive (Angular)

The `table-table-keyboard-navigation.directive.ts` file provides an Angular directive for easily integrating keyboard navigation into table components.

**Example:**

```typescript
import { TableKeyboardNavigationDirective } from "path/to/table-table-keyboard-navigation.directive";

@Component({
  selector: "app-my-table",
  template: `
    <table tableKeyBoardNavigation>
      <!-- Table rows and cells -->
    </table>
  `,
})
export class MyTableComponent {}
```

### useTableKeyboardNavigation Hook (React)

The `use-table-keyboard-navigation.tsx` file offers a React hook for managing keyboard navigation in table components.

**Example:**

```javascript
import { useTableKeyboardNavigation } from 'path/to/use-table-keyboard-navigation';

const MyTableComponent = () => {
  const { tableProps, focusedElement } = useTableKeyboardNavigation();

  return (
    <table {...tableProps}>
      <!-- Table rows and cells -->
    </table>
  );
};
```
## Extending to Other Frameworks

The core logic in `tableKeyboardNavigationLogic.ts` can be adapted to implement similar functionality in other JavaScript frameworks, offering a flexible and reusable approach for handling keyboard navigation.
