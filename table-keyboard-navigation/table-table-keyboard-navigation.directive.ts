import {
  Directive,
  ChangeDetectorRef,
  ElementRef,
  HostListener,
  AfterViewInit,
  Output,
  EventEmitter,
} from "@angular/core";
import { initTableKeyboardNavigationLogic } from "./tableKeyboardNavigationLogic";

@Directive({
  selector: "[tableKeyBoardNavigation]",
})
export class TableKeyBoardNavigationDirective implements AfterViewInit {
  #_selfEl: HTMLTableElement;
  #_onTableFocus: (ev: FocusEvent) => void;
  #_handleKeyDown: (ev: KeyboardEvent) => HTMLElement;

  @Output() newCellFocused = new EventEmitter<HTMLElement>();

  @HostListener("focusin", ["$event"]) onFocusIn(event: FocusEvent) {
    this.#_onTableFocus(event);
  }

  @HostListener("keydown", ["$event"]) onKeydown(event: KeyboardEvent) {
    const focusedCell = this.#_handleKeyDown(event);
    this.newCellFocused.emit(focusedCell);
  }

  constructor(selfEle: ElementRef, private cdRef: ChangeDetectorRef) {
    this.#_selfEl = selfEle.nativeElement;
  }

  private _assignFunctions() {
    const { onTableFocus, handleKeyDown } = initTableKeyboardNavigationLogic(
      this.#_selfEl
    );
    this.#_handleKeyDown = handleKeyDown;
    this.#_onTableFocus = onTableFocus;
  }

  ngAfterViewInit() {
    this._assignFunctions();
  }
}
