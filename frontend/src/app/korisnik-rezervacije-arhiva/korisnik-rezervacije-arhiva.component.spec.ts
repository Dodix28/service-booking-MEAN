import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikRezervacijeArhivaComponent } from './korisnik-rezervacije-arhiva.component';

describe('KorisnikRezervacijeArhivaComponent', () => {
  let component: KorisnikRezervacijeArhivaComponent;
  let fixture: ComponentFixture<KorisnikRezervacijeArhivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnikRezervacijeArhivaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikRezervacijeArhivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
