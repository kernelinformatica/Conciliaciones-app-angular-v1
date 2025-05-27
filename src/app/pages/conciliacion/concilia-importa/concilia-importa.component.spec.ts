import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciliaImportaComponent } from './concilia-importa.component';

describe('ConciliaImportaComponent', () => {
  let component: ConciliaImportaComponent;
  let fixture: ComponentFixture<ConciliaImportaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciliaImportaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConciliaImportaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
