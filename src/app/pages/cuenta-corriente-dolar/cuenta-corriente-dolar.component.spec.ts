import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentaCorrienteDolarComponent } from './cuenta-corriente-dolar.component';

describe('CuentaCorrienteDolarComponent', () => {
  let component: CuentaCorrienteDolarComponent;
  let fixture: ComponentFixture<CuentaCorrienteDolarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CuentaCorrienteDolarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuentaCorrienteDolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
