import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditChallengeDialogComponentComponent } from './add-edit-challenge-dialog-component.component';

describe('AddEditChallengeDialogComponentComponent', () => {
  let component: AddEditChallengeDialogComponentComponent;
  let fixture: ComponentFixture<AddEditChallengeDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditChallengeDialogComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditChallengeDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
