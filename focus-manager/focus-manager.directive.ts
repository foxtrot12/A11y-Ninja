import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from "@angular/core";
import { initLogic } from "./focusManagerLogic";

@Directive({
  selector: "[manageFocus]",
})
export class FocusManagerDirective
  implements OnDestroy, AfterViewInit, OnChanges
{
  @Input() domState: boolean;
  @Input() trapFocus: boolean = false;
  @Input() onEsc: Function | undefined;
  @Input() onFocusOutCb: Function | undefined;

  #_onFocusIn: (evt: FocusEvent) => void;
  #_onFocusOut: (evt: FocusEvent) => void;
  #_onKeyDown: (evt: KeyboardEvent) => void;
  #_garbageCollector: () => void;

  @HostListener("focusin", ["$event"]) onFocusIn(event: FocusEvent) {
    this.#_onFocusIn(event);
  }

  @HostListener("focusout", ["$event"]) onFocusOut(event: FocusEvent) {
    this.#_onFocusOut(event);
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    this.#_onKeyDown(event);
  }

  constructor(private hostEl: ElementRef) {}

  private _assignFunction() {
    this.#_garbageCollector != undefined ? this.#_garbageCollector() : null;

    const { onFocusIn, onFocusOut, onKeyDown, garbageCollector } = initLogic(
      this.hostEl.nativeElement,
      this.trapFocus,
      this.onFocusOutCb,
      this.onEsc
    );

    this.#_garbageCollector = garbageCollector;
    this.#_onFocusIn = onFocusIn;
    this.#_onFocusOut = onFocusOut;
    this.#_onKeyDown = onKeyDown;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.domState) {
      this._assignFunction();
    }
  }

  ngAfterViewInit() {
    this._assignFunction();
  }

  ngOnDestroy(): void {
    this.#_garbageCollector();
  }
}
