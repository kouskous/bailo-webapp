import {Component, OnInit} from '@angular/core';
import {ArrowLeftIcon, LucideAngularModule, SaveIcon} from 'lucide-angular';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Property} from '../../../model/property/property';
import {Lease} from '../../../model/lease/lease';
import {LeaseRepository} from '../../../repository/lease-repository';
import {TextInput} from '../../layout/components/text-input/text-input';
import {Dropdown} from '../../layout/components/dropdown/dropdown';

@Component({
  selector: 'app-edit-property',
  imports: [
    LucideAngularModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    TextInput,
    Dropdown
  ],
  templateUrl: './edit-property.html',
  styleUrl: './edit-property.scss'
})
export class EditProperty implements OnInit {

  propertyForm: FormGroup;
  property: Property | unknown = undefined;
  heatingTypes = ['ELECTRIC', 'GAS', 'FUEL', 'HEAT_PUMP', 'DISTRICT', 'WOOD', 'SOLAR', 'OTHER'];
  heatingDistributions = ['RADIATOR', 'UNDERFLOOR', 'AIR', 'OTHER'];
  propertyTypes = [
    { key: 'STUDIO', label: 'Studio' },
    { key: 'APARTMENT', label: 'Appartement' },
    { key: 'HOUSE', label: 'Maison' },
    { key: 'DUPLEX', label: 'Duplex' },
    { key: 'VILLA', label: 'Villa' },
    { key: 'ROOM', label: 'Chambre' },
    { key: 'COMMERCIAL', label: 'Local commercial' },
    { key: 'LAND', label: 'Terrain' },
    { key: 'OTHER', label: 'Autre' },
  ];
  leaseId: string | null = null;
  loading = true;

  protected readonly ArrowLeftIcon = ArrowLeftIcon;

  constructor(private readonly fb: FormBuilder,
              private readonly route: ActivatedRoute,
              private readonly leaseRepository: LeaseRepository) {
    this.propertyForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      type: ['', Validators.required],
      address: this.fb.group({
        street: [''],
        additional: [''],
        postalCode: [''],
        city: [''],
        country: [''],
      }),
      surface: this.fb.group({
        livingArea: [0, Validators.required],
        totalArea: [null],
        landArea: [null],
        balconyArea: [null],
        terraceArea: [null],
        gardenArea: [null],
      }),
      roomDetails: this.fb.group({
        rooms: [0, Validators.required],
        bedrooms: [0, Validators.required],
        bathrooms: [0, Validators.required],
        toilets: [0, Validators.required],
      }),
      yearOfConstruction: [null],
      yearOfRenovation: [null],
      heating: this.fb.group({
        type: [''],
        DISTRIBUTION: [''],
      }),
      energyLabel: [''],
      features: this.fb.group({
        elevator: [false],
        balcony: [false],
        terrace: [false],
        garden: [false],
        cellar: [false],
        garage: [false],
        parking: [false],
        attic: [false],
        accessible: [false],
        intercom: [false],
        securedDoor: [false],
        swimmingPool: [false],
        fireplace: [false],
        furnished: [false],
        renovated: [false],
      }),
      description: [''],
      createdAt: [null],
      updatedAt: [null],
    });
  }

  ngOnInit(): void {
    this.leaseId = this.route.snapshot.paramMap.get('id')
    if (this.leaseId) {
      this.leaseRepository.findById(this.leaseId).subscribe((lease: Lease) => {
        this.property = lease.property;
        this.loading = false;
      })
    }
  }

  submit() {

  }
}
