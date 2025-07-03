import {Component, OnInit} from '@angular/core';
import {
  ArrowLeftIcon,
  FlameIcon,
  InfoIcon,
  LucideAngularModule,
  MapPinIcon,
  RulerIcon,
  SettingsIcon,
  TagIcon
} from 'lucide-angular';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Property} from '../../../model/property/property';
import {Lease} from '../../../model/lease/lease';
import {LeaseRepository} from '../../../repository/lease-repository';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Dropdown} from '../../layout/components/dropdown/dropdown';
import {Checkbox} from '../../layout/components/checkbox/checkbox';
import {TextArea} from '../../layout/components/text-area/text-area';
import {Address} from '../../../model/shared/address';
import {AddressRepository} from '../../../repository/address-repository';
import {PropertyRepository} from '../../../repository/property-repository';

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
    TextArea
  ],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.scss'
})
export class EditProperty implements OnInit {

  propertyForm!: FormGroup;
  property: Property | undefined = undefined;
  heatingOptions = [
    {key: 'GAS', label: 'Gaz'},
    {key: 'FUEL', label: 'Fioul'},
    {key: 'ELECTRIC', label: 'Électrique'},
    {key: 'HEAT_PUMP', label: 'Pompe à chaleur'},
    {key: 'WOOD', label: 'Bois'},
    {key: 'DISTRICT', label: 'Réseau urbain'},
    {key: 'SOLAR', label: 'Solaire'}
  ];
  heatingDistributions = [
    {key: 'RADIATORS', label: 'Radiateurs'},
    {key: 'UNDERFLOOR', label: 'Plancher chauffant'},
    {key: 'AIR_BLOWER', label: 'Soufflage d’air chaud'},
    {key: 'WALL_HEATING', label: 'Chauffage mural'},
    {key: 'CEILING', label: 'Plafond chauffant'},
    {key: 'STOVES', label: 'Poêles'},
    {key: 'INDIVIDUAL_UNITS', label: 'Unités individuelles'},
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
    {key: 'A', label: 'A - Très performant'},
    {key: 'B', label: 'B - Performant'},
    {key: 'C', label: 'C - Correct'},
    {key: 'D', label: 'D - Passable'},
    {key: 'E', label: 'E - Faible'},
    {key: 'F', label: 'F - Très faible'},
    {key: 'G', label: 'G - Extrêmement faible'}
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
    {key: 'fireplace', label: 'Cheminée'}
  ];
  cantons = [
    {key: 'AG', label: 'Argovie'},
    {key: 'AI', label: 'Appenzell Rhodes-Intérieures'},
    {key: 'AR', label: 'Appenzell Rhodes-Extérieures'},
    {key: 'BE', label: 'Berne'},
    {key: 'BL', label: 'Bâle-Campagne'},
    {key: 'BS', label: 'Bâle-Ville'},
    {key: 'FR', label: 'Fribourg'},
    {key: 'GE', label: 'Genève'},
    {key: 'GL', label: 'Glaris'},
    {key: 'GR', label: 'Grisons'},
    {key: 'JU', label: 'Jura'},
    {key: 'LU', label: 'Lucerne'},
    {key: 'NE', label: 'Neuchâtel'},
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


  leaseId: string | null = null;
  loading = true;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly leaseRepository: LeaseRepository,
              private readonly propertyRepository: PropertyRepository,
              private readonly addressRepository: AddressRepository) {
    this.initForm();
  }


  protected readonly MapPinIcon = MapPinIcon;
  protected readonly RulerIcon = RulerIcon;
  protected readonly TagIcon = TagIcon;
  protected readonly SettingsIcon = SettingsIcon;
  protected readonly FlameIcon = FlameIcon;
  protected readonly InfoIcon = InfoIcon;

  ngOnInit(): void {
    this.leaseId = this.route.snapshot.paramMap.get('id')
    if (this.leaseId) {
      this.leaseRepository.findById(this.leaseId).subscribe((lease: Lease) => {
        this.property = lease.property;
        this.loading = false;
        this.initForm();
      })
    }
  }

  save(): void {
    if (this.leaseId) {
      this.update();
    } else {
      this.create()
    }
  }

  private initForm(): void {
    this.propertyForm = this.fb.group({
      general: this.fb.group({
        name: [this.property?.name ?? '', Validators.required],
        type: [this.property?.type ?? '', Validators.required],
        rooms: [this.property?.rooms ?? '', Validators.required],
        bedrooms: [this.property?.bedrooms ?? '', Validators.required],
        bathrooms: [this.property?.bathrooms ?? '', Validators.required],
        toilets: [this.property?.toilets ?? '', Validators.required],
      }),
      address: this.fb.group({
        street: [this.property?.address?.street ?? ''],
        additional: [this.property?.address?.additional ?? ''],
        building: [this.property?.address?.building ?? ''],
        floor: [this.property?.address?.floor ?? ''],
        zipCode: [this.property?.address?.zipCode ?? ''],
        city: [this.property?.address?.city ?? ''],
        state: [this.property?.address?.state ?? ''],
        country: [this.property?.address?.country ?? '']
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
        heatingType: [this.property?.heatingType ?? ''],
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


  private create() {
    this.addressRepository.create(this.buildAddressFromForm())
      .subscribe((address: Address) => {
        const property: Property = this.buildPropertyFromForm();
        property.addressId = address.id;
        this.propertyRepository.create(property).subscribe((property: Property) => {
          this.leaseRepository.create({
            id: this.leaseId ?? crypto.randomUUID(),
            propertyId: property.id,
          } as Lease).subscribe((lease: Lease) => {
            this.router.navigate(['/lease', lease.id]).then();
          });
        })
      });
  }

  private update() {
  }

  private buildAddressFromForm(): Address {
    return {
      street: this.propertyForm.get('address.street')?.value,
      additional: this.propertyForm.get('address.additional')?.value,
      building: this.propertyForm.get('address.building')?.value,
      floor: this.propertyForm.get('address.floor')?.value,
      zipCode: this.propertyForm.get('address.zipCode')?.value,
      city: this.propertyForm.get('address.city')?.value,
      state: this.propertyForm.get('address.state')?.value,
      country: "CH"
    } as Address;
  }

  private buildPropertyFromForm(): Property {
    const general = this.propertyForm.get('general')?.value;
    const surface = this.propertyForm.get('surface')?.value;
    const energy = this.propertyForm.get('energy')?.value;
    const features = this.propertyForm.get('features')?.value;
    const additionalInfo = this.propertyForm.get('additionalInformation')?.value;

    return {
      id: this.property?.id ?? crypto.randomUUID(),
      name: general.name,
      type: general.type,
      rooms: general.rooms,
      bedrooms: general.bedrooms,
      bathrooms: general.bathrooms,
      toilets: general.toilets,
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
