import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseSummary } from './lease-summary';

describe('LeaseSummary', () => {
  let component: LeaseSummary;
  let fixture: ComponentFixture<LeaseSummary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaseSummary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaseSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
