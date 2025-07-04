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
  errorMessage: string = '';

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
