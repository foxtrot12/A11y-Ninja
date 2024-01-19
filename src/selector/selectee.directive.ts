import {
  AfterViewInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { SelectorDirective, selectedSelectee$ } from "./selector.directive";

@Directive({
  selector: "[selectee]",
})
export class SelecteeDirective implements OnDestroy {
  @Input() value: any;
  @Input() selectWithKeyboard: boolean = false;

  @HostBinding("attr.aria-selected") isSelected: boolean = false;

  @HostListener("click")
  onClick() {
    this._onSelection();
  }

  @HostListener("keydown", ["$event"])
  onKeydown(event: KeyboardEvent) {
    if (
      this.selectWithKeyboard &&
      (event.key === "Space" || event.key === " ")
    ) {
      this._onSelection();
    }
  }

  private _onSelection() {
    selectedSelectee$.next(this.value);
  }

  ngOnDestroy(): void {
    selectedSelectee$.complete();
  }
}
