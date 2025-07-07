import {Directive, HostBinding, HostListener, Input} from '@angular/core';
import {Menu} from "./menu";

@Directive({
    selector: '[appMenuTrigger]',
    standalone: true
})
export class MenuTrigger {
    @Input('appMenuTriggerFor') menu!: Menu

    @HostBinding('class') className =
        'cursor-pointer';

    @HostListener('click', ['$event'])
    onClick(event: MouseEvent) {
        event.stopPropagation()
        event.preventDefault()

        const target = event.target as HTMLElement
        this.menu.open(target)
    }

}
