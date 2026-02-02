import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPropertySkeleton } from './edit-property-skeleton';

describe('EditPropertySkeleton', () => {
  let component: EditPropertySkeleton;
  let fixture: ComponentFixture<EditPropertySkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPropertySkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPropertySkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
