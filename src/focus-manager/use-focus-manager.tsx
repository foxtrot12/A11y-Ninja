import { initLogic } from "./focusManagerLogic";
import { Subscription, fromEvent } from "rxjs";
import { useEffect, MutableRefObject } from "react";

/**
 *
 * @param domRef React DOM Reference
 * @param domState Element could be toggled in view multiple times
 * @param trapFocus
 * @param onEsc
 * @param onFocusOutCb
 */
export function useFocusManager(
  domRef: MutableRefObject<HTMLElement>,
  domState: boolean,
  trapFocus?: boolean,
  onEsc?: Function,
  onFocusOutCb?: Function
) {
  useEffect(() => {
    const _subsManager: Subscription = new Subscription();

    const { onFocusIn, onFocusOut, onKeyDown, garbageCollector } = initLogic(
      domRef.current,
      trapFocus ?? false,
      onFocusOutCb,
      onEsc
    );

    if (domRef.current) {
      if (onEsc) {
        _subsManager.add(
          fromEvent<KeyboardEvent>(domRef.current, "keydown").subscribe((evt) =>
            onKeyDown(evt)
          )
        );
      }

      _subsManager.add(
        fromEvent<FocusEvent>(domRef.current, "focusin").subscribe((evt) =>
          onFocusIn(evt)
        )
      );

      _subsManager.add(
        fromEvent<FocusEvent>(domRef.current, "focusout").subscribe((evt) => {
          onFocusOut(evt);
        })
      );
    }

    return () => {
      _subsManager.unsubscribe();
      garbageCollector();
    };
  }, [domState]);
}
