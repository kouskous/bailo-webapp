import {Component, OnInit} from '@angular/core';
import {
  ArrowLeftIcon,
  FlameIcon,
  InfoIcon,
  LucideAngularModule,
  MapPinIcon,
  RulerIcon,
  SaveIcon,
  SettingsIcon,
  TagIcon
} from 'lucide-angular';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Property} from '../../../model/property/property';
import {Lease} from '../../../model/lease/lease';
import {LeaseRepository} from '../../../repository/lease-repository';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Dropdown} from '../../layout/components/dropdown/dropdown';
import {Checkbox} from '../../layout/components/checkbox/checkbox';
import {TextArea} from '../../layout/components/text-area/text-area';

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
              private readonly leaseRepository: LeaseRepository) {
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

  private initForm(): void {
    this.propertyForm = this.fb.group({
      general: this.fb.group({
        name: [this.property?.name ?? '', Validators.required],
        type: [this.property?.type ?? '', Validators.required],
        rooms: [this.property?.roomDetails?.rooms ?? '', Validators.required],
        bedrooms: [this.property?.roomDetails?.bedrooms ?? '', Validators.required],
        bathrooms: [this.property?.roomDetails?.bathrooms ?? '', Validators.required],
        toilets: [this.property?.roomDetails?.toilets ?? '', Validators.required],
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
        livingArea: [this.property?.surface?.livingArea ?? '', Validators.required],
        totalArea: [this.property?.surface?.totalArea ?? ''],
        landArea: [this.property?.surface?.landArea ?? ''],
        balconyArea: [this.property?.surface?.balconyArea ?? ''],
        terraceArea: [this.property?.surface?.terraceArea ?? ''],
        gardenArea: [this.property?.surface?.gardenArea ?? ''],
      }),
      energy: this.fb.group({
        yearOfConstruction: [this.property?.yearOfConstruction ?? ''],
        yearOfRenovation: [this.property?.yearOfRenovation ?? ''],
        type: [this.property?.heating?.type ?? ''],
        distribution: [this.property?.heating?.distribution ?? ''],
        energyLabel: [this.property?.energyLabel ?? '']
      }),
      features: this.fb.group({
        elevator: [this.property?.features?.elevator?? false],
        balcony: [this.property?.features?.balcony?? false],
        terrace: [this.property?.features?.terrace?? false],
        garden: [this.property?.features?.garden?? false],
        cellar: [this.property?.features?.cellar?? false],
        garage: [this.property?.features?.garage?? false],
        parking: [this.property?.features?.parking?? false],
        attic: [this.property?.features?.attic?? false],
        accessible: [this.property?.features?.accessible?? false],
        intercom: [this.property?.features?.intercom?? false],
        swimmingPool: [this.property?.features?.swimmingPool?? false],
        fireplace: [this.property?.features?.fireplace?? false]
      }),
      additionalInformation: this.fb.group({
        description: [this.property?.description ?? ''],
      })
    });
  }
}
