import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergyForecastComponent } from './energy-forecast.component';

describe('EnergyForecastComponent', () => {
  let component: EnergyForecastComponent;
  let fixture: ComponentFixture<EnergyForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnergyForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
