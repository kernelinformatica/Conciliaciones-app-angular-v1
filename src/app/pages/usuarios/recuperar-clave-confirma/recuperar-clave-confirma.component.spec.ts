import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarClaveConfirmaComponent } from './recuperar-clave-confirma.component';

describe('RecuperarClaveConfirmaComponent', () => {
  let component: RecuperarClaveConfirmaComponent;
  let fixture: ComponentFixture<RecuperarClaveConfirmaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarClaveConfirmaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarClaveConfirmaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
