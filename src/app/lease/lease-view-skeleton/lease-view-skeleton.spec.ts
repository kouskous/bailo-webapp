import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseViewSkeleton } from './lease-view-skeleton';

describe('LeaseViewSkeleton', () => {
  let component: LeaseViewSkeleton;
  let fixture: ComponentFixture<LeaseViewSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseViewSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseViewSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
