import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLandlord } from './edit-landlord';

describe('EditLandlord', () => {
  let component: EditLandlord;
  let fixture: ComponentFixture<EditLandlord>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLandlord]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLandlord);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
