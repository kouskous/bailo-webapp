import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {LucideAngularModule} from 'lucide-angular';
import {NgStyle} from '@angular/common';


export interface MenuItem {
  label: string
  icon: string
  action?: () => void
  route?: string
}


@Component({
  selector: 'app-menu',
  imports: [
    LucideAngularModule,
    NgStyle
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  exportAs: 'appMenu',
})
export class Menu {

  isOpen = false
  position = {top: 0, left: 0}

  @ViewChild('menuRef') menuRef!: ElementRef

  open(trigger: HTMLElement) {
    const rect = trigger.getBoundingClientRect()
    const menuWidth = 200
    const screenWidth = window.innerWidth
    let left = rect.left + window.scrollX
    if (rect.left + menuWidth > screenWidth) {
      left = rect.right - menuWidth + window.scrollX
    }
    this.position = {
      top: rect.bottom + window.scrollY + 4,
      left,
    }
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget | null) {
    if (!(target instanceof HTMLElement)) return
    if (this.isOpen && !this.menuRef?.nativeElement.contains(target)) {
      this.close()
    }
  }
}
