import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsloginComponent } from './buttonslogin.component';

describe('ButtonsloginComponent', () => {
  let component: ButtonsloginComponent;
  let fixture: ComponentFixture<ButtonsloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsloginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
