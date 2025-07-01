import {Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DropdownOption} from './dropdown-option';


@Component({
  selector: 'app-dropdown',
  imports: [],
  templateUrl: './dropdown.html',
  styleUrl: './dropdown.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Dropdown),
      multi: true,
    },
  ],
})
export class Dropdown implements ControlValueAccessor {
  @Input() label = '';
  @Input() placeholder = 'Sélectionner...';
  @Input() options: DropdownOption[] = [];

  value: string | null = null;
  isDisabled = false;

  onChange = (value: any) => {
  };
  onTouched = () => {
  };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onSelect(event: Event): void {
    const selectedKey = (event.target as HTMLSelectElement).value;
    this.value = selectedKey;
    this.onChange(selectedKey);
  }

  onBlur(): void {
    this.onTouched();
  }

}
