import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalSettingsComponent } from './journal-settings.component';

describe('JournalSettingsComponent', () => {
  let component: JournalSettingsComponent;
  let fixture: ComponentFixture<JournalSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
