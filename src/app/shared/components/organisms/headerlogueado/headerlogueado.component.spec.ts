import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderlogueadoComponent } from './headerlogueado.component';

describe('HeaderlogueadoComponent', () => {
  let component: HeaderlogueadoComponent;
  let fixture: ComponentFixture<HeaderlogueadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderlogueadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderlogueadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
