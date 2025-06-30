import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLoading } from './auth-loading';

describe('AuthLoading', () => {
  let component: AuthLoading;
  let fixture: ComponentFixture<AuthLoading>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLoading]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLoading);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
