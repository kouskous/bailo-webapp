import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseCard } from './lease-card';

describe('LeaseCard', () => {
  let component: LeaseCard;
  let fixture: ComponentFixture<LeaseCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
