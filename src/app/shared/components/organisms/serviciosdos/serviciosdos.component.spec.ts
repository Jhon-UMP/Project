import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiciosdosComponent } from './serviciosdos.component';

describe('ServiciosdosComponent', () => {
  let component: ServiciosdosComponent;
  let fixture: ComponentFixture<ServiciosdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiciosdosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiciosdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
