import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadersinlogComponent } from './headersinlog.component';

describe('HeadersinlogComponent', () => {
  let component: HeadersinlogComponent;
  let fixture: ComponentFixture<HeadersinlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeadersinlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadersinlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
