import { Component } from '@angular/core';
import { ZahtevService } from '../services/zahtev.service';
import { Zahtev } from '../models/zahtev';
import { Korisnik } from '../models/user';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TabelaComponent } from '../tabela/tabela.component';

@Component({
  selector: 'app-admin-zahtevi',
  standalone: true,
  imports: [FormsModule,  CommonModule,TabelaComponent],
  templateUrl: './admin-zahtevi.component.html',
  styleUrl: './admin-zahtevi.component.css'
})
export class AdminZahteviComponent {

  constructor(private zahtevService:ZahtevService, private userService:UserService){}


  ngOnInit(): void {
     this.zahtevService.dohvatiNaCekanju().subscribe((z: Zahtev[]) => {
      this.zahtevi = z;
      this.prikazaniZahtevi = this.zahtevi.slice(0, 5);
    })


  }

  zahtevi: Zahtev[] = [];
  prikazaniZahtevi: Zahtev[] = [];


  /*----------------------------------------- zahtevi -------------------------------- */
    prihvati(z: Zahtev){
      this.zahtevService.prihvatiZahtev(z.idZ).subscribe((zahtev: Zahtev) => {
        if(zahtev != null){
          alert('Uspesno prihvacen zahtev!');
          this.userService.dodajKorisnika(zahtev.ime,zahtev.prezime ,zahtev.kor_ime ,zahtev.lozinka ,zahtev.adresa,zahtev.tip,zahtev.mejl,zahtev.pol,zahtev.kontakt,
            /*zahtev.brKartice,*/zahtev.profilna
          ).subscribe((k: Korisnik) => {
            if(k != null){
              alert('Uspesno dodat korisnik!');
            }
          })
          this.ngOnInit();
        }
      })
    }

    odbij(z:Zahtev){
      this.zahtevService.odbijZahtev(z.idZ).subscribe((zahtev: Zahtev)=>{
        if(zahtev != null){
          alert('Uspesno odbijen zahtev!');
          this.ngOnInit();
        }
      })
    }





}
