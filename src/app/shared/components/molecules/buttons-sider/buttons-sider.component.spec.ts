import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonsSiderComponent } from './buttons-sider.component';

describe('ButtonsSiderComponent', () => {
  let component: ButtonsSiderComponent;
  let fixture: ComponentFixture<ButtonsSiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonsSiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonsSiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
