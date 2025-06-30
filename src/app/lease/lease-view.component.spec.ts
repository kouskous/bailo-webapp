import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseView } from './lease-view.component';

describe('Lease', () => {
  let component: LeaseView;
  let fixture: ComponentFixture<LeaseView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
