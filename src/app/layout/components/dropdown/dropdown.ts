import {Component, forwardRef, Injector, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
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
export class Dropdown implements ControlValueAccessor, OnInit {
  @Input() label = '';
  @Input() placeholder = 'Sélectionner...';
  @Input() options: DropdownOption[] = [];

  value: string | null = null;
  isDisabled = false;

  private ngControl?: NgControl | null;

  constructor(private readonly injector: Injector) {
  }


  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, {self: true});
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

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

  isRequired(): boolean {
    const control = this.ngControl?.control;
    return control?.validator?.({} as AbstractControl)?.['required'] ?? false;
  }

}
