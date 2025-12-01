import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikRezervacijeAktuelnoComponent } from './korisnik-rezervacije-aktuelno.component';

describe('KorisnikRezervacijeAktuelnoComponent', () => {
  let component: KorisnikRezervacijeAktuelnoComponent;
  let fixture: ComponentFixture<KorisnikRezervacijeAktuelnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnikRezervacijeAktuelnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikRezervacijeAktuelnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
