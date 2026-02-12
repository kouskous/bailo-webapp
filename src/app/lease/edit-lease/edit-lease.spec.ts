import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLease } from './edit-lease';

describe('EditLease', () => {
  let component: EditLease;
  let fixture: ComponentFixture<EditLease>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLease]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLease);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
