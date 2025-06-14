import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliaTotalesConceptosComponent } from './concilia-totales-conceptos.component';

describe('ConciliaTotalesBancosComponent', () => {
  let component: ConciliaTotalesConceptosComponent;
  let fixture: ComponentFixture<ConciliaTotalesConceptosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliaTotalesConceptosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliaTotalesConceptosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
