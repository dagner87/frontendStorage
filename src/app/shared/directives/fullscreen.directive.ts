import { Directive, HostListener } from '@angular/core';

import { Screenfull } from 'screenfull';
import * as screenfull from 'screenfull';

@Directive({
  selector: '[toggleFullscreen]',
})
export class ToggleFullscreenDirective {
  public screenfull: Screenfull;
  @HostListener('click') onClick() {
    if ((<Screenfull>screenfull).isEnabled) {
      console.log('Directiva Fullscreen funciona');

      (<Screenfull>screenfull).toggle();
    }
  }
}
