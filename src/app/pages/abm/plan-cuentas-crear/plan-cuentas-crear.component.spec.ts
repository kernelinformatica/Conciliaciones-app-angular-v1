import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCuentasCrearComponent } from './plan-cuentas-crear.component';

describe('PlanCuentasCrearComponent', () => {
  let component: PlanCuentasCrearComponent;
  let fixture: ComponentFixture<PlanCuentasCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCuentasCrearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCuentasCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
