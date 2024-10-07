import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogogenComponent } from './logogen.component';

describe('LogogenComponent', () => {
  let component: LogogenComponent;
  let fixture: ComponentFixture<LogogenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LogogenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogogenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
