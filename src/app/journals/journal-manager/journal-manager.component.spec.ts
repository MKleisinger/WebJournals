import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalManagerComponent } from './journal-manager.component';

describe('JournalManagerComponent', () => {
  let component: JournalManagerComponent;
  let fixture: ComponentFixture<JournalManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JournalManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
