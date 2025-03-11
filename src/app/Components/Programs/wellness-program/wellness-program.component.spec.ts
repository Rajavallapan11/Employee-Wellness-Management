import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessProgramComponent } from './wellness-program.component';

describe('WellnessProgramComponent', () => {
  let component: WellnessProgramComponent;
  let fixture: ComponentFixture<WellnessProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellnessProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellnessProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
