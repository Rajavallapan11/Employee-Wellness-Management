import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnessProgramDialogComponentComponent } from './wellness-program-dialog-component.component';

describe('WellnessProgramDialogComponentComponent', () => {
  let component: WellnessProgramDialogComponentComponent;
  let fixture: ComponentFixture<WellnessProgramDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WellnessProgramDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WellnessProgramDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
