import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaCerealComponent } from './ficha-cereal.component';

describe('FichaCerealComponent', () => {
  let component: FichaCerealComponent;
  let fixture: ComponentFixture<FichaCerealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaCerealComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaCerealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
