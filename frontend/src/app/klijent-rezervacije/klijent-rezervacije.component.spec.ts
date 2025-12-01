import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KlijentRezervacijeComponent } from './klijent-rezervacije.component';

describe('KlijentRezervacijeComponent', () => {
  let component: KlijentRezervacijeComponent;
  let fixture: ComponentFixture<KlijentRezervacijeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KlijentRezervacijeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KlijentRezervacijeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
