import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContractors } from './edit-contractors';

describe('EditContractors', () => {
  let component: EditContractors;
  let fixture: ComponentFixture<EditContractors>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContractors]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditContractors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
