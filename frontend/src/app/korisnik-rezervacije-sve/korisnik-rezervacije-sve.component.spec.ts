import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KorisnikRezervacijeSveComponent } from './korisnik-rezervacije-sve.component';

describe('KorisnikRezervacijeSveComponent', () => {
  let component: KorisnikRezervacijeSveComponent;
  let fixture: ComponentFixture<KorisnikRezervacijeSveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KorisnikRezervacijeSveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KorisnikRezervacijeSveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
