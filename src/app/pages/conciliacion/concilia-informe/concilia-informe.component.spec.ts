import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliaInformeComponent } from './concilia-informe.component';

describe('ConciliaInformeComponent', () => {
  let component: ConciliaInformeComponent;
  let fixture: ComponentFixture<ConciliaInformeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliaInformeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliaInformeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
