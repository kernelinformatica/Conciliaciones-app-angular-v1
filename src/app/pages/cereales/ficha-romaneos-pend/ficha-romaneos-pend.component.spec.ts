import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FichaRomaneosPendComponent } from './ficha-romaneos-pend.component';

describe('FichaRomaneosPendComponent', () => {
  let component: FichaRomaneosPendComponent;
  let fixture: ComponentFixture<FichaRomaneosPendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FichaRomaneosPendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FichaRomaneosPendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
