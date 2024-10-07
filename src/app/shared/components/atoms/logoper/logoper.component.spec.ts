import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoperComponent } from './logoper.component';

describe('LogoperComponent', () => {
  let component: LogoperComponent;
  let fixture: ComponentFixture<LogoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogoperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
