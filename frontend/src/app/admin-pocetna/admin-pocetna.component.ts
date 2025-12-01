import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ZahtevService } from '../services/zahtev.service';
import { UserService } from '../services/user.service';
import { Korisnik } from '../models/user';

@Component({
  selector: 'app-admin-pocetna',
  standalone: true,
  imports: [FormsModule,  CommonModule],
  templateUrl: './admin-pocetna.component.html',
  styleUrl: './admin-pocetna.component.css'
})
export class AdminPocetnaComponent {

    constructor(private zahtevService:ZahtevService, private userService:UserService){}


    ngOnInit(): void {

      this.userService.dohvatiKozmeticare().subscribe((kozmeticari:Korisnik[]) => {
        if(kozmeticari != null){
          kozmeticari.forEach((k: Korisnik) => {
             this.sviKozmeticari.push(k);
          })
        }
      })

       this.userService.dohvatiKlijente().subscribe((klijenti:Korisnik[]) => {
        if(klijenti != null){
          klijenti.forEach((k: Korisnik) => {
             this.sviKlijenti.push(k);
          })
        }
      })

       let k = localStorage.getItem('ulogovan');
        if(k != null){
          this.ulogovan = JSON.parse(k);
        }


    }


    sviKlijenti: Korisnik[] = [];
    sviKozmeticari: Korisnik[] = [];
    ulogovan: Korisnik = new Korisnik();

}
