import {Component, forwardRef, Injector, Input, OnInit} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-text-input',
  imports: [
    NgClass
  ],
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
  errorMessage: any;

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
    this.setErrorMessage();
  }

  onBlur(): void {
    this.onTouched();
  }

  isRequired(): boolean {
    const control = this.ngControl?.control;
    return control?.validator?.({} as AbstractControl)?.['required'] ?? false;
  }

  private setErrorMessage() {
    this.errorMessage = '';
    if (this.ngControl?.errors){
      Object.keys(this.ngControl?.errors).forEach((errorKey) =>
        this.errorMessage = this.getMessage(errorKey, this.ngControl?.errors?.[errorKey])
      );
    }
  }

  private getMessage(type: string, value?: any): string {
    const messages: Record<string, (val?: any) => string> = {
      required: () => 'Ce champ est requis.',
      email: () => 'Email invalide.',
      minlength: (val) => `Minimum ${val.requiredLength} caractères.`,
      maxlength: (val) => `Maximum ${val.requiredLength} caractères.`,
      pattern: () => 'Format invalide.',
      min: (val) => `Valeur minimale : ${val.min}.`,
      max: (val) => `Valeur maximale : ${val.max}.`,
    };

    return messages[type]?.(value) || 'Champ invalide.';
  }
}
