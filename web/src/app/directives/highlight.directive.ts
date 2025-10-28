import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  constructor(private el: ElementRef) { }

  @HostListener('focus') onFocus() {
    this.highlight('grey');
  }

  @HostListener('blur') onBlur() {
  this.highlight('white'); //TODO: unless the input is wrong
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
