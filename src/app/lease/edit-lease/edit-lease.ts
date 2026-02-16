import {Component, OnInit} from '@angular/core';
import {ArrowLeftIcon, LucideAngularModule} from 'lucide-angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {EditPropertySkeleton} from '../../properties/edit-property/edit-property-skeleton/edit-property-skeleton';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {LeaseService} from '../../../service/lease.service';
import {Contractor} from '../../../model/lease/contractor';
import {Lease} from '../../../model/lease/lease';
import {Dropdown} from '../../layout/components/dropdown/dropdown';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Checkbox} from '../../layout/components/checkbox/checkbox';
import {combineLatest, take, timer} from 'rxjs';

@Component({
  selector: 'app-edit-lease',
  imports: [
    EditPropertySkeleton,
    LucideAngularModule,
    RouterLink,
    ReactiveFormsModule,
    Dropdown,
    TextInput,
    Checkbox
  ],
  templateUrl: './edit-lease.html'
})
export class EditLease implements OnInit {
  leaseForm!: FormGroup;
  lease: Lease | undefined;
  loading = true;
  propertyId: string | null = null;
  leaseId: string | null = null;

  readonly currencyOptions = [
    {key: 'CHF', label: 'CHF'},
    {key: 'EUR', label: 'EUR'}
  ];

  readonly paymentFrequencyOptions = [
    {key: 'MONTHLY', label: 'Mensuel'},
    {key: 'QUARTERLY', label: 'Trimestriel'},
    {key: 'YEARLY', label: 'Annuel'}
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly leaseService: LeaseService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('propertyId');
    this.leaseId = this.route.snapshot.paramMap.get('leaseId');

    if (!this.leaseId) {
      this.loading = false;
      return;
    }

    combineLatest([
      this.leaseService.findById(this.leaseId),
      timer(350)
    ]).pipe(take(1))
      .subscribe({
        next: ([lease]) => {
          this.lease = lease;
          this.leaseForm.patchValue({
            startDate: this.toDateInputValue(lease.startDate),
            endDate: this.toDateInputValue(lease.endDate),
            furnished: !!lease.furnished,
            rentAmount: lease.rentAmount ?? '',
            rentCurrency: lease.rentCurrency ?? 'CHF',
            paymentFrequency: lease.paymentFrequency ?? 'MONTHLY',
            securityDeposit: lease.securityDeposit ?? ''
          });
          this.setContractors('tenants', lease.tenants);
          this.setContractors('landlords', lease.landlords);
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
  }

  get title(): string {
    return this.leaseId ? 'Modifier les informations du bail' : 'Nouveau bail';
  }

  save(): void {
    if (!this.leaseForm.valid) {
      this.leaseForm.markAllAsTouched();
      return;
    }

    if (!this.leaseId && !this.propertyId) {
      return;
    }

    const lease = this.buildLeaseFromForm();
    if (this.leaseId) {
      lease.id = this.leaseId;
      this.leaseService.update(lease).pipe(take(1)).subscribe(() => {
        this.router.navigate(['/properties', this.propertyId]).then();
      });
      return;
    }

    this.leaseService.create(lease).pipe(take(1)).subscribe(() => {
      this.router.navigate(['/properties', this.propertyId]).then();
    });
  }

  private initForm(): void {
    this.leaseForm = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      furnished: [false],
      rentAmount: ['', Validators.required],
      rentCurrency: ['CHF', Validators.required],
      paymentFrequency: ['MONTHLY', Validators.required],
      securityDeposit: [''],
      tenants: this.fb.array([]),
      landlords: this.fb.array([])
    });
    this.addTenant();
    this.addLandlord();
  }

  get tenants(): FormArray<FormGroup> {
    return this.leaseForm.get('tenants') as FormArray<FormGroup>;
  }

  get landlords(): FormArray<FormGroup> {
    return this.leaseForm.get('landlords') as FormArray<FormGroup>;
  }

  addTenant(): void {
    this.tenants.push(this.createContractorGroup());
  }

  removeTenant(index: number): void {
    if (this.tenants.length > 1) {
      this.tenants.removeAt(index);
    }
  }

  addLandlord(): void {
    this.landlords.push(this.createContractorGroup());
  }

  removeLandlord(index: number): void {
    if (this.landlords.length > 1) {
      this.landlords.removeAt(index);
    }
  }

  private createContractorGroup(contractor?: Contractor): FormGroup {
    return this.fb.group({
      firstName: [contractor?.firstName ?? ''],
      lastName: [contractor?.lastName ?? ''],
      email: [contractor?.email ?? ''],
      phoneNumber: [contractor?.phoneNumber ?? '']
    });
  }

  private setContractors(kind: 'tenants' | 'landlords', contractors?: Contractor[]): void {
    const target = kind === 'tenants' ? this.tenants : this.landlords;
    target.clear();
    if (!contractors?.length) {
      target.push(this.createContractorGroup());
      return;
    }
    contractors.forEach((contractor) => target.push(this.createContractorGroup(contractor)));
  }

  private toDateInputValue(dateTime?: string): string {
    if (!dateTime) {
      return '';
    }

    const parsedDate = new Date(dateTime);
    if (Number.isNaN(parsedDate.getTime())) {
      return '';
    }

    return parsedDate.toISOString().substring(0, 10);
  }

  private toIsoDateTime(dateInput: string): string {
    return new Date(`${dateInput}T00:00:00.000Z`).toISOString();
  }

  private buildContractors(kind: 'tenants' | 'landlords'): Contractor[] {
    const controls = kind === 'tenants' ? this.tenants.controls : this.landlords.controls;
    return controls
      .map((control) => control.value as Contractor)
      .filter((contractor) => !!contractor.firstName || !!contractor.lastName || !!contractor.email || !!contractor.phoneNumber);
  }

  private buildLeaseFromForm(): Lease {
    const propertyId = this.lease?.propertyId ?? this.propertyId ?? '';

    return {
      propertyId,
      startDate: this.toIsoDateTime(this.leaseForm.get('startDate')?.value),
      endDate: this.toIsoDateTime(this.leaseForm.get('endDate')?.value),
      furnished: !!this.leaseForm.get('furnished')?.value,
      rentAmount: Number(this.leaseForm.get('rentAmount')?.value),
      rentCurrency: this.leaseForm.get('rentCurrency')?.value,
      paymentFrequency: this.leaseForm.get('paymentFrequency')?.value,
      securityDeposit: this.leaseForm.get('securityDeposit')?.value ? Number(this.leaseForm.get('securityDeposit')?.value) : 0,
      status: this.leaseId ? (this.lease?.status ?? 'DRAFT') : 'DRAFT',
      tenants: this.buildContractors('tenants'),
      landlords: this.buildContractors('landlords')
    };
  }

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
}
