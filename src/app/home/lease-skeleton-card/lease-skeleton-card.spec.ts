import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseSkeletonCard } from './lease-skeleton-card';

describe('LeaseSkeletonCard', () => {
  let component: LeaseSkeletonCard;
  let fixture: ComponentFixture<LeaseSkeletonCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseSkeletonCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseSkeletonCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
