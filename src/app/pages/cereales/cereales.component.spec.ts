import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerealesComponent } from './cereales.component';

describe('CerealesComponent', () => {
  let component: CerealesComponent;
  let fixture: ComponentFixture<CerealesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerealesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerealesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
