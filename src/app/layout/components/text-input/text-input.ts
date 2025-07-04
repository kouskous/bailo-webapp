import {Component, forwardRef, Injector, Input, OnInit, Optional, Self} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInput),
      multi: true,
    },
  ],
})
export class TextInput implements ControlValueAccessor, OnInit {

  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'number' | 'text' | 'email' | 'password' = 'text';

  value = '';
  isDisabled = false;
  private ngControl?: NgControl | null;

  constructor(private readonly injector: Injector) {
  }

  ngOnInit(): void {
    this.ngControl = this.injector.get(NgControl, null, { self: true });
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  onChange = (value: any) => {};

  onTouched = () => {};

  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.value = inputValue;
    this.onChange(inputValue);
  }

  onBlur(): void {
    this.onTouched();
  }

  isRequired(): boolean {
    const control = this.ngControl?.control;
    return control?.validator?.({} as AbstractControl)?.['required'] ?? false;
  }

}
