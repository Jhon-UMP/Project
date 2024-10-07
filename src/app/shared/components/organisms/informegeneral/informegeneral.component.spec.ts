import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformegeneralComponent } from './informegeneral.component';

describe('InformegeneralComponent', () => {
  let component: InformegeneralComponent;
  let fixture: ComponentFixture<InformegeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformegeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformegeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
