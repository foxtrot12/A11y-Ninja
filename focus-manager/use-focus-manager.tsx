import { initLogic } from "./focusManagerLogic";
import { Subscription, fromEvent } from "rxjs";
import { useEffect } from "react";

/**
 *
 * @param domRef React DOM Reference
 * @param domState Element could be toggled in view multiple times
 * @param trapFocus
 * @param onEsc
 * @param onFocusOutCb
 */
export function useFocusManager(
  domRef: React.MutableRefObject<HTMLElement>,
  domState: boolean,
  trapFocus?: boolean,
  onEsc?: Function,
  onFocusOutCb?: Function
) {
  useEffect(() => {
    const _subsManager: Subscription = new Subscription();

    const { onFocusIn, onFocusOut, onKeyDown, garbageCollector } = initLogic(
      domRef.current,
      trapFocus,
      onFocusOutCb,
      onEsc
    );

    if (domRef.current) {
      if (onEsc) {
        _subsManager.add(
          fromEvent(domRef.current, "keydown").subscribe((evt: KeyboardEvent) =>
            onKeyDown(evt)
          )
        );
      }

      _subsManager.add(
        fromEvent(domRef.current, "focusin").subscribe((evt: FocusEvent) =>
          onFocusIn(evt)
        )
      );

      _subsManager.add(
        fromEvent(domRef.current, "focusout").subscribe((evt: FocusEvent) => {
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
