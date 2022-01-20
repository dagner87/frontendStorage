import {
  Directive,
  HostListener,
  Output,
  EventEmitter,
  ElementRef,
} from '@angular/core';

@Directive({
  selector: '[appNgDropFiles]',
})
export class NgDropFilesDirective {
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener('drop', ['$event'])
  public onMouseEnter(event: any) {
    console.log('el mouse entro', event);
    this.mouseSobre.emit(true);
  }
}
