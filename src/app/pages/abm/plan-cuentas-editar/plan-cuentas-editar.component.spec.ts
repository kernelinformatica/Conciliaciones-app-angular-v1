import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanCuentasEditarComponent } from './plan-cuentas-editar.component';

describe('PlanCuentasEditarComponent', () => {
  let component: PlanCuentasEditarComponent;
  let fixture: ComponentFixture<PlanCuentasEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanCuentasEditarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanCuentasEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
