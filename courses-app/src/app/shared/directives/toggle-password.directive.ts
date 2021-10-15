import {Directive, ElementRef, OnInit} from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'togglePassword'
})
export class TogglePasswordDirective implements OnInit {
  isShown: boolean = true;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.reCalculateInputType();
  }

  toggleInputText() {
    this.isShown = !this.isShown;
    this.reCalculateInputType();
    return this.isShown;
  }

  private reCalculateInputType() {
    this.isShown ? this.el.nativeElement.type = 'password' :
      this.el.nativeElement.type = 'text'
  }
}
