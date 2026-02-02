import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertySkeletonCard } from './property-skeleton-card';

describe('PropertySkeletonCard', () => {
  let component: PropertySkeletonCard;
  let fixture: ComponentFixture<PropertySkeletonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertySkeletonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertySkeletonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
