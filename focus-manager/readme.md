## Contents

This module comprises the following key files:

1. **focus-manager.directive.ts**: An Angular directive for managing focus behavior in Angular components.
2. **focusManagerLogic.ts**: Core logic for handling focus events and keyboard interactions, adaptable to various JavaScript frameworks.
3. **use-focus-manager.tsx**: A React hook that utilizes the core logic from `focusManagerLogic.ts` for React applications.

## Usage

### FocusManager Directive (Angular)

The `focus-manager.directive.ts` file contains a directive for Angular applications, applicable to any Angular component for managing focus behavior.

**Example:**

```html
<div
  manageFocus
  [domState]="true"
  [trapFocus]="true"
  [onEsc]="escapeFunction()"
  [onFocusOutCb]="onFocusOut()"
>
  <div>item 1</div>
  <a href="example">item 2</a>
  <span>item 3</span>
  <div>item 4</div>
</div>
```

### FocusManager Logic (General JavaScript)

The `focusManagerLogic.ts` file encapsulates the core logic for focus management. It is framework-agnostic and can be integrated into various JavaScript frameworks.

**Example:**

```javascript
import { initLogic } from "path/to/focusManagerLogic";

const { onFocusIn, onFocusOut, onKeyDown, garbageCollector } = initLogic(
  element,
  trapFocus,
  onFocusOutCb,
  onEsc
);

myElement.addEventListener("focusin", onFocusIn);
myElement.addEventListener("focusout", onFocusOut);
myElement.addEventListener("keydown", onKeyDown);

// To detach the handlers and clean up
garbageCollector();
myElement.removeEventListener("focusin", onFocusIn);
myElement.removeEventListener("focusout", onFocusOut);
myElement.removeEventListener("keydown", onKeyDown);
```

### UseFocusManager Hook (React)

The `use-focus-manager.tsx` file provides a React hook for focus management within React components.

**Example:**

```javascript
import { useFocusManager } from "path/to/use-focus-manager";

const MyComponent = () => {
  const domRef = useRef(null);
  useFocusManager(domRef /* other parameters */);

  return <div ref={domRef}>...</div>;
};
```

## Extending to Other Frameworks

The core logic in `focusManagerLogic.ts` can be adapted to implement similar functionality in other JavaScript frameworks, offering a flexible and reusable approach for handling focus events and keyboard interactions.
