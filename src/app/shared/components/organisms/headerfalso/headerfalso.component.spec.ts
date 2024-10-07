import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderfalsoComponent } from './headerfalso.component';

describe('HeaderfalsoComponent', () => {
  let component: HeaderfalsoComponent;
  let fixture: ComponentFixture<HeaderfalsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderfalsoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderfalsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
