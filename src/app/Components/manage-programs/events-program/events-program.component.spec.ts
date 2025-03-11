import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsProgramComponent } from './events-program.component';

describe('EventsProgramComponent', () => {
  let component: EventsProgramComponent;
  let fixture: ComponentFixture<EventsProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
