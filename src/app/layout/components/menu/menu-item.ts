import {Directive, HostBinding, Input} from '@angular/core';

@Directive({
  selector: '[appMenuItem]'
})
export class MenuItem {
  @Input() icon = ''

  @HostBinding('class') className =
    'h-12 flex items-center w-full gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded transition cursor-pointer';

  constructor() {}
}
