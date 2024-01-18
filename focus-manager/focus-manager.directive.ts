import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
  } from '@angular/core';
  import { BaseWidget } from 'src/app/common/widget/base-widget';
  import { initLogic } from './focusManagerLogic';
  
  @Directive({
    selector: '[manageFocus]',
    inputs: ['id', 'parent'],
  })
  export class FocusManagerDirective
    extends BaseWidget
    implements OnDestroy, OnInit, AfterViewInit, OnChanges
  {
    @Input() domState: boolean;
    @Input() trapFocus: boolean = false;
    @Input() onEsc: Function | undefined;
    @Input() onFocusOutCb: Function | undefined;
  
    #_onFocusIn: (evt: FocusEvent) => void;
    #_onFocusOut: (evt: FocusEvent) => void;
    #_onKeyDown: (evt: KeyboardEvent) => void;
    #_garbageCollector: () => void;
  
    @HostListener('focusin', ['$event']) onFocusIn(event: FocusEvent) {
      this.#_onFocusIn(event);
    }
  
    @HostListener('focusout', ['$event']) onFocusOut(event: FocusEvent) {
      this.#_onFocusOut(event);
    }
  
    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
      this.#_onKeyDown(event);
    }
  
    constructor(private hostEl: ElementRef, private cdRef: ChangeDetectorRef) {
      super();
    }
  
    private _assignFunction() {
      this.#_garbageCollector ? this.#_garbageCollector() : null;
  
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
  
    protected syncChangesToView(t: any): void {
      this.cdRef.detectChanges();
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      if (changes.domState) {
        this._assignFunction();
      }
    }
  
    ngOnInit(): void {
      this.id = this.id ?? `focusManager`;
      super.onInit();
      this._assignFunction();
    }
  
    ngAfterViewInit() {
      super.afterViewInit();
    }
  
    ngOnDestroy(): void {
      super.onDestroy();
      this.#_garbageCollector();
    }
  }
  