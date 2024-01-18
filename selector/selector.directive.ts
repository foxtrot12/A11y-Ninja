import {
  Directive,
  HostBinding,
  Input,
  Output,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { handleSelection } from "./selectorLogic";
import { Subject, Subscription } from "rxjs";

export const selectedSelectee$ = new Subject<any>();

@Directive({
  selector: "[selector]",
})
export class SelectorDirective implements OnDestroy, OnInit {
  @Input() isMultiselect: boolean = false;
  @Input() deselectOnClick: boolean = false;
  @Output() selectionChanged = new EventEmitter<{
    allSelected: any;
    latestSelected: any;
  }>();

  #_selected: any | any[] = null;
  #_selecteeSubs: Subscription;

  constructor() {}

  @HostBinding("attr.aria-multiselectable") get multiselectable(): string {
    return this.isMultiselect ? "true" : "false";
  }

  private onSelection(value: any) {
    this.#_selected = handleSelection(
      value,
      this.isMultiselect,
      this.#_selected,
      this.deselectOnClick
    );
    this.customEvent.emit({
      allSelected: this.#_selected,
      latestSelected: value,
    });
  }

  ngOnInit(): void {
    this.#_selecteeSubs = selectedSelectee$.subscribe((val) => {
      if (val) {
        this.onSelection(val);
      }
    });
  }

  ngOnDestroy(): void {
    this.#_selecteeSubs.unsubscribe();
  }
}
