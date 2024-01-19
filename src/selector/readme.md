# SelectionUtilsTS module

## Overview

The `SelectionUtilsTS` module provides TypeScript utilities for managing selection behaviors in web applications. This library is ideal for implementing selection features in Angular and React-based applications, such as selecting items in a list, toggling selection states, and handling multi-selection scenarios.

## Contents

This library includes the following files:

1. **selectee.directive.ts**: An Angular directive for managing individual selectable items.
2. **selector.directive.ts**: An Angular directive for managing a group of selectable items.
3. **selectorLogic.ts**: Core logic for handling selection and deselection of elements.
4. **useSelectee.tsx**: A React hook for individual selectable elements.
5. **useSelector.tsx**: A React hook for managing a group of selectable elements.

## Usage

### Selectee Directive (Angular)

The `selectee.directive.ts` file contains an Angular directive to be used on individual selectable items.

### Selector Directive (Angular)

The `selector.directive.ts` file provides a directive for managing a group of selectable items in Angular.

**Example:**

```html
<table
  selector
  [isMultiselect]="true"
  [deselectOnClick]="false"
  (selectionChanged)="onSelectionChanged($event)"
>
  <thead>
    <tr>
      <th *ngFor="let header of tableHeaders">{{ header }}</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of tableData">
      <td
        selectee
        [value]="cell"
        [selectWithKeyboard]="true"
        *ngFor="let cell of row"
      >
        {{ cell }}
      </td>
    </tr>
  </tbody>
</table>
```

### Selector Logic (General JavaScript)

The `selectorLogic.ts` file encapsulates the core logic for selection and deselection.

### useSelectee Hook (React)

The `useSelectee.tsx` file provides a React hook for individual selectable elements.

### useSelector Hook (React)

The `useSelector.tsx` file offers a React hook for managing a group of selectable elements.

**Example:**

```javascript
import { useSelector } from "path/to/useSelector";

const MySelectableList = () => {
  const { selected, onSelection, elementProps } = useSelector(/* parameters */);

return (
    <table {...elementProps}>
      <thead>
        <tr>
          {tableHeaders.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => {
              const { elementProps, isSelected } = useSelectee(/* parameters */);
              return <td {...elementProps} key={cellIndex}>{cell}</td>
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

```

## Extending to Other Frameworks

The core logic in `selectorLogic.ts` can be adapted to implement similar functionality in other JavaScript frameworks, offering a flexible and reusable approach for handling selection behaviors.
