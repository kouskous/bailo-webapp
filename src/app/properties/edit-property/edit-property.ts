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
  TagIcon,
  UsersIcon
} from 'lucide-angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {Property} from '../../../model/property/property';
import {Contractor} from '../../../model/lease/contractor';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Dropdown} from '../../layout/components/dropdown/dropdown';
import {Checkbox} from '../../layout/components/checkbox/checkbox';
import {TextArea} from '../../layout/components/text-area/text-area';
import {Address} from '../../../model/shared/address';
import {PropertyService} from '../../../service/property-service';
import {EditPropertySkeleton} from './edit-property-skeleton/edit-property-skeleton';
import {combineLatest, take, timer} from 'rxjs';
import {AuthService} from '@auth0/auth0-angular';
import {AddressAutocompleteService} from '../../../service/address-autocomplete.service';
import {AddressAutocompleteSuggestion} from '../../../model/shared/address-autocomplete';

interface FormStep {
  key: string;
  title: string;
  subtitle: string;
  groups: string[];
  icon: 'home' | 'users' | 'map' | 'ruler' | 'tag' | 'flame' | 'settings' | 'info' | 'check';
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
      key: 'identity',
      title: 'Commencons simplement: quel bien voulez-vous ajouter ?',
      subtitle: 'Donnez-lui un nom clair et choisissez son type.',
      groups: ['generalIdentity'],
      icon: 'home'
    },
    {
      key: 'owners',
      title: 'Qui sont les proprietaires de ce bien ?',
      subtitle: 'Ces informations seront reutilisees automatiquement dans les baux et documents.',
      groups: ['landlords'],
      icon: 'users'
    },
    {
      key: 'address',
      title: 'Ou se situe ce bien ?',
      subtitle: 'Une adresse precise permet de mieux organiser vos baux ensuite.',
      groups: ['address'],
      icon: 'map'
    },
    {
      key: 'layout',
      title: 'Comment est organise le logement ?',
      subtitle: 'Quelques chiffres pour decrire les pieces.',
      groups: ['generalLayout'],
      icon: 'ruler'
    },
    {
      key: 'surface',
      title: 'Parlons surfaces',
      subtitle: 'La surface habitable est obligatoire, le reste est optionnel.',
      groups: ['surface'],
      icon: 'tag'
    },
    {
      key: 'energy',
      title: 'Chauffage et energie',
      subtitle: 'Ces informations sont utiles pour vos contrats et le suivi.',
      groups: ['energy'],
      icon: 'flame'
    },
    {
      key: 'features',
      title: 'Quels equipements sont disponibles ?',
      subtitle: 'Selectionnez tout ce qui s applique.',
      groups: ['features'],
      icon: 'settings'
    },
    {
      key: 'description',
      title: 'Derniere touche',
      subtitle: 'Ajoutez une description libre avant validation.',
      groups: ['additionalInformation'],
      icon: 'info'
    }
  ];

  currentStepIndex = 0;

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
  accountId = '';
  addressSearch = '';
  addressSuggestions: AddressAutocompleteSuggestion[] = [];
  addressLookupLoading = false;
  addressDetailsLoading = false;
  addressLookupError = '';
  showAddressForm = false;
  private addressAutocompleteDebounceTimer: ReturnType<typeof setTimeout> | null = null;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;
  protected readonly MapPinIcon = MapPinIcon;
  protected readonly RulerIcon = RulerIcon;
  protected readonly TagIcon = TagIcon;
  protected readonly SettingsIcon = SettingsIcon;
  protected readonly FlameIcon = FlameIcon;
  protected readonly InfoIcon = InfoIcon;
  protected readonly HomeIcon = HomeIcon;
  protected readonly CheckCircle2Icon = CheckCircle2Icon;
  protected readonly UsersIcon = UsersIcon;

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly propertyRepository: PropertyService,
    private readonly auth: AuthService,
    private readonly addressAutocompleteService: AddressAutocompleteService
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((user) => {
      this.accountId = user?.sub ?? '';
    });

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
    return ((this.currentStepIndex + 1) / this.steps.length) * 100;
  }

  get saveButtonLabel(): string {
    return this.propertyId ? 'Enregistrer les modifications' : 'Creer le bien';
  }

  get reviewAddressLabel(): string {
    const address = this.buildAddressFromForm();
    return [address.label, address.zipCode, address.city].filter(Boolean).join(' - ');
  }

  get currentStepIcon() {
    switch (this.currentStep.icon) {
      case 'home':
        return this.HomeIcon;
      case 'map':
        return this.MapPinIcon;
      case 'users':
        return this.UsersIcon;
      case 'ruler':
        return this.RulerIcon;
      case 'tag':
        return this.TagIcon;
      case 'flame':
        return this.FlameIcon;
      case 'settings':
        return this.SettingsIcon;
      case 'check':
        return this.CheckCircle2Icon;
      default:
        return this.InfoIcon;
    }
  }

  isLastStep(): boolean {
    return this.currentStepIndex === this.steps.length - 1;
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
    }
  }

  isCurrentStepValid(): boolean {
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

  get landlords(): FormArray<FormGroup> {
    return this.propertyForm.get('landlords') as FormArray<FormGroup>;
  }

  addLandlord(): void {
    this.landlords.push(this.createContractorGroup());
  }

  removeLandlord(index: number): void {
    if (this.landlords.length > 1) {
      this.landlords.removeAt(index);
    }
  }

  private initForm(): void {
    this.propertyForm = this.fb.group({
      generalIdentity: this.fb.group({
        name: [this.property?.name ?? '', Validators.required],
        type: [this.property?.type ?? '', Validators.required]
      }),
      landlords: this.fb.array([]),
      generalLayout: this.fb.group({
        rooms: [this.property?.rooms ?? '', Validators.required],
        bedrooms: [this.property?.bedrooms ?? ''],
        bathrooms: [this.property?.bathrooms ?? ''],
        toilets: [this.property?.toilets ?? '']
      }),
      address: this.fb.group({
        street: [this.property?.address?.label ?? '', Validators.required],
        additional: [''],
        building: [''],
        floor: [''],
        zipCode: [this.property?.address?.zipCode ?? '', Validators.required],
        city: [this.property?.address?.city ?? '', Validators.required],
        state: [this.property?.address?.canton ?? ''],
        country: [this.property?.address?.country ?? 'CH'],
        latitude: [this.property?.address?.latitude ?? ''],
        longitude: [this.property?.address?.longitude ?? '']
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

    this.addressSearch = this.property?.address?.label ?? '';
    this.showAddressForm = !!(this.property?.address?.label || this.property?.address?.zipCode || this.property?.address?.city);
    this.addressLookupError = '';
    this.addressSuggestions = [];
    this.setLandlords(this.property?.landlords);
  }

  onAddressSearchInput(event: Event): void {
    const input = (event.target as HTMLInputElement).value ?? '';
    this.addressSearch = input;
    this.addressLookupError = '';
    this.addressSuggestions = [];
    this.showAddressForm = false;
    this.addressLookupLoading = false;

    if (this.addressAutocompleteDebounceTimer) {
      clearTimeout(this.addressAutocompleteDebounceTimer);
      this.addressAutocompleteDebounceTimer = null;
    }

    const query = input.trim();
    if (query.length < 3) {
      return;
    }

    this.addressLookupLoading = true;
    this.addressAutocompleteDebounceTimer = setTimeout(() => {
      this.addressAutocompleteService.autocomplete(query).pipe(take(1)).subscribe({
        next: (suggestions) => {
          this.addressSuggestions = suggestions ?? [];
          this.addressLookupLoading = false;
        },
        error: () => {
          this.addressSuggestions = [];
          this.addressLookupLoading = false;
          this.addressLookupError = 'Impossible de recuperer les suggestions pour le moment.';
        }
      });
    }, 300);
  }

  selectAddressSuggestion(suggestion: AddressAutocompleteSuggestion): void {
    if (!suggestion?.placeId) {
      return;
    }
    this.addressSearch = suggestion.description ?? '';
    this.addressSuggestions = [];
    this.addressLookupError = '';
    this.addressDetailsLoading = true;

    this.addressAutocompleteService.getDetails(suggestion.placeId).pipe(take(1)).subscribe({
      next: (address) => {
        this.patchAddressForm(address, suggestion);
        this.addressDetailsLoading = false;
        this.showAddressForm = true;
      },
      error: () => {
        this.addressDetailsLoading = false;
        this.addressLookupError = 'Adresse non resolue. Vous pouvez la saisir manuellement.';
        this.showAddressForm = true;
        this.patchAddressForm(undefined, suggestion);
      }
    });
  }

  enableManualAddressEntry(): void {
    this.addressSuggestions = [];
    this.addressLookupError = '';
    this.showAddressForm = true;
    if (!this.propertyForm.get('address.street')?.value && this.addressSearch.trim()) {
      this.propertyForm.patchValue({
        address: {
          street: this.addressSearch.trim()
        }
      });
    }
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
      canton: state || undefined,
      country: this.propertyForm.get('address.country')?.value ?? 'CH',
      latitude: this.toOptionalNumber(this.propertyForm.get('address.latitude')?.value),
      longitude: this.toOptionalNumber(this.propertyForm.get('address.longitude')?.value)
    } as Address;
  }

  private patchAddressForm(address: Address | undefined, suggestion?: AddressAutocompleteSuggestion): void {
    const fallbackStreet = suggestion?.mainText || suggestion?.description || this.addressSearch;
    this.propertyForm.patchValue({
      address: {
        street: address?.label ?? fallbackStreet ?? '',
        zipCode: address?.zipCode ?? '',
        city: address?.city ?? '',
        state: address?.canton ?? '',
        country: address?.country ?? 'CH',
        latitude: address?.latitude ?? '',
        longitude: address?.longitude ?? ''
      }
    });
  }

  private toOptionalNumber(value: unknown): number | undefined {
    if (value === null || value === undefined || value === '') {
      return undefined;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  private createContractorGroup(contractor?: Contractor): FormGroup {
    return this.fb.group({
      firstName: [contractor?.firstName ?? ''],
      lastName: [contractor?.lastName ?? ''],
      email: [contractor?.email ?? ''],
      phoneNumber: [contractor?.phoneNumber ?? '']
    });
  }

  private setLandlords(landlords?: Contractor[]): void {
    const target = this.landlords;
    target.clear();
    if (!landlords?.length) {
      target.push(this.createContractorGroup());
      return;
    }
    landlords.forEach((contractor) => target.push(this.createContractorGroup(contractor)));
  }

  private buildLandlords(): Contractor[] {
    return this.landlords.controls
      .map((control) => control.value as Contractor)
      .filter((contractor) => !!contractor.firstName || !!contractor.lastName || !!contractor.email || !!contractor.phoneNumber);
  }

  private buildPropertyFromForm(): Property {
    const generalIdentity = this.propertyForm.get('generalIdentity')?.value;
    const generalLayout = this.propertyForm.get('generalLayout')?.value;
    const surface = this.propertyForm.get('surface')?.value;
    const energy = this.propertyForm.get('energy')?.value;
    const features = this.propertyForm.get('features')?.value;
    const additionalInfo = this.propertyForm.get('additionalInformation')?.value;

    return {
      accountId: this.accountId || this.property?.accountId || '',
      name: generalIdentity.name,
      type: generalIdentity.type,
      landlords: this.buildLandlords(),
      rooms: generalLayout.rooms,
      bedrooms: generalLayout.bedrooms,
      bathrooms: generalLayout.bathrooms,
      toilets: generalLayout.toilets,
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

