import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeProgramComponent } from './challenge-program.component';

describe('ChallengeProgramComponent', () => {
  let component: ChallengeProgramComponent;
  let fixture: ComponentFixture<ChallengeProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeProgramComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
