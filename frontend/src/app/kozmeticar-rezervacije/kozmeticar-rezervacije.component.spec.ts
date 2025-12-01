import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KozmeticarRezervacijeComponent } from './kozmeticar-rezervacije.component';

describe('KozmeticarRezervacijeComponent', () => {
  let component: KozmeticarRezervacijeComponent;
  let fixture: ComponentFixture<KozmeticarRezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KozmeticarRezervacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KozmeticarRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
