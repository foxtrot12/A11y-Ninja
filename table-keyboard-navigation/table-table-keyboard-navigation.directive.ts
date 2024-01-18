import {
    Directive,
    OnDestroy,
    OnInit,
    ChangeDetectorRef,
    ElementRef,
    HostListener,
    AfterViewInit,
  } from '@angular/core';
  import { BaseWidget } from 'src/app/common/widget/base-widget';
  import {
    cell,
    initTableKeyboardNavigationLogic,
  } from './tableKeyboardNavigationLogic';
  
  @Directive({
    selector: '[tableKeyBoardNavigation]',
    inputs: ['id', 'parent'],
  })
  export class TableKeyBoardNavigationDirective
    extends BaseWidget
    implements OnDestroy, OnInit, AfterViewInit
  {
    #_selfEl: HTMLTableElement;
    #_onTableFocus: (ev: FocusEvent) => void;
    #_handleKeyDown: (ev: KeyboardEvent) => cell;
  
    @HostListener('focusin', ['$event']) onFocusIn(event: FocusEvent) {
      this.#_onTableFocus(event);
    }
  
    @HostListener('keydown', ['$event']) onKeydown(event: KeyboardEvent) {
      this.#_handleKeyDown(event);
    }
  
    constructor(selfEle: ElementRef, private cdRef: ChangeDetectorRef) {
      super();
      this.#_selfEl = selfEle.nativeElement;
    }
  
    private _assignFunctions() {
      const { onTableFocus, handleKeyDown } = initTableKeyboardNavigationLogic(
        this.#_selfEl
      );
      this.#_handleKeyDown = handleKeyDown;
      this.#_onTableFocus = onTableFocus;
    }
  
    protected syncChangesToView(t: any): void {
      this.cdRef.detectChanges();
    }
  
    ngOnInit(): void {
      this.id = this.id ?? `navigableTable`;
      super.onInit();
    }
  
    ngAfterViewInit() {
      super.afterViewInit();
      this._assignFunctions();
    }
  
    ngOnDestroy(): void {
      super.onDestroy();
    }
  }
  