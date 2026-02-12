import {Component, OnInit} from '@angular/core';
import {
  ArrowLeftIcon,
  CheckCircle2Icon,
  FlameIcon,
  HomeIcon,
  InfoIcon,
  LucideAngularModule,
  MapPinIcon,
  RulerIcon,
  SettingsIcon,
  TagIcon
} from 'lucide-angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Property} from '../../../model/property/property';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Dropdown} from '../../layout/components/dropdown/dropdown';
import {Checkbox} from '../../layout/components/checkbox/checkbox';
import {TextArea} from '../../layout/components/text-area/text-area';
import {Address} from '../../../model/shared/address';
import {PropertyService} from '../../../service/property-service';
import {NgClass} from '@angular/common';
import {EditPropertySkeleton} from './edit-property-skeleton/edit-property-skeleton';
import {combineLatest, take, timer} from 'rxjs';

interface FormStep {
  key: string;
  title: string;
  subtitle: string;
  groups: string[];
}

@Component({
  selector: 'app-edit-property',
  imports: [
    LucideAngularModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    TextInput,
    Dropdown,
    Checkbox,
    TextArea,
    NgClass,
    EditPropertySkeleton
  ],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.scss'
})
export class EditProperty implements OnInit {
  propertyForm!: FormGroup;
  property: Property | undefined = undefined;

  readonly steps: FormStep[] = [
    {
      key: 'basics',
      title: 'Infos principales',
      subtitle: '',
      groups: ['general']
    },
    {
      key: 'address',
      title: 'Adresse',
      subtitle: '',
      groups: ['address']
    },
    {
      key: 'surfaces',
      title: 'Surfaces',
      subtitle: '',
      groups: ['surface']
    },
    {
      key: 'energy',
      title: 'Energie',
      subtitle: '',
      groups: ['energy', 'features', 'additionalInformation']
    }
  ];

  currentStepIndex = 0;
  furthestReachedStepIndex = 0;

  heatingOptions = [
    {key: 'GAS', label: 'Gaz'},
    {key: 'FUEL', label: 'Fioul'},
    {key: 'ELECTRIC', label: 'Electrique'},
    {key: 'HEAT_PUMP', label: 'Pompe a chaleur'},
    {key: 'WOOD', label: 'Bois'},
    {key: 'DISTRICT', label: 'Reseau urbain'},
    {key: 'SOLAR', label: 'Solaire'},
    {key: 'OTHER', label: 'Autre'}
  ];
  heatingDistributions = [
    {key: 'RADIATORS', label: 'Radiateurs'},
    {key: 'UNDERFLOOR', label: 'Plancher chauffant'},
    {key: 'AIR_BLOWER', label: 'Soufflage air chaud'},
    {key: 'WALL_HEATING', label: 'Chauffage mural'},
    {key: 'CEILING', label: 'Plafond chauffant'},
    {key: 'STOVES', label: 'Poeles'},
    {key: 'INDIVIDUAL_UNITS', label: 'Unites individuelles'},
    {key: 'OTHER', label: 'Autre'}
  ];
  propertyTypes = [
    {key: 'STUDIO', label: 'Studio'},
    {key: 'APARTMENT', label: 'Appartement'},
    {key: 'HOUSE', label: 'Maison'},
    {key: 'DUPLEX', label: 'Duplex'},
    {key: 'VILLA', label: 'Villa'},
    {key: 'ROOM', label: 'Chambre'},
    {key: 'COMMERCIAL', label: 'Local commercial'},
    {key: 'LAND', label: 'Terrain'},
    {key: 'OTHER', label: 'Autre'},
  ];
  energyLabels = [
    {key: 'A', label: 'A - Tres performant'},
    {key: 'B', label: 'B - Performant'},
    {key: 'C', label: 'C - Correct'},
    {key: 'D', label: 'D - Passable'},
    {key: 'E', label: 'E - Faible'},
    {key: 'F', label: 'F - Tres faible'},
    {key: 'G', label: 'G - Extremement faible'}
  ];
  featuresOptions = [
    {key: 'elevator', label: 'Ascenseur'},
    {key: 'balcony', label: 'Balcon'},
    {key: 'terrace', label: 'Terrasse'},
    {key: 'garden', label: 'Jardin'},
    {key: 'cellar', label: 'Cave'},
    {key: 'garage', label: 'Garage'},
    {key: 'parking', label: 'Place de parking'},
    {key: 'attic', label: 'Grenier'},
    {key: 'accessible', label: 'Accessible PMR'},
    {key: 'intercom', label: 'Interphone'},
    {key: 'swimmingPool', label: 'Piscine'},
    {key: 'fireplace', label: 'Cheminee'}
  ];
  cantons = [
    {key: 'AG', label: 'Argovie'},
    {key: 'AI', label: 'Appenzell Rhodes-Interieures'},
    {key: 'AR', label: 'Appenzell Rhodes-Exterieures'},
    {key: 'BE', label: 'Berne'},
    {key: 'BL', label: 'Bale-Campagne'},
    {key: 'BS', label: 'Bale-Ville'},
    {key: 'FR', label: 'Fribourg'},
    {key: 'GE', label: 'Geneve'},
    {key: 'GL', label: 'Glaris'},
    {key: 'GR', label: 'Grisons'},
    {key: 'JU', label: 'Jura'},
    {key: 'LU', label: 'Lucerne'},
    {key: 'NE', label: 'Neuchatel'},
    {key: 'NW', label: 'Nidwald'},
    {key: 'OW', label: 'Obwald'},
    {key: 'SG', label: 'Saint-Gall'},
    {key: 'SH', label: 'Schaffhouse'},
    {key: 'SO', label: 'Soleure'},
    {key: 'SZ', label: 'Schwyz'},
    {key: 'TG', label: 'Thurgovie'},
    {key: 'TI', label: 'Tessin'},
    {key: 'UR', label: 'Uri'},
    {key: 'VD', label: 'Vaud'},
    {key: 'VS', label: 'Valais'},
    {key: 'ZG', label: 'Zoug'},
    {key: 'ZH', label: 'Zurich'}
  ];

