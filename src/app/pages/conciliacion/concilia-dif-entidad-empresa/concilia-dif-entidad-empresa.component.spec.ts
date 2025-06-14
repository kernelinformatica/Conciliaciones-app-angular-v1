import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliaDifEntidadEmpresaComponent } from './concilia-dif-entidad-empresa.component';

describe('ConciliaDifEntidadEmpresaComponent', () => {
  let component: ConciliaDifEntidadEmpresaComponent;
  let fixture: ComponentFixture<ConciliaDifEntidadEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliaDifEntidadEmpresaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliaDifEntidadEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
