import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeEnrollDialogComponent } from './challenge-enroll-dialog.component';

describe('ChallengeEnrollDialogComponent', () => {
  let component: ChallengeEnrollDialogComponent;
  let fixture: ComponentFixture<ChallengeEnrollDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChallengeEnrollDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChallengeEnrollDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
