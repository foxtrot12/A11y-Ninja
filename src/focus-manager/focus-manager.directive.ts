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
  @Input() domState: boolean = false;
  @Input() trapFocus: boolean = false;
  @Input() onEsc: Function | undefined;
  @Input() onFocusOutCb: Function | undefined;

  #_onFocusIn: ((evt: FocusEvent) => void) | null = null;
  #_onFocusOut: ((evt: FocusEvent) => void) | null = null;
  #_onKeyDown: ((evt: KeyboardEvent) => void) | null = null;
  #_garbageCollector: (() => void) | null = null;

  @HostListener("focusin", ["$event"]) onFocusIn(event: FocusEvent) {
    if (!this.#_onFocusIn) {
      return;
    }
    this.#_onFocusIn(event);
  }

  @HostListener("focusout", ["$event"]) onFocusOut(event: FocusEvent) {
    if (!this.#_onFocusOut) {
      return;
    }
    this.#_onFocusOut(event);
  }

  @HostListener("keydown", ["$event"]) onKeyDown(event: KeyboardEvent) {
    if (!this.#_onKeyDown) {
      return;
    }
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
    if (this.#_garbageCollector) {
      this.#_garbageCollector();
    }
  }
}
