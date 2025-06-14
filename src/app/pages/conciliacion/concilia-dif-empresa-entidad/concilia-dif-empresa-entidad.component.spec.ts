import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliaDifEmpresaEntidadComponent } from './concilia-dif-empresa-entidad.component';

describe('ConciliaDifEmpresaEntidadComponent', () => {
  let component: ConciliaDifEmpresaEntidadComponent;
  let fixture: ComponentFixture<ConciliaDifEmpresaEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliaDifEmpresaEntidadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliaDifEmpresaEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
