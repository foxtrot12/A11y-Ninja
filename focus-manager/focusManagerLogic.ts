import { Subscription, asapScheduler, fromEvent } from "rxjs";

/**
 * Initializes the logic for handling focus events and keyboard interactions.
 *
 * @param ele - The HTML element to which focus management will be applied.
 * @param trapFocus - A boolean indicating whether to trap focus within the element.
 * @param onFocusOutCb - Optional callback function to execute when focus leaves the element.
 * @param onEsc - Optional callback function to execute when the 'Escape' key is pressed.
 * @returns An object containing event handlers and a garbage collector function.
 */
export function initLogic(
  ele: HTMLElement,
  trapFocus: boolean,
  onFocusOutCb?: Function,
  onEsc?: Function
): {
  /**
   * Handles the 'focusin' event for the specified element.
   *
   * @param event - The FocusEvent object.
   */
  onFocusIn: (evt: FocusEvent) => void;
  /**
   * Handles the 'focusout' event for the specified element.
   *
   * @param evt - The FocusEvent object.
   */
  onFocusOut: (evt: FocusEvent) => void;
  /**
   * Handles the 'keydown' event for the specified element.
   *
   * @param evt - The KeyboardEvent object.
   */
  onKeyDown: (evt: KeyboardEvent) => void;
  /**
   * Unsubscribes all event subscriptions, cleaning up resources.
   */
  garbageCollector: () => void;
} {
  let hasFocus: boolean = false,
    firstTimeChildFocus: boolean = false,
    firstFocusableElement: HTMLElement,
    lastFocusableElement: HTMLElement,
    subsManager: Subscription = new Subscription();

  const onFocusOut = (evt: FocusEvent) => {
    hasFocus = false;

    subsManager.add(
      asapScheduler.schedule(() => {
        if (hasFocus === false) {
          if (onFocusOutCb) {
            onFocusOutCb();
          }
        }
      })
    );
  };

  const onKeyDown = (evt: KeyboardEvent) => {
    if (evt.key === "Escape" && onEsc) {
      onEsc();

      evt.stopPropagation();
      // In case by mistake multiple listeners are scheduled
      evt.stopImmediatePropagation();
    }
  };

  const onFocusIn = (event) => {
    hasFocus = true;

    // As soon as the first child is focused, set the first and last children for trapping focus
    if (!firstTimeChildFocus && event.target !== ele) {
      firstTimeChildFocus = true;

      if (trapFocus) {
        firstFocusableElement = findFirstFocusable(ele, true);

        lastFocusableElement = findLastFocusable(ele, true);

        if (!firstFocusableElement || !lastFocusableElement) {
          throw new Error(
            "Focusable element not found in list - " +
              (firstFocusableElement ? "1" : "0")
          );
        }

        const firstElKeySubs = fromEvent<KeyboardEvent>(
          firstFocusableElement,
          "keydown"
        ).subscribe((ev) => {
          if (ev.shiftKey && ev.code === "Tab") {
            ev.preventDefault();

            lastFocusableElement.focus();
          }
        });

        subsManager.add(firstElKeySubs);

        const lastElKeySubs = fromEvent<KeyboardEvent>(
          lastFocusableElement,
          "keydown"
        ).subscribe((ev) => {
          if (ev.code === "Tab" && !ev.shiftKey) {
            ev.preventDefault();

            firstFocusableElement.focus();
          }
        });

        subsManager.add(lastElKeySubs);
      }
    }
  };

  const garbageCollector = () => {
    subsManager.unsubscribe();
  };

  return {
    onFocusOut,
    onFocusIn,
    onKeyDown,
    garbageCollector,
  };
}

/**
 * Finds the first focusable element within the specified element and its descendants.
 *
 * @param ele - The HTML element to search within.
 * @param isRoot - Optional flag indicating whether the element is the root element.
 * @returns The first focusable HTMLElement found, or null if none is found.
 */
function findFirstFocusable(ele, isRoot?: any) {
  if (!isElementSeenInDom(ele)) {
    return null;
  }

  if (!isRoot && isElementFocusable(ele)) {
    return ele;
  }

  for (var i = 0; i < ele.children.length; i++) {
    var found = findFirstFocusable(ele.children[i]);

    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Finds the last focusable element within the specified element and its descendants.
 *
 * @param ele - The HTML element to search within.
 * @param isRoot - Optional flag indicating whether the element is the root element.
 * @returns The last focusable HTMLElement found, or null if none is found.
 */
function findLastFocusable(ele: HTMLElement, isRoot?: boolean) {
  if (!isElementSeenInDom(ele)) {
    return null;
  }

  if (!isRoot && isElementFocusable(ele)) {
    return ele;
  }

  for (let i = ele.children.length - 1; i >= 0; i--) {
    const found = findLastFocusable(ele.children[i] as HTMLElement);

    if (found) {
      return found;
    }
  }

  return null;
}

/**
 * Determines if the specified HTML element is focusable.
 *
 * @param ele - The HTML element to check for focusability.
 * @returns True if the element is focusable, otherwise false.
 */
function isElementFocusable(ele: HTMLElement) {
  if (ele) {
    const isMatching =
      (ele.tagName === "A" && ele.hasAttribute("href")) ||
      (ele.tagName === "AREA" && ele.hasAttribute("href")) ||
      ((ele.tagName === "INPUT" ||
        ele.tagName === "SELECT" ||
        ele.tagName === "TEXTAREA" ||
        ele.tagName === "BUTTON") &&
        !ele.hasAttribute("disabled")) ||
      ele.tagName === "IFRAME" ||
      ele.tagName === "OBJECT" ||
      ele.tagName === "EMBED" ||
      ele.hasAttribute("tabindex") ||
      ele.hasAttribute("contenteditable");

    return isMatching;
  } else {
    return false;
  }
}

/**
 * Determines if the specified HTML element is visible in the DOM.
 *
 * @param ele - The HTML element to check for visibility.
 * @returns True if the element is visible, otherwise false.
 */
function isElementSeenInDom(ele: HTMLElement): boolean {
  const eleStyle = getComputedStyle(ele);
  return (
    eleStyle.display !== "none" &&
    eleStyle.visibility !== "hidden" &&
    !ele.hidden
  );
}
