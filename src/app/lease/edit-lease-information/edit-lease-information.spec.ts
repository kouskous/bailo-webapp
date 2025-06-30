import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeaseInformation } from './edit-lease-information';

describe('EditLeaseInformation', () => {
  let component: EditLeaseInformation;
  let fixture: ComponentFixture<EditLeaseInformation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLeaseInformation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLeaseInformation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
