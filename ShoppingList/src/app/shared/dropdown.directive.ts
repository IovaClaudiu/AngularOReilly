import {
  Directive,
  HostListener,
  HostBinding,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  open: boolean = false;

  @HostListener('click') toggleOpen() {
    this.open = !this.open;
    if (this.open)
      this.elementRef.nativeElement.children[0].children[1].classList.add(
        'show'
      );
    else {
      this.elementRef.nativeElement.children[0].children[1].classList.remove(
        'show'
      );
    }
  }

  constructor(private elementRef: ElementRef) {}
}