  propertyId: string | null = null;
  loading = true;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly RulerIcon = RulerIcon;
  protected readonly TagIcon = TagIcon;
  protected readonly SettingsIcon = SettingsIcon;
  protected readonly FlameIcon = FlameIcon;
  protected readonly InfoIcon = InfoIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly CheckCircle2Icon = CheckCircle2Icon;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly propertyRepository: PropertyService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.propertyId = this.route.snapshot.paramMap.get('id');
    if (this.propertyId) {
      combineLatest([
        this.propertyRepository.findById(this.propertyId),
        timer(500)
      ]).pipe(take(1))
        .subscribe(([property]) => {
          this.property = property;
          this.loading = false;
          this.initForm();
        });
    } else {
      this.loading = false;
    }
  }

  get currentStep(): FormStep {
    return this.steps[this.currentStepIndex];
  }

  get progressPercentage(): number {
    if (this.steps.length <= 1) {
      return 100;
    }
    return (this.currentStepIndex / (this.steps.length - 1)) * 100;
  }

  get saveButtonLabel(): string {
    return this.propertyId ? 'Enregistrer les modifications' : 'Creer le bien';
  }

  get reviewAddressLabel(): string {
    const address = this.buildAddressFromForm();
    return [address.label, address.zipCode, address.city].filter(Boolean).join(' - ');
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
  }

  isStepCompleted(index: number): boolean {
    return this.getStepGroups(index).every((groupName) => this.propertyForm.get(groupName)?.valid);
  }

  isStepAccessible(index: number): boolean {
    return index <= this.furthestReachedStepIndex;
  }

  selectStep(index: number): void {
    if (!this.isStepAccessible(index)) {
      return;
    }
    this.currentStepIndex = index;
  }

  previousStep(): void {
    if (this.currentStepIndex === 0) {
      return;
    }
    this.currentStepIndex--;
  }

  nextStep(): void {
    if (!this.isCurrentStepValid()) {
      this.markCurrentStepAsTouched();
      return;
    }
    if (!this.isLastStep()) {
      this.currentStepIndex++;
      this.furthestReachedStepIndex = Math.max(this.furthestReachedStepIndex, this.currentStepIndex);
    }
  }

  onPrimaryAction(): void {
    if (this.isLastStep()) {
      this.save();
      return;
    }
    this.nextStep();
  }

  save(): void {
    if (!this.propertyForm.valid) {
      this.propertyForm.markAllAsTouched();
      this.goToFirstInvalidStep();
      return;
    }

    if (this.propertyId) {
      this.update();
    } else {
      this.create();
    }
  }

  private goToFirstInvalidStep(): void {
    const firstInvalidStep = this.steps.findIndex((step) =>
      step.groups.some((groupName) => this.propertyForm.get(groupName)?.invalid)
    );

    if (firstInvalidStep >= 0) {
      this.currentStepIndex = firstInvalidStep;
      this.furthestReachedStepIndex = Math.max(this.furthestReachedStepIndex, firstInvalidStep);
    }
  }

  private isCurrentStepValid(): boolean {
    return this.getStepGroups(this.currentStepIndex).every((groupName) => this.propertyForm.get(groupName)?.valid);
  }

  private markCurrentStepAsTouched(): void {
    this.getStepGroups(this.currentStepIndex)
      .forEach((groupName) => this.markControlTreeAsTouched(this.propertyForm.get(groupName)));
  }

  private markControlTreeAsTouched(control: AbstractControl | null): void {
    if (!control) {
      return;
    }
    control.markAsTouched();
    const childControls = (control as FormGroup).controls;
    if (!childControls) {
      return;
    }
    Object.values(childControls).forEach((child) => this.markControlTreeAsTouched(child));
  }

  private getStepGroups(index: number): string[] {
    return this.steps[index]?.groups ?? [];
  }

  getOptionLabel(options: { key: string; label: string }[], key: string): string {
    const option = options.find((item) => item.key === key);
    return option?.label ?? key;
  }

  getSelectedFeaturesLabels(): string[] {
    const features = this.propertyForm.get('features')?.value;
    if (!features) {
      return [];
    }

    return this.featuresOptions
      .filter((feature) => features[feature.key])
      .map((feature) => feature.label);
  }

  private initForm(): void {
    this.propertyForm = this.fb.group({
      general: this.fb.group({
        name: [this.property?.name ?? '', Validators.required],
        type: [this.property?.type ?? '', Validators.required],
        rooms: [this.property?.rooms ?? '', Validators.required],
        bedrooms: [this.property?.bedrooms ?? ''],
        bathrooms: [this.property?.bathrooms ?? ''],
        toilets: [this.property?.toilets ?? ''],
      }),
      address: this.fb.group({
        street: [this.property?.address?.label ?? '', Validators.required],
        additional: [''],
        building: [''],
        floor: [''],
        zipCode: [this.property?.address?.zipCode ?? '', Validators.required],
        city: [this.property?.address?.city ?? '', Validators.required],
        state: [''],
        country: [this.property?.address?.country ?? 'CH']
      }),
      surface: this.fb.group({
        livingArea: [this.property?.livingArea ?? '', Validators.required],
        totalArea: [this.property?.totalArea ?? ''],
        landArea: [this.property?.landArea ?? ''],
        balconyArea: [this.property?.balconyArea ?? ''],
        terraceArea: [this.property?.terraceArea ?? ''],
        gardenArea: [this.property?.gardenArea ?? ''],
      }),
      energy: this.fb.group({
        yearOfConstruction: [this.property?.yearOfConstruction ?? ''],
        yearOfRenovation: [this.property?.yearOfRenovation ?? ''],
        heatingType: [this.property?.heatingType ?? '', Validators.required],
        heatingDistribution: [this.property?.heatingDistribution ?? ''],
        energyLabel: [this.property?.energyLabel ?? '']
      }),
      features: this.fb.group({
        elevator: [this.property?.features?.elevator ?? false],
        balcony: [this.property?.features?.balcony ?? false],
        terrace: [this.property?.features?.terrace ?? false],
        garden: [this.property?.features?.garden ?? false],
        cellar: [this.property?.features?.cellar ?? false],
        garage: [this.property?.features?.garage ?? false],
        parking: [this.property?.features?.parking ?? false],
        attic: [this.property?.features?.attic ?? false],
        accessible: [this.property?.features?.accessible ?? false],
        intercom: [this.property?.features?.intercom ?? false],
        swimmingPool: [this.property?.features?.swimmingPool ?? false],
        fireplace: [this.property?.features?.fireplace ?? false]
      }),
      additionalInformation: this.fb.group({
        description: [this.property?.description ?? ''],
      })
    });
  }

  private create(): void {
    const property: Property = this.buildPropertyFromForm();
    this.propertyRepository.create(property).subscribe(() => {
      this.router.navigate(['/properties']).then();
    });
  }

  private update(): void {
    const property: Property = this.buildPropertyFromForm();
    property.id = this.property?.id ?? '';
    this.propertyRepository.update(property).subscribe(() => {
      this.router.navigate(['/properties']).then();
    });
  }

  private buildAddressFromForm(): Address {
    const street = this.propertyForm.get('address.street')?.value;
    const additional = this.propertyForm.get('address.additional')?.value;
    const building = this.propertyForm.get('address.building')?.value;
    const floor = this.propertyForm.get('address.floor')?.value;
    const state = this.propertyForm.get('address.state')?.value;
    const labelParts = [street, additional, building, floor, state].filter((value) => !!value);

    return {
      label: labelParts.length ? labelParts.join(', ') : undefined,
      zipCode: this.propertyForm.get('address.zipCode')?.value,
      city: this.propertyForm.get('address.city')?.value,
      country: 'CH'
    } as Address;
  }

  private buildPropertyFromForm(): Property {
    const general = this.propertyForm.get('general')?.value;
    const surface = this.propertyForm.get('surface')?.value;
    const energy = this.propertyForm.get('energy')?.value;
    const features = this.propertyForm.get('features')?.value;
    const additionalInfo = this.propertyForm.get('additionalInformation')?.value;

    return {
      accountId: 'auth0|697b6378eaa7c759f984bbc1',
      name: general.name,
      type: general.type,
      rooms: general.rooms,
      bedrooms: general.bedrooms,
      bathrooms: general.bathrooms,
      toilets: general.toilets,
      address: this.buildAddressFromForm(),
      livingArea: surface.livingArea,
      totalArea: surface.totalArea,
      landArea: surface.landArea,
      balconyArea: surface.balconyArea,
      terraceArea: surface.terraceArea,
      gardenArea: surface.gardenArea,
      yearOfConstruction: energy.yearOfConstruction,
      yearOfRenovation: energy.yearOfRenovation,
      energyLabel: energy.energyLabel,
      heatingType: energy.heatingType,
      heatingDistribution: energy.heatingDistribution,
      features: features,
      description: additionalInfo.description
    } as Property;
  }
}
