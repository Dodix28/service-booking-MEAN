import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KlijentComponent } from './klijent/klijent.component';
import { KozmeticarComponent } from './kozmeticar/kozmeticar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { KlijentProfilComponent } from './klijent-profil/klijent-profil.component';
import { KlijentUslugeComponent } from './klijent-usluge/klijent-usluge.component';
import { KlijentRezervacijeComponent } from './klijent-rezervacije/klijent-rezervacije.component';
import { KozmeticarProfilComponent } from './kozmeticar-profil/kozmeticar-profil.component';
import { KozmeticarRezervacijeComponent } from './kozmeticar-rezervacije/kozmeticar-rezervacije.component';
import { KozmeticarUslugeComponent } from './kozmeticar-usluge/kozmeticar-usluge.component';
import { KozmeticarStatistikaComponent } from './kozmeticar-statistika/kozmeticar-statistika.component';
import { UslugaComponent } from './usluga/usluga.component';
import { SliderComponent } from './slider/slider.component';
import { AdminZahteviComponent } from './admin-zahtevi/admin-zahtevi.component';
import { AdminKozmeticariComponent } from './admin-kozmeticari/admin-kozmeticari.component';
import { AdminKlijentiComponent } from './admin-klijenti/admin-klijenti.component';
import { AdminUslugeComponent } from './admin-usluge/admin-usluge.component';
import { ZaposliComponent } from './zaposli/zaposli.component';
import { AdminPocetnaComponent } from './admin-pocetna/admin-pocetna.component';
import { TabelaComponent } from './tabela/tabela.component';
import { KorisnikRezervacijeSveComponent } from './korisnik-rezervacije-sve/korisnik-rezervacije-sve.component';
import { KorisnikRezervacijeAktuelnoComponent } from './korisnik-rezervacije-aktuelno/korisnik-rezervacije-aktuelno.component';
import { KorisnikRezervacijeArhivaComponent } from './korisnik-rezervacije-arhiva/korisnik-rezervacije-arhiva.component';

export const routes: Routes = [
  {path:'',component:LoginComponent ,children: [
    {path:'slider', component:SliderComponent},
  ]},
  {path:'kozmeticar',component:KozmeticarComponent, children: [
    {path: '', component:KozmeticarProfilComponent},
    {path: 'kozmeticarProfil', component:KozmeticarProfilComponent},
    {path: 'kozmeticarRezervacije', component:KozmeticarRezervacijeComponent},
    {path: 'kozmeticarUsluge', component:KozmeticarUslugeComponent},
    {path: 'kozmeticarStatistika', component:KozmeticarStatistikaComponent}
  ]},
  {path:'klijent', component:KlijentComponent, children: [
    {path: '', component:KlijentProfilComponent},
    {path: 'klijentProfil', component:KlijentProfilComponent},
    {path: 'klijentUsluge', component:KlijentUslugeComponent},
    {path: 'klijentRezervacije', component:KlijentRezervacijeComponent, children: [
      {path:'', component:KorisnikRezervacijeAktuelnoComponent},
      {path:'aktuelneRezervacije', component:KorisnikRezervacijeAktuelnoComponent},
      {path:'arhivaRezervacije', component:KorisnikRezervacijeArhivaComponent},
      {path:'sveRezervacije', component:KorisnikRezervacijeSveComponent},
    ]},
  ]},
  {path:'usluga', component:UslugaComponent},
  {path:'admin',component:AdminComponent, children: [
    {path: '',component:AdminPocetnaComponent},
    {path: 'adminZahtevi',component:AdminZahteviComponent},
    {path: 'adminKozmeticari',component:AdminKozmeticariComponent},
    {path: 'adminKlijenti',component:AdminKlijentiComponent},
    {path: 'adminUsluge',component:AdminUslugeComponent},
    {path: 'zaposli',component:ZaposliComponent},
    {path: 'adminPocetna',component:AdminPocetnaComponent},
  ]},
  {path:'adminLogin', component:AdminLoginComponent},
  {path:'tabela', component:TabelaComponent},

];
